import Image from 'next/image'
import LogoSVG from '@public/images/logo_coin.svg'

export const Logo = () => {
  return (
    <div tw="flex space-x-4 items-center">
      <div tw="w-12 h-12">
        <Image
          src={LogoSVG}
          loading="eager"
          width={50}
          height={50}
          alt="Logo"
        />
      </div>
    </div>
  )
}
