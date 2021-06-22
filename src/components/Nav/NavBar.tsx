import { Button } from '@components/UI/Button'
import { Container } from '@components/UI/Container'
import useTranslation from 'next-translate/useTranslation'
import { Logo } from './Logo'
import Link from 'next/link'

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
    <div tw="top-0 w-full bg-gray-800 text-white py-2 items-center">
      <Container tw="flex justify-between">
        <Link href="/" passHref>
          <a>
            <Logo />
          </a>
        </Link>
        <div tw="flex space-x-20 items-center">
          <div tw="flex space-x-10 items-center text-white">
            {(Object.keys(paths) as Array<keyof typeof paths>).map((key) => (
              <a
                key={key}
                href={paths[key]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {links[key]}
              </a>
            ))}
          </div>
          {/* <Button>{t`navBar.buy-now`}</Button> */}
          <Button href={paths['buy-now']}>{t`navBar.buy-now`}</Button>
        </div>
      </Container>
    </div>
  )
}
