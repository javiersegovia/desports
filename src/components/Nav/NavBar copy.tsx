import { Button } from '@components/UI/Button'
import { Container } from '@components/UI/Container'
import { Disclosure, Transition } from '@headlessui/react'
import useTranslation from 'next-translate/useTranslation'
import { Logo } from './Logo'
import Link from 'next/link'
import { RiCloseFill } from 'react-icons/ri'
import { CgMenuRight } from 'react-icons/cg'
import { SocialIcons } from './SocialBar'
import { styled } from 'twin.macro'
import { Fragment } from 'react'
import { useToggle } from '@lib/hooks/useToggle'
import { TrackersModal } from '@components/Modal/TrackersModal'
import { FrameDivider } from '@root/src/views/home/Landing'

const paths = {
  platform: '/platform',
  team: '/team',
  whitepaper: '/whitepaper',
  shop: '/shop',
  news: '/news',
  ['buy-now']: '/buy-now',
} as const

const StyledTransitions = styled.div`
  .enter {
    transition: opacity 450ms ease-in-out, max-height 300ms ease-out;
  }

  .enterFrom {
    max-height: 0;
  }

  .enterTo {
    max-height: 500px;
  }
`

export const NavBar = () => {
  const [
    trackersModalIsOpen,
    { setTrue: openTrackersModal, setFalse: closeTrackersModal },
  ] = useToggle()

  const { t } = useTranslation('common')

  const links: typeof paths = t('navBar.links', null, {
    returnObjects: true,
  })

  return (
    <>
      <Disclosure>
        {({ open }) => (
          <div tw="top-0 w-full bg-gray-800 text-white py-2 items-center shadow">
            <Container tw="flex items-center">
              <Link href="/" passHref>
                <a>
                  <Logo />
                </a>
              </Link>

              <div tw="hidden lg:flex ml-auto mr-10 space-x-10 items-center">
                <div tw="flex space-x-10 items-center text-white">
                  <button type="button" onClick={openTrackersModal}>
                    {t`shared.trackers.title`}
                  </button>

                  {(Object.keys(paths) as Array<keyof typeof paths>).map(
                    (key) => (
                      <Link key={key} href={paths[key]} passHref>
                        <a
                          href={paths[key]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {links[key]}
                        </a>
                      </Link>
                    )
                  )}
                </div>
              </div>
              <Button
                tw="ml-auto lg:ml-0"
                href={paths['buy-now']}
              >{t`navBar.buy-now`}</Button>
              {/* Mobile menu button*/}
              <Disclosure.Button tw="ml-6 sm:ml-10 lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <RiCloseFill className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <CgMenuRight className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </Container>
            {/* Mobile Navigation */}
            <StyledTransitions>
              <Transition as={Fragment} show={open}>
                <section className="relative">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-red-900 bg-opacity-70 z-index[-10]" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="enter ease-out"
                    enterFrom="enterFrom transform opacity-0"
                    enterTo="enterTo transform opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel
                      static
                      tw="lg:hidden top-0 left-0 right-0 bg-blue-800 -mb-2 flex flex-col z-10"
                    >
                      <Container tw="w-auto pt-8 pb-8 grid grid-cols-2 gap-y-2 gap-x-10 justify-center items-center">
                        <button
                          type="button"
                          tw="text-left py-2 hover:text-yellow-400"
                          onClick={openTrackersModal}
                        >
                          {t`shared.trackers.title`}
                        </button>
                        {(Object.keys(paths) as Array<keyof typeof paths>).map(
                          (key, index) => (
                            <Fragment key={key}>
                              <Link href={paths[key]} passHref>
                                <a
                                  href={paths[key]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  tw="inline-block text-left py-2 hover:text-yellow-400"
                                >
                                  {links[key]}
                                </a>
                              </Link>
                              {(index + 1) % 2 !== 0 && (
                                <FrameDivider
                                  frameWidth={3}
                                  frameHeight={4}
                                  tw="lg:hidden col-span-2"
                                />
                              )}
                            </Fragment>
                          )
                        )}
                        <div tw="col-span-2 flex pt-4 justify-center space-x-6 text-3xl text-cyan-400">
                          <SocialIcons />
                        </div>
                      </Container>
                    </Disclosure.Panel>
                  </Transition.Child>
                </section>
              </Transition>
            </StyledTransitions>
            {/* <StyledTransitions>
              <Transition as={Fragment} show={open}>
                <section className="relative">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-red-900 bg-opacity-70 z-index[-10]" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="enter ease-out"
                    enterFrom="enterFrom transform opacity-0"
                    enterTo="enterTo transform opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel
                      static
                      tw="lg:hidden top-0 left-0 right-0 bg-blue-800 -mb-2 flex flex-col z-10"
                    >
                      <Container tw="w-auto pt-8 pb-8 grid grid-cols-2 gap-y-2 gap-x-10 justify-center items-center">
                        <button
                          type="button"
                          tw="text-left py-2 hover:text-yellow-400"
                          onClick={openTrackersModal}
                        >
                          {t`shared.trackers.title`}
                        </button>
                        {(Object.keys(paths) as Array<keyof typeof paths>).map(
                          (key, index) => (
                            <Fragment key={key}>
                              <Link href={paths[key]} passHref>
                                <a
                                  href={paths[key]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  tw="inline-block text-left py-2 hover:text-yellow-400"
                                >
                                  {links[key]}
                                </a>
                              </Link>
                              {(index + 1) % 2 !== 0 && (
                                <FrameDivider
                                  frameWidth={3}
                                  frameHeight={4}
                                  tw="lg:hidden col-span-2"
                                />
                              )}
                            </Fragment>
                          )
                        )}
                        <div tw="col-span-2 flex pt-4 justify-center space-x-6 text-3xl text-cyan-400">
                          <SocialIcons />
                        </div>
                      </Container>
                    </Disclosure.Panel>
                  </Transition.Child>
                </section>
              </Transition>
            </StyledTransitions> */}
          </div>
        )}
      </Disclosure>

      <TrackersModal isOpen={trackersModalIsOpen} close={closeTrackersModal} />
    </>
  )
}
