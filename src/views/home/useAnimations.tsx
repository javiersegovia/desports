import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import throttle from 'lodash.throttle'

const transitionSpeed = 0.85
const touchTransitionSpeed = 0.65

let oldSlide = 0
let activeSlide = 0
let newSlide: number
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

// todo: fix vertical resize

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
  const navRef = useRef<HTMLDivElement>(null)
  const s0Ref = useRef<HTMLDivElement>(null)
  const s1Ref = useRef<HTMLDivElement>(null)
  const s12Ref = useRef<HTMLDivElement>(null)
  const s2Ref = useRef<HTMLDivElement>(null)
  const s3Ref = useRef<HTMLDivElement>(null)
  const s4Ref = useRef<HTMLDivElement>(null)

  const ySections = useRef([
    landingRef,
    featuresRef,
    tokenomicsRef,
    roadmapContainerRef,
  ])

  const xSections = useRef([
    roadmapContainerRef,
    s0Ref,
    s1Ref,
    s12Ref,
    s2Ref,
    s3Ref,
    s4Ref,
  ])

  const [info, setInfo] = useState<{
    oldSlide: number
    activeSlide: number
    lastEvent: WheelEvent | TouchEvent | null
    insideRoadmap: boolean
  }>({
    oldSlide: 0,
    activeSlide: 0,
    lastEvent: null,
    insideRoadmap: false,
  })

  // todo: convert to useRef
  const scrollTimeline = useRef(gsap.timeline())
  const navTimeline = useRef(gsap.timeline())

  type SlideAnimationFunc = (
    e: WheelEvent | TouchEvent | number,
    direction?: ScrollDirection
  ) => void

  const sections = [...ySections.current, ...xSections.current]
  const lastIndexY = ySections.current.length - 2
  const maxIndex = sections.length - 2

  const slideAnimation = useRef<SlideAnimationFunc>(
    throttle((e, direction) => {
      if (gsap.isTweening(containerRef.current)) return

      if (typeof e === 'number') {
        newSlide = e
        if (activeSlide === newSlide) return
      } else {
        lastEvent = e

        const { x } = direction || {}
        let { y } = direction || {}

        // In wheel events we need to update the direction
        if (lastEvent instanceof WheelEvent) y = e.deltaY > 0 ? 'DOWN' : 'UP'
        if (activeSlide > lastIndexY) insideRoadmap = true
        else insideRoadmap = false

        const shouldAdvance = insideRoadmap && x ? x === 'LEFT' : y === 'DOWN'
        newSlide = shouldAdvance ? activeSlide + 1 : activeSlide - 1

        if (newSlide < 0) newSlide = 0
        if (newSlide > maxIndex) newSlide = maxIndex

        if (activeSlide === newSlide) return

        // TRANSITION FROM VERTICAL SLIDER TO HORIZONTAL SLIDER
        if (sections[newSlide] === sections[activeSlide]) {
          newSlide = shouldAdvance ? newSlide + 1 : newSlide - 1
        }
      }

      oldSlide = activeSlide
      activeSlide = newSlide

      if (activeSlide < ySections.current.length) {
        lastY = offsetsY[activeSlide]
      } else if (activeSlide <= maxIndex) {
        const xIndex = activeSlide - (ySections.current.length - 1)
        lastX = offsetsX[xIndex]
      }

      const speed = getSpeed(lastEvent)

      scrollTimeline.current.to(containerRef.current, {
        // Increase the scroll speed in touch devices
        duration: speed,
        x: lastX,
        y: lastY,
        ease: 'power2.inOut',
      })

      setInfo({
        insideRoadmap,
        activeSlide,
        oldSlide,
        lastEvent,
      })
    }, 200)
  )

  useEffect(() => {
    const hContainer = roadmapContainerRef.current as HTMLDivElement
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

        if (
          xSection.current.parentElement &&
          !xSection.current.parentElement.isSameNode(hContainer) &&
          !xSection.current.isSameNode(hContainer)
        ) {
          offsetsX.push(
            -(xSection.current.parentElement.offsetLeft + elementOffsetLeft)
          )
        } else {
          offsetsX.push(-elementOffsetLeft)
        }
      })

      const xIndex = activeSlide - (ySections.current.length - 1)

      if (activeSlide < ySections.current.length) {
        lastY = offsetsY[activeSlide]
        lastX = 0
      } else {
        lastX = offsetsX[xIndex]
      }

      gsap.set(container, {
        y: lastY,
        x: lastX,
      })
    }

    const throttledAnim = throttle(
      (e: TouchEvent, direction: ScrollDirection) =>
        slideAnimation.current(e, direction),
      200
    )

    let touchStartY: number
    let touchStartX: number

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartX = e.touches[0].clientX
    }
    const onTouchMove = (e: TouchEvent) => {
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

    window.addEventListener('wheel', slideAnimation.current, { passive: false })
    window.addEventListener('resize', newSize)
    window.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchmove', onTouchMove)

    newSize()

    const scrollTL = scrollTimeline.current
    const navTL = navTimeline.current
    const sAnimation = slideAnimation.current

    return () => {
      //TODO: test the unmounting of this component
      console.log('unmounted useAnimations')
      scrollTL.kill()
      navTL.kill()
      window.removeEventListener('wheel', sAnimation)
      window.removeEventListener('resize', newSize)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  const isVisible = useRef(false)
  const isSmaller = useRef(false)

  useEffect(() => {
    const { activeSlide, oldSlide } = info

    const speed = getSpeed(lastEvent)

    const transitionIndex1 = lastIndexY + 1
    const transitionIndex2 = lastIndexY + 2

    // HIDE NAV (LEAVE ROADMAD INDEX)
    if (activeSlide <= lastIndexY && isVisible.current) {
      navTimeline.current.to(navRef.current, {
        duration: speed * 0.5,
        y: 100,
        onStart: () => {
          isVisible.current = false
        },
      })
    }

    // REVEAL NAV (ENTER ROADMAD INDEX)
    if (
      (activeSlide === transitionIndex1 || activeSlide === transitionIndex2) &&
      oldSlide < activeSlide
    ) {
      navTimeline.current.to(navRef.current, {
        delay: speed * 0.75,
        duration: speed * 0.5,
        y: -100,
        onStart: () => {
          isVisible.current = true
        },
      })
    }

    // RESTORE DEFAULTS (ENTER BACK ROADMAP INDEX)
    if (
      (activeSlide === transitionIndex1 || activeSlide === transitionIndex2) &&
      isSmaller.current
    ) {
      navTimeline.current.to(navRef.current, {
        scale: 1,
        duration: speed,
        onStart: () => {
          isSmaller.current = false
        },
      })
    }

    // MAKE NAVIGATION SMALLER (ENTER STAGE 1)
    if (activeSlide > transitionIndex2 && !isSmaller.current) {
      navTimeline.current.to(navRef.current, {
        scale: 2,
        duration: speed,
        onStart: () => {
          isSmaller.current = true
        },
      })
    }
  }, [info, lastIndexY])

  const navigate = (stageIndex: number) => {
    slideAnimation.current(ySections.current.length + stageIndex)
  }

  return {
    navigate,
    info,
    wrapperRef,
    containerRef,
    landingRef,
    featuresRef,
    tokenomicsRef,
    roadmapContainerRef,
    navRef,
    s0Ref,
    s1Ref,
    s12Ref,
    s2Ref,
    s3Ref,
    s4Ref,
  }
}
