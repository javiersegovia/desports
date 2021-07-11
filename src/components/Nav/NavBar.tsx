import { Fragment, useEffect } from 'react'
import Link from 'next/link'
import { styled, theme } from 'twin.macro'
import { Button } from '@components/UI/Button'
import { Container } from '@components/UI/Container'
import { Transition } from '@headlessui/react'
import { RiCloseFill } from 'react-icons/ri'
import { CgMenuRight } from 'react-icons/cg'
import { useToggle } from '@lib/hooks/useToggle'
import { FrameDivider } from '@root/src/views/home/Landing'
import { routes } from '@lib/config/routes'
import { Logo } from './Logo'
import { SocialIcons } from './SocialBar'
import useTranslation from 'next-translate/useTranslation'
// import { config } from '@lib/config/config'
import { useRef } from 'react'
import { useOnClickOutside } from '@lib/hooks/useOnClickOutside'
import dynamic from 'next/dynamic'
import { InstanceModalProps } from '@components/Modal/BaseModal'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

const TrackersModal = dynamic<InstanceModalProps>(() =>
  import('@components/Modal/TrackersModal').then(
    (module) => module.TrackersModal
  )
)

// This paths keys should map to the content of common:navBar.links
const paths = {
  team: routes.team,
  whitepaper: routes.whitepaper,
  fundraising: routes.fundraising,
  // shop: config.shop,
  // blog: routes.blog,
} as const

const StyledTransitions = styled.div`
  .enter {
    -webkit-transition: opacity 450ms ease-in-out, max-height 300ms ease-out;
    transition: opacity 450ms ease-in-out, max-height 300ms ease-out;
  }

  .enterFrom {
    max-height: 0;
  }

  .enterTo {
    max-height: 500px;
  }
`

const StyledMobileLine = styled.div`
  clip-path: polygon(100% 0%, calc(100% - 1rem) 100%, 0 100%, 0 0);
`

export interface NavBarProps {
  navbarLogo?: ReactNode
}

export const NavBar = ({ navbarLogo: NavLogo, ...props }: NavBarProps) => {
  const [
    trackersModalIsOpen,
    { setTrue: openTrackersModal, setFalse: closeTrackersModal },
  ] = useToggle()

  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const [
    dropdownNavIsOpen,
    { setFalse: closeDropdownNav, toggle: toggleDropdownNav },
  ] = useToggle()

  useOnClickOutside(dropdownRef, closeDropdownNav)

  const { t } = useTranslation('common')

  const links: typeof paths = t('navBar.links', null, {
    returnObjects: true,
  })

  useEffect(() => {
    router.events.on('routeChangeStart', closeDropdownNav)
    router.events.on('routeChangeComplete', () => closeDropdownNav)
    router.events.on('routeChangeError', () => closeDropdownNav)
  }, [closeDropdownNav, router.events])

  return (
    <>
      <div
        ref={dropdownRef}
        tw="w-full bg-gray-800 text-white py-2 items-center shadow"
        {...props}
      >
        <Container tw="flex items-center">
          {NavLogo || (
            <Link href={routes.home} passHref>
              <a>
                <Logo />
              </a>
            </Link>
          )}

          <div tw="hidden lg:flex ml-auto mr-10 space-x-10 items-center">
            <div tw="flex space-x-10 items-center text-white">
              {/* todo: enable trackers */}
              <button
                type="button"
                tw="hover:text-yellow-400"
                // disabled
                onClick={openTrackersModal}
              >
                {t`shared.trackers.title`}
              </button>

              {(Object.keys(paths) as Array<keyof typeof paths>).map((key) => (
                <Link key={key} href={paths[key]} passHref>
                  <a tw="hover:text-yellow-400">{links[key]}</a>
                </Link>
              ))}
            </div>
          </div>

          <Button tw="hidden lg:block ml-auto lg:ml-0" href={routes.how_to_buy}>
            {t`navBar.buy-now`}
          </Button>

          {/* Mobile Dialog Button*/}
          <button
            type="button"
            onClick={toggleDropdownNav}
            tw="ml-auto sm:ml-10 lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span className="sr-only">Open main menu</span>
            {dropdownNavIsOpen ? (
              <RiCloseFill className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <CgMenuRight className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </Container>

        {/* Mobile Navigation */}
        <StyledTransitions tw="z-10">
          <Transition
            as={Fragment}
            show={dropdownNavIsOpen}
            enter="enter ease-out"
            enterFrom="enterFrom transform opacity-0"
            enterTo="enterTo transform opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <section tw="relative">
              <div tw="lg:hidden top-0 absolute left-0 right-0 bg-gray-800 -mb-2 flex flex-col z-10">
                <StyledMobileLine tw="absolute -bottom-4 w-2/3 min-h-[1rem] bg-gray-800" />
                <Container tw="w-auto pt-8 pb-8 grid grid-cols-2 gap-y-2 gap-x-10 justify-center items-center">
                  {/* todo: enable trackers */}
                  <button
                    type="button"
                    tw="text-left py-2 hover:text-yellow-400"
                    // tw="cursor-not-allowed opacity-20 text-left py-2"
                    // disabled
                    onClick={openTrackersModal}
                  >
                    {t`shared.trackers.title`}
                  </button>

                  {(Object.keys(paths) as Array<keyof typeof paths>).map(
                    (key, index) => (
                      <Fragment key={key}>
                        <Link href={paths[key]} passHref>
                          <a tw="inline-block text-left py-2 hover:text-yellow-400">
                            {links[key]}
                          </a>
                        </Link>
                        {(index + 1) % 2 !== 0 &&
                          index !== Object.keys(paths).length - 1 && (
                            <FrameDivider
                              frameWidth={3}
                              frameHeight={4}
                              color={theme`colors.blueGray.500`}
                              tw="lg:hidden col-span-2"
                            />
                          )}
                      </Fragment>
                    )
                  )}
                  <FrameDivider
                    frameWidth={3}
                    frameHeight={4}
                    color={theme`colors.blueGray.500`}
                    tw="lg:hidden col-span-2"
                  />
                  <div tw="col-span-2 flex pt-4 justify-center space-x-6 text-3xl text-cyan-400">
                    <SocialIcons />
                  </div>
                </Container>
              </div>
            </section>
          </Transition>
        </StyledTransitions>
      </div>

      {dropdownNavIsOpen && (
        <div tw="z-index[-1] fixed min-h-screen inset-0 bg-gray-900 bg-opacity-70" />
      )}

      <TrackersModal isOpen={trackersModalIsOpen} close={closeTrackersModal} />
    </>
  )
}
