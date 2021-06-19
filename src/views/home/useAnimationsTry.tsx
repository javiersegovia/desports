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

  useEffect(() => {}, [])

  const handleNav = (x: number) => console.log(x)

  return {
    handleNav,
    checkRef,
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
