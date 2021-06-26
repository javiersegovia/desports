import { Container } from '@components/UI/Container'
import { FullScreen } from '@components/UI/FullScreen'
import { Title } from '@components/UI/Title'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { RefObject } from 'react'
import tw from 'twin.macro'
import { VscLock } from 'react-icons/vsc'

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
  unlocking_in?: string
}

export interface RoadmapI18NResult {
  stage1: IStage
  stage2: IStage
  stage3: IStage
}

interface StageFullPageProps {
  stageKey: 'stage1' | 'stage2' | 'stage3'
  image: StaticImageData
  bgImage: StaticImageData
  color: string
  innerRef: RefObject<HTMLDivElement>
  isLocked?: boolean
}

export const StageFullPage = ({
  stageKey,
  image,
  bgImage,
  color,
  innerRef,
  isLocked,
}: StageFullPageProps) => {
  const { t } = useTranslation('home')

  const stage: RoadmapI18NResult = t('roadmap', null, { returnObjects: true })
  const { title, date, description, list, name, subtitle, unlocking_in } =
    stage[stageKey] as IStage

  return (
    <FullScreen sectionRef={innerRef} tw="min-width[100vw] relative">
      <Container tw="mt-24">
        <div
          tw="flex justify-between space-x-40"
          css={[isLocked && tw`items-center justify-center flex-col space-x-0`]}
        >
          {!isLocked && (
            <div>
              <div tw="font-mono mb-5">{date}</div>

              <div tw="flex items-center space-x-4">
                <Title as="h4" tw="text-lg lg:text-xl text-coolGray-300">
                  {title}
                </Title>
                <div tw="width[1px] h-6 bg-coolGray-500" />
                <Title as="h5" tw="text-lg lg:text-xl text-coolGray-300">
                  {subtitle}
                </Title>
              </div>

              <div tw="flex space-x-6 mt-4 items-center">
                <Title as="h3">
                  <span style={{ color }}>{name}</span>
                </Title>
              </div>
              <p tw="mt-10">{description}</p>
              <ul tw="mt-5 space-y-1">
                {list?.length &&
                  list.map((listItem) => (
                    <li tw="list-disc ml-4" key={listItem.description}>
                      {listItem.description}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <div tw="max-w-sm relative mt-14" css={[isLocked && tw`mx-auto`]}>
            <Image src={image} objectFit="contain" alt="Stage Image" />
          </div>
          {isLocked && (
            <>
              <div>
                <div tw="font-mono mt-4 text-center">{date}</div>

                <div tw="mt-4 flex items-center space-x-4">
                  <Title as="h4" tw="text-lg lg:text-xl text-coolGray-300">
                    {title}
                  </Title>
                  <div tw="width[1px] h-6 bg-coolGray-500" />
                  <Title as="h5" tw="text-lg lg:text-xl text-coolGray-300">
                    {subtitle}
                  </Title>
                </div>
                <div tw="flex space-x-6 mt-4 justify-center">
                  <Title as="h3">
                    <span style={{ color }}>{name}</span>
                  </Title>
                </div>
                <div tw="bg-black absolute w-full h-full top-0 bottom-0 left-0 right-0 opacity-80" />
              </div>

              <div tw="top-0 bottom-0 text-coolGray-500 flex items-center justify-center flex-col absolute transform w-full h-full animate-pulse">
                <VscLock tw="text-8xl -mt-20" />
                <p tw="font-mono uppercase font-bold text-2xl mt-4 text-center">
                  {unlocking_in}
                  <br /> 2023
                </p>
              </div>
            </>
          )}
        </div>
      </Container>

      <div tw="z-index[-5]">
        <Image
          src={bgImage}
          alt="Background"
          layout="fill"
          loading="eager"
          objectFit="cover"
          objectPosition="center"
          tw="absolute w-full h-full z-index[-5] opacity-20"
          css={[isLocked && tw`opacity-40`]}
        />
      </div>
    </FullScreen>
  )
}
