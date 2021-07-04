import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import throttle from 'lodash.throttle'

import {
  resetState,
  TNavSource,
  transitionActions,
} from '@lib/redux/slices/navSlice'
import { useAppDispatch } from '@lib/redux/hooks'
import { theme } from 'twin.macro'

// todo: use this in all places, instead of using redux
export const TRANSITION_SPEED = 1

const lgBreakpoint = theme`screens.lg`
export const isDesktop = () =>
  typeof window !== 'undefined' &&
  window.matchMedia(`(min-width: ${lgBreakpoint})`).matches

// WE HAVE TO MOVE ALL OF THIS TO REDUX, SO WE CAN CONTROL THIS FROM ANYWHERE
interface ScrollDirection {
  x: 'LEFT' | 'RIGHT' | null
  y: 'UP' | 'DOWN' | null
}

export const useAnimations = () => {
  const oldIndex = useRef(0)
  const activeIndex = useRef(0)
  const insideRoadmap = useRef(false)
  const lastY = useRef(0)
  const lastX = useRef(0)
  const offsetsY = useRef<number[]>([])
  const offsetsX = useRef<number[]>([])

  const resetControls = () => {
    oldIndex.current = 0
    activeIndex.current = 0
    insideRoadmap.current = false
    lastY.current = 0
    lastX.current = 0
    offsetsY.current = []
    offsetsX.current = []
  }

  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const landingRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const tokenomicsRef = useRef<HTMLDivElement>(null)

  // Roadmap references
  const roadmapContainerRef = useRef<HTMLDivElement>(null)
  const roadmapRef = useRef<HTMLDivElement>(null)

  const roadmapNavWrapperRef = useRef<HTMLDivElement>(null)
  const s0Ref = useRef<HTMLDivElement>(null)
  const s1Ref = useRef<HTMLDivElement>(null)
  const s2Ref = useRef<HTMLDivElement>(null)
  const s3Ref = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  const stage1NavRef = useRef<HTMLDivElement>(null)
  const stage2NavRef = useRef<HTMLDivElement>(null)
  const stage3NavRef = useRef<HTMLDivElement>(null)

  const ySections = useRef([
    landingRef,
    tokenomicsRef,
    featuresRef,
    roadmapContainerRef,
  ])
  const xSections = useRef([
    roadmapContainerRef,
    s1Ref,
    s2Ref,
    s3Ref,
    footerRef,
  ])

  const dispatch = useAppDispatch()

  const scrollTimeline = useRef(gsap.timeline())

  interface ScreenAnimationProps {
    event: WheelEvent | TouchEvent | null
    source: TNavSource
    direction?: ScrollDirection
    target?: number
  }

  type SlideAnimationFunc = (props: ScreenAnimationProps) => void

  const sections = [...ySections.current, ...xSections.current]
  const lastIndexY = ySections.current.length - 2
  const maxIndex = sections.length - 1

  const isAnimating = useRef(false)
  let newIndex: number

  const screenAnimation = useRef<SlideAnimationFunc>(
    throttle<SlideAnimationFunc>(({ event, source, direction, target }) => {
      if (gsap.isTweening(containerRef.current) || isAnimating.current) return
      if (target) {
        newIndex = target
        if (activeIndex.current === newIndex) return
      } else {
        const { x } = direction || {}
        let { y } = direction || {}

        // In wheel events we need to update the direction
        if (event instanceof WheelEvent) y = event.deltaY > 0 ? 'DOWN' : 'UP'
        if (activeIndex.current > lastIndexY) insideRoadmap.current = true
        else insideRoadmap.current = false

        const shouldAdvance = insideRoadmap && x ? x === 'LEFT' : y === 'DOWN'
        newIndex = shouldAdvance
          ? activeIndex.current + 1
          : activeIndex.current - 1

        if (newIndex < 0) newIndex = 0
        if (newIndex > maxIndex) newIndex = maxIndex

        if (activeIndex.current === newIndex) return

        // TRANSITION FROM VERTICAL SLIDER TO HORIZONTAL SLIDER
        if (sections[newIndex] === sections[activeIndex.current]) {
          newIndex = shouldAdvance ? newIndex + 1 : newIndex - 1
        }
      }

      oldIndex.current = activeIndex.current
      activeIndex.current = newIndex

      if (activeIndex.current < ySections.current.length) {
        lastY.current = offsetsY.current[activeIndex.current]
      } else if (activeIndex.current <= maxIndex) {
        const xIndex = activeIndex.current - ySections.current.length
        lastX.current = offsetsX.current[xIndex]
      }

      // Increase the animationSpeed in touch devices
      isAnimating.current = true

      scrollTimeline.current.to(containerRef.current, {
        duration: TRANSITION_SPEED,
        x: lastX.current,
        y: lastY.current,
        ease: 'power2.inOut',

        onComplete: () => {
          isAnimating.current = false
        },
      })

      dispatch(
        transitionActions[source]({
          oldIndex: oldIndex.current,
          activeIndex: activeIndex.current,
          animationSpeed: TRANSITION_SPEED,
        })
      )
    }, TRANSITION_SPEED * 1.35)
  )

  function newSize() {
    const xContainer = roadmapContainerRef.current as HTMLDivElement
    const container = containerRef.current as HTMLDivElement

    offsetsY.current = []
    offsetsX.current = []

    for (const ySection of ySections.current) {
      ySection.current && offsetsY.current.push(-ySection.current.offsetTop)
    }

    xSections.current.forEach((xSection) => {
      if (!xSection.current) return

      const elementOffsetLeft = xSection.current.offsetLeft

      // This is done to be able to "Nest" multiple full-screen sections
      if (
        xSection.current.parentElement &&
        !xSection.current.parentElement.isSameNode(xContainer) &&
        !xSection.current.isSameNode(xContainer)
      ) {
        offsetsX.current.push(
          -(xSection.current.parentElement.offsetLeft + elementOffsetLeft)
        )
      } else {
        offsetsX.current.push(-elementOffsetLeft)
      }
    })

    const xIndex = activeIndex.current - ySections.current.length

    if (activeIndex.current < ySections.current.length) {
      lastY.current = offsetsY.current[activeIndex.current]
      lastX.current = 0
    } else {
      lastY.current = offsetsY.current[offsetsY.current.length - 1]
      lastX.current = offsetsX.current[xIndex]
    }

    const shouldSetCustomCoords = isDesktop()

    if (
      !shouldSetCustomCoords &&
      (activeIndex.current !== 0 || oldIndex.current !== 0)
    ) {
      resetControls()
      dispatch(resetState())
    }

    gsap.set(container, {
      y: shouldSetCustomCoords ? lastY.current : 0,
      x: shouldSetCustomCoords ? lastX.current : 0,
      rotation: 0.001,
    })
  }

  useEffect(() => {
    let touchStartY: number
    let touchStartX: number

    const throttledAnim = throttle(
      (event: TouchEvent, direction: ScrollDirection) =>
        screenAnimation.current({ event, source: 'TOUCH', direction }),
      TRANSITION_SPEED
    )

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartX = e.touches[0].clientX
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (!isDesktop()) return

      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const touchDistance = 20
      const y =
        touchStartY > touchEndY + touchDistance
          ? 'DOWN'
          : touchStartY < touchEndY - touchDistance
          ? 'UP'
          : null

      const x =
        touchStartX > touchEndX + touchDistance
          ? 'LEFT'
          : touchStartX < touchEndX - touchDistance
          ? 'RIGHT'
          : null

      if (x || y) {
        throttledAnim(e, {
          x,
          y,
        })
      }
    }

    const wheelAnimation = (event: WheelEvent) => {
      if (!isDesktop() || isAnimating.current) return
      event.preventDefault()
      screenAnimation.current({ event, source: 'WHEEL' })
    }

    window.addEventListener('wheel', wheelAnimation, { passive: false })
    window.addEventListener('resize', newSize)
    window.addEventListener('touchstart', onTouchStart, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: false })

    newSize()

    const scrollTL = scrollTimeline.current

    return () => {
      resetControls()
      dispatch(resetState())

      scrollTL.kill()
      window.removeEventListener('wheel', wheelAnimation)
      window.removeEventListener('resize', newSize)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  const navigate = (stageIndex: number) => {
    screenAnimation.current({
      event: null,
      // todo: change Target "index" for "name"
      target: ySections.current.length + stageIndex,
      source: 'CLICK',
    })
  }

  const goToStart = () => {
    resetControls()
    dispatch(resetState())
    newSize()

    gsap.set(containerRef.current, {
      y: 0,
      x: 0,
    })
  }

  return {
    navigate,
    goToStart,
    wrapperRef,
    containerRef,
    landingRef,
    featuresRef,
    tokenomicsRef,
    roadmapContainerRef,
    roadmapRef,
    roadmapNavWrapperRef,
    s0Ref,
    s1Ref,
    s2Ref,
    s3Ref,
    footerRef,
    stage1NavRef,
    stage2NavRef,
    stage3NavRef,
  }
}
