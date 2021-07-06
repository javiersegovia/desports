import React from 'react'
import { Container } from '@components/UI/Container'
import { Title } from '@components/UI/Title'
import { NavSpacer } from '@components/Nav/NavSpacer'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { IStage } from '../views/home/StageFullPage'
import { Footer } from '@components/Footer/Footer'
import { Nav } from '@components/Nav'
import bgImg from '@public/images/home_bg.jpg'

// TODO: Split the contents of this page between multiple ones in @views/whitepaper

interface ContentItemI18n {
  title: string
  content: string
}

type TokenomicBulletI18N =
  | string
  | {
      description: string
      bullets: string[]
    }

const referencesList = [
  'https://www.statista.com/statistics/490358/esports-revenue-worldwide-by-segment/',
  'https://newzoo.com/insights/articles/what-is-game-live-streaming-how-big-is-the-audience-pandemic-impact-twitch-youtube/',
  'https://betandbeat.com/esports/statistics/',
  'Joseph Macey, Brett Abarbanel and Juho Hamari. What predicts esports betting? A study on consumption of video games, esports, gambling and demographic factors. Research Article. March 3, 2020. https://journals.sagepub.com/doi/full/10.1177/1461444820908510',
]

interface RoadmapItemProps {
  stageKey: 'stage1' | 'stage2' | 'stage3'
}

const RoadmapItem = ({ stageKey }: RoadmapItemProps) => {
  const { t } = useTranslation('roadmap')

  const stage: IStage = t(stageKey, null, { returnObjects: true })
  const { title, name, timeframe, list } = stage

  return (
    <div>
      <div tw="space-y-2 sm:space-y-0 flex flex-col sm:flex-row sm:items-center">
        <h6 tw="font-mono font-bold uppercase letter-spacing[2px] text-xl">
          {title} · {name} <span tw="hidden sm:inline-block"> ·</span>
        </h6>
        <p tw="sm:ml-2">{timeframe}</p>
      </div>

      <ul tw="list-disc ml-5 mt-5 space-y-4">
        {list.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  )
}

const WhitepaperPage = () => {
  const { t } = useTranslation('whitepaper')

  const generalSections: ContentItemI18n[] = t('general_sections', null, {
    returnObjects: true,
  })

  const tokenomicBullets: TokenomicBulletI18N[] = t(
    'tokenomics.bullets',
    null,
    {
      returnObjects: true,
    }
  )

  const corePlatformItems: ContentItemI18n[] = t('core_platform.list', null, {
    returnObjects: true,
  })

  const useCaseItems: ContentItemI18n[] = t('use_cases.list', null, {
    returnObjects: true,
  })

  return (
    <>
      <Nav />

      <div tw="fixed w-full h-full z-index[-1]">
        <Image
          src={bgImg}
          layout="fill"
          placeholder="blur"
          objectPosition="0 60px"
          alt="Background"
          tw="opacity-20 object-contain lg:object-cover lg:object-position[0 100px]"
        />
      </div>

      <div>
        <NavSpacer />
        <Container tw="mx-auto mt-10">
          <Title tw="text-left" as="h1">
            DeSports Network
          </Title>
          <Title
            as="h2"
            tw="mt-2 text-left uppercase letter-spacing[4px] text-xl sm:text-xl lg:text-2xl"
          >
            {t`title`}
          </Title>
        </Container>

        <Container tw="mx-auto mt-10 mb-20">
          <div tw="rounded bg-gray-900 text-coolGray-300 p-10 text-lg space-y-20 text-justify overflow-hidden">
            {generalSections.map(({ title, content }) => (
              <article key={title}>
                <Title as="h3" tw="lg:text-4xl text-left">
                  {title}
                </Title>
                <p tw="mt-5 whitespace-pre-line">{content}</p>
              </article>
            ))}
            <article>
              <Title as="h3" tw="lg:text-4xl text-left">
                {t`tokenomics.title`}
              </Title>
              <ul tw="list-disc ml-5 mt-5 space-y-4">
                {tokenomicBullets.map((bullet) => {
                  if (typeof bullet === 'string') {
                    return <li key={bullet}>{bullet}</li>
                  }
                  return (
                    <li key={bullet.description}>
                      <span>{bullet.description}</span>
                      <ul tw="ml-5 list-style-type[lower-alpha]">
                        {bullet.bullets.map((nestedBullet) => (
                          <li key={nestedBullet}>{nestedBullet}</li>
                        ))}
                      </ul>
                    </li>
                  )
                })}
              </ul>
              <p tw="mt-10 whitespace-pre-line">{t`tokenomics.content`}</p>
            </article>

            <article>
              <Title as="h3" tw="lg:text-4xl text-left">
                {t`roadmap.title`}
              </Title>
              <div tw="mt-6 space-y-10">
                <RoadmapItem stageKey="stage1" />
                <RoadmapItem stageKey="stage2" />
                <RoadmapItem stageKey="stage3" />
              </div>
            </article>

            <article>
              <Title as="h3" tw="lg:text-4xl text-left">
                {t`core_platform.title`}
              </Title>
              <p tw="mt-5 whitespace-pre-line">{t`core_platform.content`}</p>
              {corePlatformItems.map((item) => (
                <div key={item.title} tw="mt-10">
                  <Title as="h3" tw="text-xl lg:text-xl text-left">
                    {item.title}
                  </Title>
                  <p tw="mt-5 whitespace-pre-line">{item.content}</p>
                </div>
              ))}
            </article>

            <article>
              <Title as="h3" tw="lg:text-4xl text-left">
                {t`use_cases.title`}
              </Title>

              {useCaseItems.map((item) => (
                <div key={item.title} tw="mt-10">
                  <Title as="h3" tw="text-xl sm:text-xl lg:text-xl text-left">
                    {item.title}
                  </Title>
                  <p tw="mt-5 whitespace-pre-line">{item.content}</p>
                </div>
              ))}
            </article>

            <article>
              <Title as="h3" tw="lg:text-4xl text-left">
                {t`references.title`}
              </Title>
              <ul tw="list-disc ml-5 mt-5 space-y-4">
                {referencesList.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </div>

      <Footer />
    </>
  )
}

export default WhitepaperPage
