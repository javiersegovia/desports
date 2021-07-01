import Image from 'next/image'

export const Logo = () => {
  return (
    <div tw="flex space-x-4 items-center">
      <div tw="w-12 h-12">
        <Image src="/images/logo_coin.svg" width={50} height={50} alt="Logo" />
      </div>
      <div tw="hidden lg:block h-6 width[1px] bg-gray-600" />
      <div tw="hidden lg:block letter-spacing[4px] font-bold font-mono">
        <span tw="text-cyan-400">$</span>DESP
      </div>
    </div>
  )
}
