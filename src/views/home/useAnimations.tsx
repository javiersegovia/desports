import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import throttle from 'lodash.throttle'

import { TNavSource, transitionActions } from '@lib/redux/slices/navSlice'
import { useAppDispatch } from '@lib/redux/hooks'

const transitionSpeed = 0.8
const touchTransitionSpeed = 1.15

const isMobile = () => window.matchMedia('(max-width: 768px)').matches

let oldIndex = 0
let activeIndex = 0
let newIndex: number
let insideRoadmap: boolean
let lastY = 0
let lastX = 0
let offsetsY: number[] = []
let offsetsX: number[] = []
let lastEvent: WheelEvent | TouchEvent | null

interface ScrollDirection {
  x: 'LEFT' | 'RIGHT' | null
  y: 'UP' | 'DOWN' | null
}

const getSpeed = (event: WheelEvent | TouchEvent | null) =>
  event instanceof WheelEvent ? touchTransitionSpeed : transitionSpeed

export const useAnimations = () => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const landingRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const tokenomicsRef = useRef<HTMLDivElement>(null)

  // Roadmap references
  const roadmapContainerRef = useRef<HTMLDivElement>(null)
  const roadmapRef = useRef<HTMLDivElement>(null)

  const navRef = useRef<HTMLDivElement>(null)
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
    s0Ref,
    s1Ref,
    s2Ref,
    s3Ref,
    footerRef,
  ])

  const dispatch = useAppDispatch()

  const scrollTimeline = useRef(gsap.timeline())
  const navTimeline = useRef(gsap.timeline())

  interface ScreenAnimationProps {
    event: WheelEvent | TouchEvent | null
    source: TNavSource
    direction?: ScrollDirection
    target?: number
  }

  type SlideAnimationFunc = (props: ScreenAnimationProps) => void

  const sections = [...ySections.current, ...xSections.current]
  const lastIndexY = ySections.current.length - 2
  const maxIndex = sections.length - 2

  const screenAnimation = useRef<SlideAnimationFunc>(
    throttle<SlideAnimationFunc>(({ event, source, direction, target }) => {
      if (gsap.isTweening(containerRef.current)) return

      if (target) {
        newIndex = target
        if (activeIndex === newIndex) return
      } else {
        lastEvent = event

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
        const xIndex = activeIndex - (ySections.current.length - 1)
        lastX = offsetsX[xIndex]
      }

      // Increase the animationSpeed in touch devices
      const animationSpeed = getSpeed(lastEvent)

      scrollTimeline.current.to(containerRef.current, {
        duration: animationSpeed,
        x: lastX,
        y: lastY,
        ease: 'power2.inOut',
        // ease: 'none',
        // ease: 'elastic.out(1.2, 0.75)',
        // ease: 'circ.inOut',
        // rotation: 0.0001,
      })

      dispatch(
        transitionActions[source]({ oldIndex, activeIndex, animationSpeed })
      )
    }, 200)
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

      const xIndex = activeIndex - (ySections.current.length - 1)

      if (activeIndex < ySections.current.length) {
        lastY = offsetsY[activeIndex]
        lastX = 0
      } else {
        lastY = offsetsY[offsetsY.length - 1]
        lastX = offsetsX[xIndex]
      }

      // todo: handle resize on Mobile

      gsap.set(container, {
        y: lastY,
        x: lastX,
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
      if (isMobile()) return

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
      if (!isMobile()) screenAnimation.current({ event, source: 'WHEEL' })
    }

    window.addEventListener('wheel', wheelAnimation, { passive: false })
    window.addEventListener('resize', newSize)
    window.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchend', onTouchEnd)

    newSize()

    const scrollTL = scrollTimeline.current
    const navTL = navTimeline.current

    return () => {
      scrollTL.kill()
      navTL.kill()
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
    navRef,
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
