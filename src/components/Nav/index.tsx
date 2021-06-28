import { NavBar } from '@components/Nav/NavBar'
import { SocialBar } from '@components/Nav/SocialBar'
import { useAppDispatch, useAppSelector } from '@lib/redux/hooks'
import {
  selectAnimation,
  selectAnimationSpeed,
  selectShowNavbar,
  toggleShowNavbar,
} from '@lib/redux/slices/navSlice'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export const Nav = () => {
  const speed = useAppSelector(selectAnimationSpeed)
  const showNavbar = useAppSelector(selectShowNavbar)
  const navbarRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()
  const state = useAppSelector(selectAnimation)

  useEffect(() => {
    if (gsap.isTweening(navbarRef.current)) return

    const isEnteringRoadmapOrFooter =
      (state.navPosition === 'roadmap' || state.navPosition === 'footer') &&
      !showNavbar

    const isLeavingRoadmapOrFooter =
      state.navPosition !== 'roadmap' &&
      state.navPosition !== 'footer' &&
      showNavbar

    // Entering Roadmap
    if (isEnteringRoadmapOrFooter || isLeavingRoadmapOrFooter) {
      dispatch(toggleShowNavbar())

      gsap.to(navbarRef.current, {
        yPercent: showNavbar ? 0 : -100,
        duration: 0.25,
      })
    }
  }, [showNavbar, speed, state.navPosition, dispatch])

  return (
    <>
      <div
        ref={navbarRef}
        tw="fixed z-50 w-full transition-all duration-100 overflow-hidden"
      >
        <SocialBar />
        <NavBar />
      </div>
    </>
  )
}
