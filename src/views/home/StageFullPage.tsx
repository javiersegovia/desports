import { Container } from '@components/UI/Container'
import { FullScreen } from '@components/UI/FullScreen'
import { Title } from '@components/UI/Title'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { RefObject } from 'react'

interface StageFullPageProps {
  stageKey: 'stage1' | 'stage2' | 'stage3'
  image: StaticImageData
  color: string
  innerRef: RefObject<HTMLDivElement>
}

interface IScopeItem {
  description: string
}

interface IStage {
  title: string
  description: string
  name: string
  subtitle: string
  date?: string
  list: IScopeItem[]
}

export interface RoadmapI18NResult {
  stage1: IStage
  stage2: IStage
  stage3: IStage
}

export const StageFullPage = ({
  stageKey,
  image,
  color,
  innerRef,
}: StageFullPageProps) => {
  const { t } = useTranslation('home')

  const stage: RoadmapI18NResult = t('roadmap', null, { returnObjects: true })
  const { title, date, description, list, name /* subtitle */ } = stage[
    stageKey
  ] as IStage

  return (
    <FullScreen
      sectionRef={innerRef}
      tw="min-width[100vw] relative"
      // style={{
      //   background: 'url(/images/stage1.jpg)',
      // }}
    >
      <Image
        src={image}
        alt="Background"
        layout="fill"
        quality={100}
        unoptimized={true}
        objectFit="cover"
        objectPosition="center"
        tw="absolute w-full h-full z-index[-1] opacity-20"
      />
      <Container>
        <div>{date}</div>
        <div tw="flex">
          <Title as="h4">{title}</Title>
        </div>
        <Title as="h3">
          <span style={{ color }}>{name}</span>
        </Title>
        <p tw="mt-10">{description}</p>
        {list?.length &&
          list.map((listItem) => (
            <div key={listItem.description}>{listItem.description}</div>
          ))}
      </Container>
    </FullScreen>
  )
}
