import tw, { styled, theme } from 'twin.macro'
import useTranslation from 'next-translate/useTranslation'
import { Checkbox } from '@components/Forms/Fields/Checkbox'
import { config } from '@lib/config/config'
import { StyledTextMono } from './FundraiseMeter'

const StyledRarityFrame = styled.div`
  ${tw`bg-gray-800 space-y-3 px-8 pt-6 pb-10`}

  clip-path: polygon(0% 0%, 90% 0, 100% 10%, 100% 92%, 57% 92%, 48% 100%, 0% 100%);
`

interface NFTRarityItemProps {
  color: string
  name: string
}

const NFTRarityItem = ({ color, name }: NFTRarityItemProps) => {
  return (
    <div tw="flex items-center space-x-3">
      <Checkbox color={color} isChecked />
      <span tw="font-bold" style={{ color }}>
        {name}
      </span>
    </div>
  )
}

export const NFTRarity = ({ ...props }) => {
  const { t } = useTranslation('nft-common')

  return (
    <StyledRarityFrame {...props}>
      <StyledTextMono>{t`rarity.title`}</StyledTextMono>
      <NFTRarityItem
        color={theme`colors.yellow.400`}
        name={`${t`rarity.legendary`} [${config.nft_rarity.legendary}]`}
      />
      <NFTRarityItem
        color={theme`colors.purple.500`}
        name={`${t`rarity.epic`} [${config.nft_rarity.epic}]`}
      />
      <NFTRarityItem
        color={theme`colors.blue.500`}
        name={`${t`rarity.rare`} [${config.nft_rarity.rare}]`}
      />
      <NFTRarityItem
        color={theme`colors.gray.400`}
        name={`${t`rarity.common`} [${config.nft_rarity.common}]`}
      />
    </StyledRarityFrame>
  )
}
