import { NavBar } from '@components/Nav/NavBar'
import { SocialBar } from '@components/Nav/SocialBar'
import { useAppSelector } from '@lib/redux/hooks'
import {
  selectAnimationSpeed,
  selectShowNavbar,
} from '@lib/redux/slices/navSlice'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export const Nav = () => {
  const speed = useAppSelector(selectAnimationSpeed)
  const showNavbar = useAppSelector(selectShowNavbar)
  const navbarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gsap.isTweening(navbarRef.current)) return
    gsap.to(navbarRef.current, {
      yPercent: showNavbar ? 0 : -100,
      duration: 0.25,
    })
  }, [showNavbar, speed])

  return (
    <>
      <div
        ref={navbarRef}
        tw="fixed z-50 w-full transition-all duration-100 overflow-hidden max-h-40"
        // css={[!showNavbar && tw`max-h-0`]}
      >
        <SocialBar />
        <NavBar />
      </div>
    </>
  )
}
