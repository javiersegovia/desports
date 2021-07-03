/** @jsxImportSource @emotion/react */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @next/next/no-img-element */
import { SquareFrame } from '@components/UI/Frames/SquareFrame'
import { useAppSelector } from '@lib/redux/hooks'
import { memo, RefObject, useEffect, useRef } from 'react'
import tw from 'twin.macro'
import { gsap } from 'gsap'
import Image from 'next/image'
import { Container } from '@components/UI/Container'
import {
  selectAnimationSpeed,
  selectFooterSection,
  selectNavPosition,
} from '@lib/redux/slices/navSlice'

interface IStageItem {
  title: string
  name: string
}

const LOCKED_OPACITY = 0.3

interface StageItemProps {
  imagePath: string
  item: IStageItem
  number: number
  titleColor: string
  bgColor: string
  isActive?: boolean
  navigate: (index: number) => void
  isLocked?: boolean
  innerRef?: RefObject<HTMLDivElement>
}

type MobileStageItemProps = Pick<
  StageItemProps,
  'item' | 'titleColor' | 'isLocked' | 'innerRef'
> & {
  imagePath: StaticImageData
}

export const MobileStageItem = ({
  isLocked,
  imagePath,
  innerRef,
  titleColor,
  item,
  ...props
}: MobileStageItemProps) => {
  const imageOpacity = isLocked ? LOCKED_OPACITY : 1

  return (
    <Container tw="mx-auto flex relative justify-center" {...props}>
      <SquareFrame
        ref={innerRef}
        tw="w-5/12 sm:w-3/12 relative"
        removePadding
        shadowColor="cyan"
        style={{
          opacity: imageOpacity,
        }}
      >
        <Image src={imagePath} alt={`Stage item`} tw="object-cover" />
      </SquareFrame>

      <div tw="w-7/12 sm:w-3/12 mt-4 font-mono uppercase font-bold transition-all duration-500 text-4xl ml-5">
        <h4>{item.title}</h4>
        <h5 tw="mt-2" style={{ color: titleColor }}>
          {item.name}
        </h5>
      </div>
    </Container>
  )
}

export const StageItem = memo(
  ({
    item,
    imagePath,
    number,
    titleColor,
    bgColor,
    isActive,
    navigate,
    isLocked = false,
    innerRef,
    ...otherProps
  }: StageItemProps) => {
    const titleRef = useRef<HTMLDivElement>(null)
    const buttonContentRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    const imageOpacity = isLocked ? LOCKED_OPACITY : 1

    const animationSpeed = useAppSelector(selectAnimationSpeed)
    const navPosition = useAppSelector(selectNavPosition)
    const footerSection = useAppSelector(selectFooterSection)

    const shouldMorph = navPosition === 'roadmap' || navPosition === 'footer'

    useEffect(() => {
      // Entering Roadmap
      if (shouldMorph) {
        gsap.to(titleRef.current, {
          ease: 'power2.inOut',
          autoAlpha: 0,
          height: 0,
          delay: animationSpeed * 0.25,
          duration: animationSpeed * 0.25,
        })
        gsap.to(imageRef.current, {
          ease: 'power2.inOut',
          autoAlpha: 0,
          delay: animationSpeed,
          duration: animationSpeed * 0.75,
        })
        gsap.to(buttonContentRef.current, {
          ease: 'power2.inOut',
          autoAlpha: 1,
          delay: animationSpeed,
          duration: animationSpeed * 0.5,
        })

        // Leaving roadmap
      } else {
        gsap.to(buttonContentRef.current, {
          ease: 'power2.inOut',
          autoAlpha: 0,
          duration: animationSpeed * 0.5,
        })
        gsap.to(titleRef.current, {
          height: 'auto',
          autoAlpha: 1,
          delay: animationSpeed * 0.5,
          duration: animationSpeed * 0.5,
        })
        gsap.to(imageRef.current, {
          ease: 'power2.inOut',
          autoAlpha: imageOpacity,
          delay: animationSpeed * 0,
          duration: animationSpeed * 1.5,
        })
      }
    }, [shouldMorph, animationSpeed, imageOpacity, footerSection])

    return (
      <button
        type="button"
        tw="transition-all duration-500 lg:max-w-[12.5rem] xl:max-w-[15rem] 2xl:max-w-[17.5rem]"
        css={[
          shouldMorph
            ? tw`mx-0 max-width[15.625rem]`
            : tw`mx-4 max-width[18.75rem]`,
        ]}
        {...otherProps}
        onClick={() => navigate(number)}
      >
        <SquareFrame
          ref={innerRef}
          removePadding
          shouldMorph={shouldMorph}
          shadowColor="cyan"
        >
          <img
            src={imagePath}
            alt={`Stage ${number}`}
            tw="object-cover"
            ref={imageRef}
            style={{
              opacity: imageOpacity,
            }}
          />
          <div
            tw="text-coolGray-300 absolute h-full w-full transition-colors duration-500 flex items-center justify-center font-mono uppercase"
            css={[isLocked && tw`opacity-30`, isActive && tw`text-black`]}
            style={{
              backgroundColor: isActive ? bgColor : 'transparent',
            }}
          >
            <div tw="text-left opacity-0" ref={buttonContentRef}>
              <span tw="block text-base font-semibold">{item.title}</span>
              <span tw="block text-xl font-bold">{item.name}</span>
            </div>
          </div>
        </SquareFrame>
        <div
          ref={titleRef}
          tw="mt-8 font-mono uppercase font-bold transition-all duration-500 lg:text-2xl 2xl:text-3xl 3xl:text-4xl ml-5"
        >
          <h4>{item.title}</h4>
          <h5 tw="mt-2" style={{ color: titleColor }}>
            {item.name}
          </h5>
        </div>
      </button>
    )
  }
)
