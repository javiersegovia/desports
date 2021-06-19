import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
// import { debounce } from 'lodash'

// function throttle(func: any, limit: number) {
//   let inThrottle: boolean
//   return function () {
//     const args = arguments
//     const context = this
//     if (!inThrottle) {
//       func.apply(context, args)
//       inThrottle = true
//       setTimeout(() => (inThrottle = false), limit)
//     }
//   }
// }

let scrollAnim: gsap.core.Timeline
let timeout: any
let newScroll = true

const scrollToSectionY = (i: number, tweens?: any) => {
  if (timeout) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(() => {
    newScroll = true
  }, 50)

  if (!newScroll || scrollAnim?.isActive()) return

  // console.log({
  //   window: gsap.isTweening(window),
  //   tw: gsap.isTweening(tweens),
  //   scrollAnim: scrollAnim?.isActive(),
  //   newScroll,
  //   scrollTrigger: ScrollTrigger.isScrolling(),
  // })

  if (
    gsap.isTweening(window) ||
    gsap.isTweening(tweens) ||
    !newScroll ||
    scrollAnim?.isActive()
  ) {
    console.log('is tewweening~~~~~~~~~~~~~')
    return
  }

  if (!scrollAnim || !scrollAnim.isActive()) {
    newScroll = false
    scrollAnim = gsap.timeline({ onComplete: () => console.log('COMPLETED') })

    scrollAnim.to(window, {
      scrollTo: { y: i * innerHeight, autoKill: false },
      duration: 0.6,
      ease: 'none',
      // onStart: () => {
      //   setIsScrolling(true)
      // },
      // onComplete: () => {
      //   setIsScrolling(false)
      // },
    })
  }
}

export const useAnimations = () => {
  const [isScrolling, setIsScrolling] = useState(false)
  const [activeNav, setActiveNav] = useState<string>()
  const sectionAvailable = useRef(false)
  const insideSection = useRef(false)

  const parentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const landingRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const tokenomicsRef = useRef<HTMLDivElement>(null)
  // const roadmapRef = useRef<HTMLDivElement>(null)

  const roadmapContainerRef = useRef<HTMLDivElement>(null)

  const navRef = useRef<HTMLDivElement>(null)
  const navCheckpointRef = useRef<HTMLDivElement>(null)

  const s0Ref = useRef<HTMLDivElement>(null)
  const s1Ref = useRef<HTMLDivElement>(null)
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

    const duration = 0.5
    let offsetsY: number[] = []
    let offsetsX: number[] = []
    let innerHeight = window.innerHeight
    let innerWidth = window.innerWidth

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
      s2Ref.current,
      s3Ref.current,
    ] as HTMLDivElement[]

    for (let vSection of vSections) {
      offsetsY.push(-vSection.offsetTop)
    }
    for (let hSection of hSections) {
      offsetsX.push(-hSection.offsetLeft)
    }

    const prevent = (e: WheelEvent) => {
      e.stopPropagation()
      e.preventDefault()
      e.returnValue = false
      return false
    }

    const slideAnim = (e: WheelEvent) => {
      oldSlide = activeSlide

      const totalSize = vSections.length + hSections.length
      const sections = [...vSections, ...hSections]

      if (gsap.isTweening(container)) {
        console.log('CONTAINER IS ALREADY TWEENING!')
        // prevent(e)
        return
      }

      // console.log('insideSection is', insideSection.current)
      // if (!insideSection.current) {
      //   console.log('RETURN')
      //   return
      // }
      newSlide = e.deltaY > 0 ? activeSlide + 1 : activeSlide - 1

      // Todo: identify if the user scroll is sectionAvailable the height of the "container"
      // if it is, do not animate
      // newSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1)

      // make sure we're not past the end or beginning slide
      newSlide = newSlide < 0 ? 0 : newSlide
      newSlide = newSlide > totalSize - 1 ? totalSize - 1 : newSlide

      if (oldSlide === newSlide) {
        // console.log('Section unavailable. Enable outside scroll')
        sectionAvailable.current = false
        return
      } else {
        // console.log('Section still available. Disable outside scroll')
        activeSlide = newSlide
        sectionAvailable.current = true
      }

      console.log({ activeSlide, newSlide, oldSlide })

      if (
        sectionAvailable.current &&
        !(activeSlide > totalSize - 1 || activeSlide < 0)
      ) {
        // console.log('~sectionAvailable~')
        prevent(e)
      }

      // console.log({ activeSlide, offsetsX, offsetsY })

      //THEN... WE ANIMATE
      const tl = gsap.timeline()

      const item = sections[activeSlide]
      const old = sections[oldSlide]
      
      console.log({ item, old })

      if (item === old) {
        activeSlide = e.deltaY > 0 ? activeSlide + 1 : activeSlide - 1
      }

      if (activeSlide < vSections.length) {
        lastY = offsetsY[activeSlide]
        
      } else if (activeSlide < totalSize) {
        const xIndex = activeSlide - (vSections.length - 1)
        console.log({xIndex })
        lastX = offsetsX[xIndex]
      }

      console.log({ lastX, lastY })

      tl.to(container, {
        duration,
        x: lastX,
        y: lastY,
        ease: 'power2.inOut',
        id: 'BLABLABLABBA',
      })

      // if (activeSlide < vSections.length) {
      //   lastY = offsetsY[activeSlide]
      //   console.log('offset Y')
      //   tl.to(container, {
      //     duration,
      //     y: lastY,
      //     autoKill: true,
      //     ease: 'power2.inOut',
      //     id: 'BLABLABLABBA',
      //   })
      // } else {
      //   lastX = offsetsX[activeSlide]
      //   console.log('offset X', offsetsX, activeSlide)
      //   console.log(offsetsX[activeSlide])
      //   tl.to(container, {
      //     duration,
      //     y: offset
      //     x: offsetsX[activeSlide],
      //     autoKill: true,
      //     ease: 'power2.inOut',
      //     id: 'BLABLABLABBA',
      //   })
      // }
    }

    function newSize() {
      offsetsY = []
      offsetsX = []
      innerHeight = window.innerHeight
      innerWidth = window.innerWidth
      gsap.set(container, {
        height: vSections.length * innerHeight,
        // width: hSections.length * innerWidth,
      })
      // gsap.set(vSections, { width: innerHeight })

      for (let vSection of vSections) {
        offsetsY.push(-vSection.offsetTop)
      }
      // for (let hSection of hSections) {
      //   offsetsY.push(-hSection.offsetLeft)
      // }

      gsap.set(container, {
        y: offsetsY[activeSlide],
        // x: offsetsX[activeSlide],
      })
    }

    // TRACK TOP
    // ScrollTrigger.create({
    //   trigger: parentRef.current,
    //   id: 'dsdsadsad PARENT~~',
    //   markers: true,
    //   invalidateOnRefresh: true,
    //   // scrub: true,
    //   // snap: 1,
    //   // onUpdate: () => {
    //   //   console.log('badsads')
    //   // },
    //   onEnter: () => {
    //     console.log('[default onEnter]: set insideSection:', true)
    //     insideSection.current = true
    //     scrollToSectionY(1)
    //   },
    //   onEnterBack: () => {
    //     console.log('[default onEnterBack]: set insideSection:', true)

    //     scrollToSectionY(1)
    //     insideSection.current = true
    //   },
    //   onLeaveBack: () => {
    //     console.log('[default onLeaveBack]: set insideSection:', false)
    //     insideSection.current = false
    //   },
    //   onLeave: () => {
    //     console.log('[default onLeave]: set insideSection:', false)

    //     insideSection.current = false
    //   },
    // })

    // ScrollTrigger.create({
    //   trigger: parentRef.current,
    //   invalidateOnRefresh: true,
    //   // onEnter: () => {
    //   //   console.log('[topTop onEnter]: set insideSection:', false)
    //   //   insideSection.current = false
    //   //   // scrollToSectionY(1)
    //   // },
    //   // onEnterBack: () => {
    //   //   console.log('[topTop onEnterBack]: set insideSection:', true)

    //   //   // scrollToSectionY(1)
    //   //   insideSection.current = true
    //   // },
    //   onLeaveBack: () => {
    //     console.log('[topTop onLeaveBack]: set insideSection:', false)
    //     insideSection.current = false
    //   },
    //   onLeave: () => {
    //     console.log('[topTop onLeave]: set insideSection:', false)
    //     insideSection.current = false
    //   },
    // })

    // // TRACK BOTTOM
    // ScrollTrigger.create({
    //   trigger: parentRef.current,
    //   id: 'bottom PARENT~~',
    //   markers: true,
    //   invalidateOnRefresh: true,
    //   start: 'bottom bottom',
    //   // scrub: true,
    //   // snap: 1,
    //   // onUpdate: () => {
    //   //   console.log('badsads')
    //   // },
    //   onEnter: () => {
    //     console.log('[bottom onEnter]: set insideSection:', false)
    //     insideSection.current = false
    //     // scrollToSectionY(1)
    //   },
    //   onEnterBack: () => {
    //     console.log('[bottom onEnterBack]: set insideSection:', true)

    //     // scrollToSectionY(1)
    //     insideSection.current = true
    //   },
    //   onLeaveBack: () => {
    //     console.log('[bottom onLeaveBack]: set insideSection:', false)

    //     insideSection.current = false
    //   },
    //   onLeave: () => {
    //     console.log('[bottom onLeave]: set insideSection:', false)

    //     insideSection.current = false
    //   },
    // })

    window.addEventListener('wheel', slideAnim, { passive: false })
    window.addEventListener('resize', newSize)

    // verticalEls.forEach((section, i) => {
    //   ScrollTrigger.create({
    //     trigger: section,
    //     invalidateOnRefresh: true,

    //     onEnter: () => {
    //       console.log(`onEnter ${section?.innerText}`, ScrollTrigger.isScrolling())
    //       scrollToSectionY(i, section)
    //     },
    //   })

    //   if (i === verticalEls.length - 1) return

    //   ScrollTrigger.create({
    //     trigger: section,
    //     start: 'bottom bottom',
    //     invalidateOnRefresh: true,
    //     onEnterBack: () => {
    //       console.log(`onEnterBack ${section?.innerText}`, ScrollTrigger.isScrolling())
    //       scrollToSectionY(i, section)}
    //   })
    // })

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // const horizontalEls = [
    //   s0Ref.current,
    //   s1Ref.current,
    //   s2Ref.current,
    //   s3Ref.current,
    // ]
    // const els = gsap.utils.toArray(horizontalEls)

    // const xScrollSpeed = hContainer.offsetWidth / (els.length - 1) / 1.5

    // ScrollTrigger.create({
    //   trigger: navCheckpointRef.current,
    //   start: 'top+' + (s0Ref.current as HTMLDivElement).offsetHeight,
    //   end: () => '+=' + xScrollSpeed + 200,
    //   markers: true,
    //   onLeaveBack: () => {
    //     gsap.to(navRef.current, {
    //       duration: 0,
    //       y: 300,
    //     })
    //   },
    //   onEnter: () => {
    //     gsap.to(navRef.current, {
    //       y: 0,
    //     })
    //   },
    //   onEnterBack: () => {
    //     gsap.to(navRef.current, {
    //       y: 0,
    //     })
    //   },
    //   // onLeave: () => {
    //   //   gsap.to(navRef.current, {
    //   //     y: 300,
    //   //   })
    //   // },
    // })

    // gsap.to(els, {
    //   xPercent: -100 * (els.length - 1),
    //   duration: 0.2,
    //   ease: 'none',
    //   scrollTrigger: {
    //     trigger: hContainer,
    //     pin: true,
    //     scrub: 1,
    //     end: () => '+=' + xScrollSpeed,
    //     // onLeaveBack: () => {
    //     //   gsap.to(navRef.current, {
    //     //     y: 300,
    //     //   })
    //     // },
    //     // onEnter: () => {
    //     //   gsap.to(navRef.current, {
    //     //     y: 0,
    //     //   })
    //     // },
    //     // onEnterBack: () => {
    //     //   gsap.to(navRef.current, {
    //     //     y: 0,
    //     //   })
    //     // },
    //     // onLeave: () => {
    //     //   gsap.to(navRef.current, {
    //     //     y: 300,
    //     //   })
    //     // },
    //   },
    // })

    // els.forEach((el, i) => {
    //   const element = el as HTMLDivElement
    //   const startPos =
    //     (element.offsetLeft - window.innerWidth / 2) *
    //     (xScrollSpeed / (element.offsetWidth * (els.length - 1)))
    //   const endPos =
    //     element.offsetWidth *
    //     (xScrollSpeed / (element.offsetWidth * (els.length - 1)))

    //   ScrollTrigger.create({
    //     trigger: element,
    //     start: 'top top-=' + startPos,
    //     end: '+=' + endPos,
    //     onEnter: () => {
    //       setActiveNav(element.dataset.tag)
    //     },
    //     onEnterBack: () => {
    //       setActiveNav(element.dataset.tag)
    //     },
    //   })
    // })
  }, [])

  return {
    isScrolling,
    activeNav,
    parentRef,
    containerRef,
    landingRef,
    featuresRef,
    tokenomicsRef,
    roadmapContainerRef,
    navCheckpointRef,
    navRef,
    s0Ref,
    s1Ref,
    s2Ref,
    s3Ref,
  }
}
