import { NavBar } from '@components/Nav/NavBar'
import { SocialBar } from '@components/Nav/SocialBar'

export const Nav = () => {
  return (
    <>
      <div tw="absolute z-10 w-full">
        <SocialBar />
        <NavBar />
      </div>
    </>
  )
}
