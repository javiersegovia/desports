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

let oldIndex = 0
let activeIndex = 0
let insideRoadmap = false
let lastY = 0
let lastX = 0
let offsetsY: number[] = []
let offsetsX: number[] = []

export const resetControls = () => {
  oldIndex = 0
  activeIndex = 0
  insideRoadmap = false
  lastY = 0
  lastX = 0
  offsetsY = []
  offsetsX = []
}

interface ScrollDirection {
  x: 'LEFT' | 'RIGHT' | null
  y: 'UP' | 'DOWN' | null
}

export const useAnimations = () => {
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

  const screenAnimation = useRef<SlideAnimationFunc>(
    throttle<SlideAnimationFunc>(({ event, source, direction, target }) => {
      let newIndex: number

      if (gsap.isTweening(containerRef.current) || isAnimating.current) return
      if (target) {
        newIndex = target
        if (activeIndex === newIndex) return
      } else {
        const { x } = direction || {}
        let { y } = direction || {}

        // In wheel events we need to update the direction
        if (event instanceof WheelEvent) y = event.deltaY > 0 ? 'DOWN' : 'UP'
        if (activeIndex > lastIndexY) insideRoadmap = true
        else insideRoadmap = false

        const shouldAdvance = insideRoadmap && x ? x === 'LEFT' : y === 'DOWN'
        newIndex = shouldAdvance ? activeIndex + 1 : activeIndex - 1

        if (newIndex < 0) newIndex = 0
        if (newIndex > maxIndex) newIndex = maxIndex

        if (activeIndex === newIndex) return

        // TRANSITION FROM VERTICAL SLIDER TO HORIZONTAL SLIDER
        if (sections[newIndex] === sections[activeIndex]) {
          newIndex = shouldAdvance ? newIndex + 1 : newIndex - 1
        }
      }

      oldIndex = activeIndex
      activeIndex = newIndex

      if (activeIndex < ySections.current.length) {
        lastY = offsetsY[activeIndex]
      } else if (activeIndex <= maxIndex) {
        const xIndex = activeIndex - ySections.current.length
        lastX = offsetsX[xIndex]
      }

      // Increase the animationSpeed in touch devices
      isAnimating.current = true

      scrollTimeline.current.to(containerRef.current, {
        duration: TRANSITION_SPEED,
        x: lastX,
        y: lastY,
        ease: 'power2.inOut',

        onComplete: () => {
          isAnimating.current = false
        },
      })

      dispatch(
        transitionActions[source]({
          oldIndex,
          activeIndex,
          animationSpeed: TRANSITION_SPEED,
        })
      )
    }, TRANSITION_SPEED * 1.25)
  )

  useEffect(() => {
    const xContainer = roadmapContainerRef.current as HTMLDivElement
    const container = containerRef.current as HTMLDivElement

    function newSize() {
      offsetsY = []
      offsetsX = []

      for (const ySection of ySections.current) {
        ySection.current && offsetsY.push(-ySection.current.offsetTop)
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
          offsetsX.push(
            -(xSection.current.parentElement.offsetLeft + elementOffsetLeft)
          )
        } else {
          offsetsX.push(-elementOffsetLeft)
        }
      })

      const xIndex = activeIndex - ySections.current.length

      if (activeIndex < ySections.current.length) {
        lastY = offsetsY[activeIndex]
        lastX = 0
      } else {
        lastY = offsetsY[offsetsY.length - 1]
        lastX = offsetsX[xIndex]
      }

      const shouldSetCustomCoords = isDesktop()

      if (!shouldSetCustomCoords && (activeIndex !== 0 || oldIndex !== 0)) {
        resetControls()
        dispatch(resetState())
      }

      gsap.set(container, {
        y: shouldSetCustomCoords ? lastY : 0,
        x: shouldSetCustomCoords ? lastX : 0,
        rotation: 0.001,
      })
    }

    const throttledAnim = throttle(
      (event: TouchEvent, direction: ScrollDirection) =>
        screenAnimation.current({ event, source: 'TOUCH', direction }),
      200
    )

    let touchStartY: number
    let touchStartX: number

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
      screenAnimation.current({ event, source: 'WHEEL' })
    }

    window.addEventListener('wheel', wheelAnimation, { passive: false })
    window.addEventListener('resize', newSize)
    window.addEventListener('touchstart', onTouchStart, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: false })

    newSize()

    const scrollTL = scrollTimeline.current

    return () => {
      // todo: do the dispatch "reset" here!
      // todo: refactor the STORE and make the roadmap animations independent

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

  return {
    navigate,
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
