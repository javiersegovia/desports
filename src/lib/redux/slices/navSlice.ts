import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { gsap } from 'gsap'

export type TNavSource = 'WHEEL' | 'TOUCH' | 'CLICK'
type TNavPosition = 'body' | 'bridge' | 'roadmap' | 'footer'

type TransitionPayload = {
  oldIndex: number
  activeIndex: number
  animationSpeed: number
}

type TNavSectionName =
  | 'landing'
  | 'tokenomics'
  | 'features'
  | 'bridge'
  | 'stage1'
  | 'stage2'
  | 'stage3'
  | 'footer'

const mapIndexToSection: { [key: number]: TNavSectionName } = {
  0: 'landing',
  1: 'tokenomics',
  2: 'features',
  3: 'bridge',
  4: 'bridge',
  5: 'stage1',
  6: 'stage2',
  7: 'stage3',
  8: 'footer',
}

const mapIndexToNavPosition: { [key: number]: TNavPosition } = {
  0: 'body',
  1: 'body',
  2: 'body',
  3: 'bridge',
  4: 'bridge',
  5: 'roadmap',
  6: 'roadmap',
  7: 'roadmap',
  8: 'footer',
}

interface INavSection {
  index: number
  name: TNavSectionName
}

interface NavState {
  // Core

  animationSpeed: number
  oldSection: INavSection | null
  activeSection: INavSection | null
  navSource: TNavSource | null
  navPosition: TNavPosition | null

  // Side Effects (Context State)

  context: {
    showNavbar: boolean
    showSocialBar: boolean
    showRoadmapNav: boolean
    transformedRoadmapNav: boolean
  }

  // Events

  events: {
    onLeave: INavSection | null
    onEnter: INavSection | null
    onEnterBack: INavSection | null
    onLeaveBack: INavSection | null
  }
}

export const animationDefaultState: NavState = {
  // Core
  animationSpeed: 0.75,
  oldSection: null,
  activeSection: null,
  navSource: null,
  navPosition: null,

  // Side Effects (Context State)

  context: {
    showNavbar: true,
    showSocialBar: true,
    showRoadmapNav: false,
    transformedRoadmapNav: false,
  },

  // Events

  events: {
    onLeave: null,
    onEnter: null,
    onEnterBack: null,
    onLeaveBack: null,
  },
} as NavState

const getSection = (index: number): INavSection => ({
  index,
  name: mapIndexToSection[index],
})
const getNavPosition = (index: number): TNavPosition =>
  mapIndexToNavPosition[index]

const setCommonData = (
  state: NavState,
  { activeIndex, oldIndex }: TransitionPayload,
  source: TNavSource
) => {
  const activeSection = getSection(activeIndex)
  const oldSection = getSection(oldIndex)
  const navPosition = getNavPosition(activeIndex)

  state.activeSection = activeSection
  state.oldSection = oldSection
  state.navPosition = navPosition
  state.navSource = source

  // If advancing, we set the values of back events to null
  if (activeSection.index > oldSection.index) {
    state.events = {
      onEnter: activeSection,
      onLeave: oldSection,
      onEnterBack: null,
      onLeaveBack: null,
    }
  } else {
    state.events = {
      onEnter: null,
      onLeave: null,
      onEnterBack: activeSection,
      onLeaveBack: oldSection,
    }
  }

  return { activeSection, oldSection, navPosition, source }
}

type AnimationPayload = PayloadAction<TransitionPayload>

type RoadmapNavPayload = PayloadAction<{
  element: HTMLElement
}>

export const screenAnimationSlice = createSlice({
  name: 'screenAnimation',
  initialState: animationDefaultState,
  reducers: {
    resetState: (state) => {
      return {
        ...animationDefaultState,
        context: state.context,
      }
    },
    wheelTransition: (state, action: AnimationPayload) => {
      setCommonData(state, action.payload, 'WHEEL')
    },
    touchTransition: (state, action: AnimationPayload) => {
      setCommonData(state, action.payload, 'TOUCH')
    },
    clickTransition: (state, action: AnimationPayload) => {
      setCommonData(state, action.payload, 'CLICK')
    },
    toggleShowRoadmapNav: (state) => {
      state.context.showRoadmapNav = !state.context.showRoadmapNav
    },
    toggleShowNavbar: (state) => {
      state.context.showNavbar = !state.context.showNavbar
    },
    toggleTransformedRoadmapNav: (state) => {
      state.context.transformedRoadmapNav = !state.context.transformedRoadmapNav
    },

    // Actions with side effects

    hideRoadmapNav: (state, action: RoadmapNavPayload) => {
      state.context.showRoadmapNav = false
      gsap.to(action.payload.element, {
        duration: state.animationSpeed,
        ease: 'power2.inOut',
        yPercent: 0,
      })
    },
  },
})

export const {
  wheelTransition,
  touchTransition,
  clickTransition,
  resetState,
  toggleShowRoadmapNav,
  toggleShowNavbar,
  toggleTransformedRoadmapNav,
  hideRoadmapNav,
} = screenAnimationSlice.actions

export const transitionActions = {
  WHEEL: wheelTransition,
  TOUCH: touchTransition,
  CLICK: clickTransition,
}

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value
export const selectAnimation = (state: RootState) => state.screenAnimation

export const selectAnimationSpeed = (state: RootState) =>
  state.screenAnimation.animationSpeed

export const selectShowNavbar = (state: RootState) =>
  state.screenAnimation.context.showNavbar

export const selectAnimationEvents = (state: RootState) =>
  state.screenAnimation.events

export const selectAnimationContext = (state: RootState) =>
  state.screenAnimation.context

export const screenAnimationReducer = screenAnimationSlice.reducer
