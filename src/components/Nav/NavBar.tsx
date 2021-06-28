import { Button } from '@components/UI/Button'
import { Container } from '@components/UI/Container'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import useTranslation from 'next-translate/useTranslation'
import { Logo } from './Logo'
import Link from 'next/link'
import { RiCloseFill } from 'react-icons/ri'
import { CgMenuRight } from 'react-icons/cg'
import { SocialIcons } from './SocialBar'

const paths = {
  trackers: '/trackers',
  platform: '/platform',
  team: '/team',
  whitepaper: '/whitepaper',
  shop: '/shop',
  news: '/news',
  ['buy-now']: '/buy-now',
} as const

export const NavBar = () => {
  const { t } = useTranslation('common')

  const links: typeof paths = t('navBar.links', null, {
    returnObjects: true,
  })

  return (
    <Disclosure
      as="nav"
      tw="top-0 w-full bg-gray-800 text-white py-2 items-center shadow"
    >
      {({ open }) => (
        <>
          <Container tw="flex items-center">
            <Link href="/" passHref>
              <a>
                <Logo />
              </a>
            </Link>

            <div tw="hidden lg:flex ml-auto mr-10 space-x-10 items-center">
              <div tw="flex space-x-10 items-center text-white">
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

          <Disclosure.Panel tw="lg:hidden bg-gray-800 -mb-2">
            <Container tw="px-2 mt-2 pt-4 pb-3 space-y-1 grid grid-cols-2 justify-center items-center">
              {(Object.keys(paths) as Array<keyof typeof paths>).map((key) => (
                <Link key={key} href={paths[key]} passHref>
                  <a
                    href={paths[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    tw="inline-block text-center p-2"
                  >
                    {links[key]}
                  </a>
                </Link>
              ))}
            </Container>

            <Container tw="flex w-full mx-auto pb-10 justify-center space-x-5 text-2xl text-cyan-400">
              <SocialIcons />
            </Container>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
