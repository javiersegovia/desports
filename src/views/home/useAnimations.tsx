import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
// import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

export const useAnimations = () => {
  const parentRef = useRef<HTMLDivElement>(null)
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

    let lastY = 0
    let lastX = 0

    const duration = 0.85
    let offsetsY: number[] = []
    let offsetsX: number[] = []

    const vSections = [
      landingRef.current,
      featuresRef.current,
      tokenomicsRef.current,
      hContainer,
    ] as HTMLDivElement[]

    const hSections = [
      hContainer,
      s0Ref.current,
      s1Ref.current,
      s12Ref.current,
      s2Ref.current,
      s3Ref.current,
    ] as HTMLDivElement[]

    for (const vSection of vSections) {
      offsetsY.push(-vSection.offsetTop)
    }

    for (const hSection of hSections) {
      offsetsX.push(-hSection.getBoundingClientRect().left)
    }

    const slideAnim = (
      e: WheelEvent | TouchEvent,
      isScrollingDown?: boolean
    ) => {
      // console.log({ isScrollingDown, tweening: gsap.isTweening(container) })
      if (gsap.isTweening(container)) {
        // console.log('tweening. return')
        return
      }
      oldSlide = activeSlide

      const sections = [...vSections, ...hSections]
      const maxIndex = sections.length - 2

      if (e instanceof WheelEvent) isScrollingDown = e.deltaY > 0 ? true : false

      // if (e instanceof WheelEvent) {
      //   direction = e.deltaY > 0 ? activeSlide + 1 : activeSlide - 1
      //   // direction = newSlide < 0 ? 0 : newSlide
      //   // direction = newSlide > maxIndex ? maxIndex : newSlide
      // }

      // if (e instanceof WheelEvent) {
      //   console.log('wheel event!')
      // }

      // NEW SLIDER INDEX
      newSlide = isScrollingDown ? activeSlide + 1 : activeSlide - 1

      // Here we make sure that the newSlide is not less than 0 or greather than the maxIndex.
      if (newSlide < 0) newSlide = 0
      if (newSlide > maxIndex) newSlide = maxIndex
      // newSlide = newSlide < 0 ? 0 : newSlide
      // newSlide = newSlide > maxIndex ? maxIndex : newSlide

      if (oldSlide === newSlide) return
      activeSlide = newSlide

      //THEN... WE ANIMATE
      const tl = gsap.timeline()

      // TRANSITION FROM VERTICAL SLIDER TO HORIZONTAL SLIDER
      if (sections[activeSlide] === sections[oldSlide]) {
        activeSlide = isScrollingDown ? activeSlide + 1 : activeSlide - 1
      }

      if (activeSlide < vSections.length) {
        lastY = offsetsY[activeSlide]
      } else if (activeSlide <= maxIndex) {
        const xIndex = activeSlide - (vSections.length - 1)
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
      gsap.set(container, {
        height: vSections.length * window.innerHeight,
      })

      for (const vSection of vSections) {
        offsetsY.push(-vSection.offsetTop)
      }
      for (const hSection of hSections) {
        offsetsY.push(-hSection.getBoundingClientRect().left)
      }

      gsap.set(container, {
        y: offsetsY[activeSlide],
      })
    }

    window.addEventListener('wheel', slideAnim, { passive: false })
    window.addEventListener('resize', newSize)

    // let touchLastY: number

    const throttledDown = throttle((e: TouchEvent) => slideAnim(e, true), 200)
    const throttledUp = throttle((e: TouchEvent) => slideAnim(e, false), 200)

    // const slideDown = (e: TouchEvent) => {
    //   throttledDown(e)
    // }
    // const slideUp = (e: TouchEvent) => throttle(() => slideAnim(e, false), 100)

    let touchStart: number
    window.addEventListener('touchstart', (e: TouchEvent) => {
      touchStart = e.touches[0]?.clientY
    })

    window.addEventListener('touchmove', (e: TouchEvent) => {
      const touchEnd = e.changedTouches[0].clientY

      if (touchStart > touchEnd + 5) {
        throttledDown(e)
      } else if (touchStart < touchEnd - 5) {
        throttledUp(e)
      }
    })
    // window.addEventListener('touchmove', (e: TouchEvent) => {
    //   console.log({ touchStart, te: e.changedTouches[0], touches: e.touches })
    //   const touchEnd = e.changedTouches[0].screenY

    //   slideDown(e)

    //   if (touchStart > touchEnd + 5) {
    //     slideAnim(e, true)
    //   } else if (touchStart < touchEnd - 5) {
    //     slideAnim(e, false)
    //   }
    // })

    // $(document).bind('touchend', function (e) {
    //   var te = e.originalEvent.changedTouches[0].clientY
    //   if (ts > te + 5) {
    //     slide_down()
    //   } else if (ts < te - 5) {
    //     slide_up()
    //   }
    // })

    // const touchScroll = throttle((e: TouchEvent) => {
    //   const currentY = e.touches[0].clientY
    //   if (currentY > touchLastY) {
    //     // moved down
    //     // console.log('down')
    //     slideAnim(e, true)
    //   } else if (currentY < touchLastY) {
    //     // console.log('up')
    //     slideAnim(e, false)
    //     // slideAnim(e, false)
    //     // moved up
    //   }
    //   touchLastY = currentY
    // }, 200)

    // window.addEventListener('touchmove', touchScroll)
  }, [])

  return {
    parentRef,
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
