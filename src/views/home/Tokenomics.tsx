import { Container } from '@components/UI/Container'
import { Title } from '@components/UI/Title'
import useTranslation from 'next-translate/useTranslation'
import { styled } from 'twin.macro'

// todo: resize this NavSpacer when we hide the social bar of the navbar
const NavSpacer = () => <div tw="height[104px]" />

const StyledBackground = styled.div`
  background: url('/images/tokenomics_background.png');
`

// const Block = styled.div``

export const Tokenomics = () => {
  const { t } = useTranslation('home')

  // const tokenomics = t('tokenomics', null, {
  //   returnObjects: true,
  // })

  return (
    <>
      <StyledBackground tw="absolute z-index[-1] bg-contain bg-center bg-no-repeat opacity[.1] w-full h-full" />
      <NavSpacer />
      <div tw="" />
      <Container tw="mx-auto">
        <div tw="text-center mt-10">
          <Title>{t`tokenomics.title`}</Title>
          <p tw="text-coolGray-300 mt-6 max-w-2xl mx-auto">{t`tokenomics.description`}</p>
        </div>

        <div tw="flex justify-between">
          {/* <div>
            {tokenomics.map({ title, description}) => <Block />(
              <div>
                <h4>{title}</h4>
                <p>{description}</p>
              </div>
            )}
          </div> */}
        </div>
      </Container>
    </>
  )
}
