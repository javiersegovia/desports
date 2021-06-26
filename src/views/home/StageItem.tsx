/* eslint-disable @next/next/no-img-element */
import { SquareFrame } from '@components/UI/Frames/SquareFrame'
import { useAppSelector } from '@lib/redux/hooks'
import { memo, RefObject, useEffect, useRef } from 'react'
import tw from 'twin.macro'
import { gsap } from 'gsap'

interface IStageItem {
  title: string
  name: string
}

interface StageItemProps {
  imagePath: string
  item: IStageItem
  number: number
  titleColor: string
  bgColor: string
  isActive?: boolean
  navigate: (index: number) => void
  isLocked?: boolean
  shouldMorph?: boolean
  innerRef?: RefObject<HTMLDivElement>
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
    shouldMorph = false,
    innerRef,
    ...otherProps
  }: StageItemProps) => {
    const titleRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    const imageOpacity = isLocked ? 0.3 : 1

    const animationSpeed = useAppSelector(
      (state) => state.screenAnimation.animationSpeed
    )

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
          duration: animationSpeed,
        })

        // Leaving roadmap
      } else {
        gsap.to(titleRef.current, {
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
    }, [shouldMorph, animationSpeed, imageOpacity])

    return (
      <button
        type="button"
        tw="transition-all duration-500"
        ref={buttonRef}
        css={[
          shouldMorph ? tw`mx-0 max-width[250px]` : tw`mx-4 max-width[100%]`,
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
            tw="absolute h-full w-full transition-colors duration-500"
            css={[isLocked && tw`opacity-30`]}
            style={{
              backgroundColor: isActive ? bgColor : 'transparent',
            }}
          />
        </SquareFrame>
        <div
          ref={titleRef}
          tw="mt-8 font-mono uppercase font-bold transition-all duration-500 text-3xl ml-5"
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
