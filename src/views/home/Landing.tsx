// import { FullScreen } from '@components/UI/FullScreen'
import { useEffect, useRef } from 'react'

export const Landing = () => {
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

  return <div ref={ref}>Landing Section</div>
}
