/** @jsxImportSource @emotion/react */
import { Container } from '@components/UI/Container'
import { FullScreen } from '@components/UI/FullScreen'
import { Title } from '@components/UI/Title'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { RefObject } from 'react'
import tw from 'twin.macro'
import { VscLock } from 'react-icons/vsc'

export interface IStage {
  title: string
  description: string
  name: string
  subtitle: string
  date?: string
  timeframe?: string
  list: string[]
  unlocking_in?: string
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
  const { t } = useTranslation('roadmap')

  const stage: IStage = t(stageKey, null, { returnObjects: true })
  const { title, date, description, list, name, subtitle, unlocking_in } = stage

  return (
    <FullScreen
      sectionRef={innerRef}
      tw="min-width[100vw] relative py-20 lg:py-0 flex flex-col"
    >
      <Container tw="mt-10 mb-10 lg:pb-40">
        <div
          tw="flex-col lg:flex-row flex justify-between lg:space-x-40"
          css={[
            isLocked && tw`items-center justify-center lg:flex-col space-x-0`,
          ]}
        >
          {!isLocked && (
            <div>
              <div tw="font-mono font-bold letter-spacing[1px] text-center lg:text-left">
                {date}
              </div>

              <div tw="lg:hidden max-w-xs px-8 lg:px-0 relative mt-8 lg:mt-14 mx-auto">
                <Image src={image} objectFit="contain" alt="Stage Image" />
              </div>

              <div tw="mt-8 lg:mt-5 flex items-center space-x-4 justify-center lg:justify-start">
                <Title
                  as="h4"
                  tw="text-base lg:text-xl text-center text-coolGray-300"
                >
                  {title}
                </Title>
                <Title
                  as="h4"
                  tw="text-base lg:text-xl text-center text-coolGray-300"
                >
                  ·
                </Title>
                <Title
                  as="h5"
                  tw="text-base lg:text-xl text-center text-coolGray-300"
                >
                  {subtitle}
                </Title>
              </div>

              <div tw="flex space-x-6 mt-4 items-center justify-center lg:justify-start">
                <Title tw="text-4xl" as="h3">
                  <span style={{ color }}>{name}</span>
                </Title>
              </div>

              <p tw="mt-10">{description}</p>
              <ul tw="mt-10 pb-10 lg:pb-0 lg:mt-5 space-y-1">
                {list?.length &&
                  list.map((listItem) => (
                    <li
                      tw="list-disc ml-4 sm:text-lg lg:text-base"
                      key={listItem}
                    >
                      {listItem}
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <div
            tw="hidden lg:block max-w-sm relative mt-14"
            css={[isLocked && tw`mx-auto`]}
          >
            <Image src={image} objectFit="contain" alt="Stage Image" />
            {isLocked && (
              <div tw="z-10 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-coolGray-400 animate-pulse">
                <VscLock tw="text-8xl" />
                <p tw="font-mono uppercase font-bold text-3xl mt-4 text-center letter-spacing[1px]">
                  {unlocking_in}
                  <br /> 2022
                </p>
              </div>
            )}
          </div>

          {isLocked && (
            <>
              <div>
                <div tw="font-mono font-bold mt-4 text-center">{date}</div>

                <div tw="lg:hidden max-w-xs px-8 lg:px-0 relative mt-8 lg:mt-14 mx-auto">
                  <Image
                    src={image}
                    objectFit="contain"
                    alt="Stage Image"
                    tw="z-index[-1]"
                  />
                  <div tw="z-10 absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-coolGray-400 animate-pulse">
                    <VscLock tw="text-8xl" />
                    <p tw="font-mono uppercase font-bold text-3xl mt-4 text-center letter-spacing[1px]">
                      {unlocking_in}
                      <br /> 2022
                    </p>
                  </div>
                </div>

                <div tw="mt-8 lg:mt-5 flex flex-wrap items-center space-x-4 justify-center lg:justify-start">
                  <Title
                    as="h4"
                    tw="text-base lg:text-xl text-center text-coolGray-300"
                  >
                    {title}
                  </Title>
                  <Title
                    as="h4"
                    tw="hidden lg:block text-base lg:text-xl text-center text-coolGray-300"
                  >
                    ·
                  </Title>
                  <Title
                    as="h5"
                    tw="text-base lg:text-xl text-center text-coolGray-300"
                  >
                    {subtitle}
                  </Title>
                </div>

                <div tw="flex space-x-6 mt-4 justify-center">
                  <Title as="h3">
                    <span style={{ color }}>{name}</span>
                  </Title>
                </div>
                <div tw="bg-black absolute w-full h-full top-0 bottom-0 left-0 right-0 opacity-70 lg:opacity-80" />
              </div>

              {/* <div tw="hidden lg:flex top-0 bottom-0 text-coolGray-500 items-center justify-center flex-col absolute transform w-full h-full animate-pulse">
                <VscLock tw="text-8xl -mt-20" />
                <p tw="font-mono uppercase font-bold text-3xl mt-4 text-center">
                  {unlocking_in}
                  <br /> 2022
                </p>
              </div> */}
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
