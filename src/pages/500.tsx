import { Nav } from '@components/Nav'
import { FullScreen } from '@components/UI/FullScreen'
import { Title } from '@components/UI/Title'
import { routes } from '@lib/config/routes'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React from 'react'

const SSRErrorPage = () => {
  const { t } = useTranslation('error')

  return (
    <>
      <Nav />

      <FullScreen>
        <div tw="m-auto">
          <Title>{t`500.title`}</Title>
          <p tw="mt-2 mb-5 uppercase font-mono font-bold letter-spacing[2px]">{t`500.description`}</p>
          <Link href={routes.home} passHref>
            <a tw="text-cyan-400 font-medium underline">{t`500.go_back`}</a>
          </Link>
        </div>
      </FullScreen>
    </>
  )
}

export default SSRErrorPage
