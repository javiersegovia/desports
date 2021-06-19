import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
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

    const slideAnim = (e: WheelEvent) => {
      oldSlide = activeSlide

      const sections = [...vSections, ...hSections]
      const maxIndex = sections.length - 2

      if (gsap.isTweening(container)) return

      newSlide = e.deltaY > 0 ? activeSlide + 1 : activeSlide - 1
      newSlide = newSlide < 0 ? 0 : newSlide
      newSlide = newSlide > maxIndex ? maxIndex : newSlide

      if (oldSlide === newSlide) return
      activeSlide = newSlide

      //THEN... WE ANIMATE
      const tl = gsap.timeline()

      if (sections[activeSlide] === sections[oldSlide]) {
        activeSlide = e.deltaY > 0 ? activeSlide + 1 : activeSlide - 1
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
