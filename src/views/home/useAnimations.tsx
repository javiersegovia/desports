import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import throttle from 'lodash.throttle'

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
  const roadmapContainerRef = useRef<HTMLDivElement>(null)
  const s0Ref = useRef<HTMLDivElement>(null)
  const s1Ref = useRef<HTMLDivElement>(null)
  const s12Ref = useRef<HTMLDivElement>(null)
  const s2Ref = useRef<HTMLDivElement>(null)
  const s3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hContainer = roadmapContainerRef.current as HTMLDivElement
    const container = containerRef.current as HTMLDivElement

    let oldSlide = 0
    let activeSlide = 0
    let newSlide: number
    let insideXSection: boolean

    let lastY = 0
    let lastX = 0

    const duration = 0.85
    let offsetsY: number[] = []
    let offsetsX: number[] = []

    const ySections = [
      landingRef.current,
      featuresRef.current,
      tokenomicsRef.current,
      hContainer,
    ] as HTMLDivElement[]

    const xSections = [
      hContainer,
      s0Ref.current,
      s1Ref.current,
      s12Ref.current,
      s2Ref.current,
      s3Ref.current,
    ] as HTMLDivElement[]

    const sections = [...ySections, ...xSections]
    const maxIndex = sections.length - 2

    const tl = gsap.timeline()

    const slideAnim = (
      e: WheelEvent | TouchEvent,
      direction?: ScrollDirection
    ) => {
      if (gsap.isTweening(container)) return

      const { x } = direction || {}
      let { y } = direction || {}

      oldSlide = activeSlide

      if (e instanceof WheelEvent) y = e.deltaY > 0 ? 'DOWN' : 'UP'

      if (oldSlide >= ySections.length) insideXSection = true
      else insideXSection = false

      const shouldAdvance = insideXSection && x ? x === 'LEFT' : y === 'DOWN'
      newSlide = shouldAdvance ? activeSlide + 1 : activeSlide - 1

      if (newSlide < 0) newSlide = 0
      if (newSlide > maxIndex) newSlide = maxIndex
      if (oldSlide === newSlide) return

      activeSlide = newSlide

      // TRANSITION FROM VERTICAL SLIDER TO HORIZONTAL SLIDER
      if (sections[activeSlide] === sections[oldSlide]) {
        activeSlide = shouldAdvance ? activeSlide + 1 : activeSlide - 1
      }

      if (activeSlide < ySections.length) {
        lastY = offsetsY[activeSlide]
      } else if (activeSlide <= maxIndex) {
        const xIndex = activeSlide - (ySections.length - 1)
        lastX = offsetsX[xIndex]
      }

      tl.to(container, {
        duration,
        x: lastX,
        y: lastY,
        ease: 'power2.inOut',
      })
    }

    function newSize() {
      offsetsY = []
      offsetsX = []

      // gsap.set(wrapperRef.current, {
      //   height: window.innerHeight,
      //   width: window.innerWidth,
      // })
      gsap.set(container, {
        height: ySections.length * window.innerHeight,
      })
      // gsap.set(hContainer, {
      //   width: (xSections.length - 1) * window.innerWidth,
      // })

      for (const ySection of ySections) {
        offsetsY.push(-ySection.offsetTop)
      }

      xSections.forEach((xSection) => {
        const elementOffsetLeft = xSection.offsetLeft

        if (
          xSection.parentElement &&
          !xSection.parentElement.isSameNode(hContainer) &&
          !xSection.isSameNode(hContainer)
        ) {
          offsetsX.push(
            -(xSection.parentElement.offsetLeft + elementOffsetLeft)
          )
        } else {
          offsetsX.push(-elementOffsetLeft)
        }
      })

      const xIndex = activeSlide - (ySections.length - 1)

      if (activeSlide < ySections.length) {
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

    window.addEventListener('wheel', slideAnim, { passive: false })
    window.addEventListener('resize', newSize)
    newSize()

    const throttledAnim = throttle(
      (e: TouchEvent, direction: ScrollDirection) => slideAnim(e, direction),
      200
    )

    let touchStartY: number
    let touchStartX: number

    window.addEventListener('touchstart', (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
      touchStartX = e.touches[0].clientX
    })

    window.addEventListener('touchmove', (e: TouchEvent) => {
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
    })

    return () => {
      tl.kill()
    }
  }, [])

  return {
    wrapperRef,
    containerRef,
    landingRef,
    featuresRef,
    tokenomicsRef,
    roadmapContainerRef,
    s0Ref,
    s1Ref,
    s12Ref,
    s2Ref,
    s3Ref,
  }
}
