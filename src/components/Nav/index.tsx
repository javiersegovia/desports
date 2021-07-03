import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { NavBar } from '@components/Nav/NavBar'
import { SocialBar } from '@components/Nav/SocialBar'
import { useAppDispatch, useAppSelector } from '@lib/redux/hooks'
import {
  selectAnimationSpeed,
  selectNavPosition,
  selectShowNavbar,
  toggleShowNavbar,
} from '@lib/redux/slices/navSlice'
// import { RootState } from '@lib/redux/store'

// const selectFooterSection = (state: RootState) =>
//   state.screenAnimation.sections.footer

// const selectStage1Section = (state: RootState) =>
//   state.screenAnimation.sections.stage1

// const selectStage2Section = (state: RootState) =>
//   state.screenAnimation.sections.stage2

// const selectStage3Section = (state: RootState) =>
//   state.screenAnimation.sections.stage3

export const Nav = () => {
  const navbarRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const speed = useAppSelector(selectAnimationSpeed)
  const showNavbar = useAppSelector(selectShowNavbar)
  const navPosition = useAppSelector(selectNavPosition)

  useEffect(() => {
    if (gsap.isTweening(navbarRef.current)) return

    const isInsideRoadmapOrFooter =
      navPosition === 'roadmap' || navPosition === 'footer'

    /**
    If both values are TRUE, it means that the user is
    INSIDE Roadmap/Footer with showNav true, so we change to false (hidden).

    If both values are FALSE, it means that the user is
    OUTSIDE Roadmap/Footer with showNav false, so we change to true (visible).
     */

    console.log({ isInsideRoadmapOrFooter, showNavbar })

    let show = showNavbar

    if (isInsideRoadmapOrFooter === showNavbar) {
      dispatch(toggleShowNavbar())
      show = !showNavbar
    }

    gsap.to(navbarRef.current, {
      yPercent: show ? 0 : -100,
      duration: 0.25,
    })
  }, [showNavbar, speed, navPosition, dispatch])

  return (
    <>
      <div ref={navbarRef} tw="fixed z-50 w-full transition-all duration-100">
        <SocialBar tw="hidden lg:block" />
        <NavBar />
      </div>
    </>
  )
}
