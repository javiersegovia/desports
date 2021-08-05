import { useState } from 'react'
import { Settings } from 'react-slick'

export const useClickableSlider = (sliderSettings: Settings) => {
  const [clickable, setClickable] = useState(true)

  const clickableSettings = {
    ...sliderSettings,
    beforeChange: () => setClickable(false),
    afterChange: () => setClickable(true),
  }

  return { clickable, clickableSettings }
}
