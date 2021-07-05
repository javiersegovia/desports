import { Nav } from '@components/Nav'
import { FullScreen } from '@components/UI/FullScreen'
import { Title } from '@components/UI/Title'
import { routes } from '@lib/config/routes'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
  const { t } = useTranslation('error')

  return (
    <>
      <Nav />

      <FullScreen>
        <div tw="m-auto">
          <Title>{t`404.title`}</Title>
          <p tw="mt-2 mb-5 uppercase font-mono font-bold letter-spacing[2px]">{t`404.description`}</p>
          <Link href={routes.home} passHref>
            <a tw="text-cyan-400 font-medium underline">{t`404.go_back`}</a>
          </Link>
        </div>
      </FullScreen>
    </>
  )
}

export default NotFoundPage
