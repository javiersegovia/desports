import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

ScrollTrigger.defaults({
  toggleActions: 'restart pause resume pause',
})

export const useAnimations = () => {
  const parentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const landingRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const tokenomicsRef = useRef<HTMLDivElement>(null)
  const hContainerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const checkRef = useRef<HTMLDivElement>(null)

  const s0Ref = useRef<HTMLElement>(null)
  const s1Ref = useRef<HTMLElement>(null)
  const s2Ref = useRef<HTMLElement>(null)
  const s3Ref = useRef<HTMLElement>(null)
  const s4Ref = useRef<HTMLElement>(null)

  const sRefs = [s0Ref, s1Ref, s2Ref, s3Ref, s4Ref]

  useEffect(() => {
    const container = containerRef.current as HTMLDivElement
    const hContainer = hContainerRef.current as HTMLDivElement

    const sSections = sRefs.map((ref) => ref.current as HTMLDivElement)

    // const vSections = [
    //   landingRef.current,
    //   featuresRef.current,
    //   tokenomicsRef.current,
    //   hContainer,
    // ] as HTMLDivElement[]

    const max = sSections.length - 1
    // Here we new items based on quantity of extra screens
    // inside each stage
    const extra = 1

    const hElements = gsap.utils.toArray(sSections)
    const xScrollSpeed = hContainer.offsetWidth / max / 1.2

    const getMaxWidth = () =>
      sSections.reduce((val, section) => val + section.offsetWidth, 0)
    const maxWidth = getMaxWidth()

    gsap.to(hElements, {
      x: () => `-${maxWidth - window.innerWidth}`,
      ease: 'none',
      scrollTrigger: {
        trigger: hContainer,
        pin: true,
        scrub: 0.4,
        snap: {
          snapTo: 1 / (max + extra),
          delay: 0.5,
          duration: { min: 0.2, max: 1 },
        },
        end: () => `+=${xScrollSpeed}`,
        invalidateOnRefresh: true,
      },
    })

    sSections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: () =>
          'top top-=' +
          (section.offsetLeft - window.innerWidth / 2) *
            (xScrollSpeed / (maxWidth - window.innerWidth)),
        end: () =>
          '+=' +
          section.offsetWidth * (xScrollSpeed / (maxWidth - window.innerWidth)),
        toggleClass: { targets: section, className: 'active' },

        // todo: add logic for tracking the current "active" state
        onEnter: () => {
          console.log('entering:', i)
        },
        onEnterBack: () => {
          console.log('entering:', i)
        },
      })
    })
  }, [])

  const handleNav = (i: number) => {
    const targetElem = sRefs[i].current as HTMLDivElement
    const container = checkRef.current as HTMLDivElement
    const y = container.getBoundingClientRect().top + window.scrollY

    const containerOffset = y

    const getMaxWidth = () =>
      sRefs.reduce((val, section) => val + section.current.offsetWidth, 0)
    const maxWidth = getMaxWidth()

    const travel = y + targetElem.offsetLeft / sRefs.length - 1
    const fly = targetElem.offsetWidth * (4 / (maxWidth - window.innerWidth))

    console.log({ containerOffset, travel, fly })

    gsap.to(window, {
      ease: 'none',
      scrollTo: {
        y: travel,
        autoKill: false,
      },
      duration: 0.2,
    })

    // if (targetElem && container.isSameNode(targetElem.parentElement)) {
    //   console.log({ containerOffset })
    // } else {
    //   console.log('scrolll')
    //   gsap.to(window, {
    //     scrollTo: {
    //       y: targetElem,
    //       autoKill: false,
    //     },
    //     duration: 1,
    //   })
    // }
  }

  return {
    checkRef,
    handleNav,
    parentRef,
    containerRef,
    landingRef,
    featuresRef,
    tokenomicsRef,
    hContainerRef,
    navRef,
    s0Ref,
    s1Ref,
    s2Ref,
    s3Ref,
    s4Ref,
  }
}
