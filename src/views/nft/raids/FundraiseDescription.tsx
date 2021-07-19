import React from 'react'
import { SquareFrame } from '@components/UI/Frames/SquareFrame'
import { Title } from '@components/UI/Title'
import { theme } from 'twin.macro'
import useTranslation from 'next-translate/useTranslation'
import nftImg from '@public/images/fundraising_nft.png'
import Image from 'next/image'
import { config } from '@lib/config/config'
import { Container } from '@components/UI/Container'
import { ContractAddress } from '@components/Miscellaneous/ContractAddress'
import Trans from 'next-translate/Trans'

const { fundraisingAddress } = config.blockchain

export const FundraiseDescription = () => {
  const { t } = useTranslation('raids')

  // const rewardingSupportBullets: string[] = t(
  //   'description.description.bullets',
  //   null,
  //   {
  //     returnObjects: true,
  //   }
  // )

  return (
    <SquareFrame removePadding bgColor={theme`colors.gray.800`}>
      <div tw="p-14">
        <div tw="relative w-full h-full text-left flex flex-col items-center lg:flex-row lg:space-x-20">
          <div>
            <Image
              src={nftImg}
              objectFit="contain"
              tw="lg:animate-pulse"
              alt="NFT rewards"
              quality={100}
            />
            <div tw="text-center text-sm mt-2 whitespace-pre-wrap">
              <p>{t`raid_description.exchange.a`}</p>
              <Trans
                i18nKey="raids:raid_description.exchange.b"
                components={[
                  <span
                    key="exchange_nft"
                    tw="text-yellow-400 font-mono uppercase font-bold"
                  />,
                  <span
                    key="exchange_desp"
                    tw="text-cyan-400 font-mono uppercase font-bold"
                  />,
                ]}
              />
            </div>
          </div>

          <div tw="w-full">
            <Title tw="flex-1 text-2xl lg:w-auto lg:text-4xl">{t`raid_description.title`}</Title>
            <p tw="mt-8 whitespace-pre-wrap">{t`raid_description.description.a`}</p>
            <p tw="mt-4 whitespace-pre-wrap">{t`raid_description.description.b`}</p>
            <ul tw="list-disc ml-5 mt-5 space-y-1 font-bold">
              <li>
                <Trans
                  i18nKey="raids:raid_description.description.b1"
                  values={{
                    rarity: config.nft_rarity.legendary,
                  }}
                  components={[
                    <span key="raid_description_b1" tw="text-yellow-400" />,
                  ]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="raids:raid_description.description.b2"
                  values={{
                    rarity: config.nft_rarity.epic,
                  }}
                  components={[
                    <span key="raid_description_b2" tw="text-purple-500" />,
                  ]}
                />
              </li>
              <li>
                <Trans
                  i18nKey="raids:raid_description.description.b3"
                  values={{
                    rarity: config.nft_rarity.rare,
                  }}
                  components={[
                    <span key="raid_description_b3" tw="text-blue-500" />,
                  ]}
                />
              </li>
            </ul>

            <p tw="mt-5 whitespace-pre-wrap">{t`raid_description.description.c`}</p>
          </div>
        </div>

        {fundraisingAddress && (
          <Container tw="mx-auto pt-10 lg:mt-4">
            <ContractAddress
              title={t`contract_address_fundraise`}
              address={fundraisingAddress}
              tw="mt-4 flex justify-center"
              bgColor={theme`colors.gray.900`}
            />
          </Container>
        )}
      </div>
    </SquareFrame>
  )
}
