import { FullScreen } from '@components/UI/FullScreen'
import { RefObject, useEffect, useRef } from 'react'

interface LandingProps {
  animationRef?: RefObject<HTMLDivElement>
}

export const Landing = ({ animationRef }: LandingProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // gsap.to(ref.current, {
    //   scrollTrigger: {
    //     markers: true,
    //     trigger: ref.current,
    //     start: 'top top',
    //     end: '+=500',
    //     pin: true,
    //   },
    //   x: 500,
    // })
  }, [])

  return (
    <FullScreen
      sectionRef={animationRef}
      tw="bg-red-500 flex items-center justify-center"
    >
      <div ref={ref}>Landing Section</div>
    </FullScreen>
  )
}
