import Image from 'next/image'

export const Logo = () => {
  return (
    <div tw="flex space-x-4 items-center">
      <div tw="w-12 h-12">
        <Image src="/images/logo_coin.svg" width={50} height={50} alt="Logo" />
      </div>
    </div>
  )
}
