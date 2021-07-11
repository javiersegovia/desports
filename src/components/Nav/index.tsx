import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import { NavBar, NavBarProps } from '@components/Nav/NavBar'
import { SocialBar } from '@components/Nav/SocialBar'
import { useAppDispatch, useAppSelector } from '@lib/redux/hooks'
import { routes } from '@lib/config/routes'
import {
  selectAnimationSpeed,
  selectNavPosition,
  selectShowNavbar,
  toggleShowNavbar,
} from '@lib/redux/slices/navSlice'
import { Button } from '@components/UI/Button'
import useTranslation from 'next-translate/useTranslation'
import { theme } from 'twin.macro'

interface NavProps {
  navbarLogo?: NavBarProps['navbarLogo']
  bgTransparent?: boolean
}

export const Nav = ({ navbarLogo, bgTransparent }: NavProps) => {
  const navbarRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const speed = useAppSelector(selectAnimationSpeed)
  const showNavbar = useAppSelector(selectShowNavbar)
  const navPosition = useAppSelector(selectNavPosition)

  useEffect(() => {
    const isInsideRoadmapOrFooter =
      navPosition === 'roadmap' || navPosition === 'footer'

    /**
    If both values are TRUE, it means that the user is
    INSIDE Roadmap/Footer with showNav true, so we change to false (hidden).

    If both values are FALSE, it means that the user is
    OUTSIDE Roadmap/Footer with showNav false, so we change to true (visible).
     */

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

  const { t } = useTranslation('common')

  return (
    <>
      <div ref={navbarRef} tw="fixed z-50 w-full transition-all duration-100">
        <SocialBar tw="hidden lg:block" />
        <NavBar navbarLogo={navbarLogo} />
      </div>

      <div tw="lg:hidden fixed z-50 w-full flex bottom-0 px-10 bg-gray-800 text-white py-2 items-center justify-center space-x-5 shadow">
        {/* <Button
          bgColor={theme`colors.cyan.400`}
          // onClick={openTrackersModal}
        >
          {t`shared.trackers.title`}
        </Button> */}

        <Button href={routes.how_to_buy} bgColor={theme`colors.emerald.400`}>
          {t`navBar.buy-now`}
        </Button>
        {/* <Button tw="w-full" bgColor={theme`colors.t`} href={routes.how_to_buy}> */}
        {/* Buy $DESP */}
        {/* </Button> */}
      </div>
    </>
  )
}
