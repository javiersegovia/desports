import React from 'react'
import Image from 'next/image'
import { Title } from '@components/UI/Title'
import { NavSpacer } from '@components/Nav/NavSpacer'
import { Container } from '@components/UI/Container'
import { styled } from 'twin.macro'
import useTranslation from 'next-translate/useTranslation'
import { IJobPosition, JobPosition } from '@views/team/JobPosition'
import { TeamMembers } from '@views/team/TeamMember'
import { ReadyPlayerMe } from '@views/team/ReadyPlayerMe'
import { config } from '@lib/config/config'
import teamImg from '@public/images/team_background.webp'

const StyledBackground = styled(Image)`
  filter: brightness(50%);
  mix-blend-mode: color-dodge;
`

const TeamPage = () => {
  const { t } = useTranslation('team')

  const openPositions: IJobPosition[] = t('work_with_us.list', null, {
    returnObjects: true,
  })

  const daoBullets: string[] = t('dao_2.bullets', null, {
    returnObjects: true,
  })

  return (
    <>
      <StyledBackground src={teamImg} layout="fill" objectFit="contain" />
      <NavSpacer />

      <Container tw="mt-6 lg:mt-10 text-center pb-20">
        <Title as="h1">{t`title`}</Title>
        <p tw="mt-4">{t`description`}</p>

        <TeamMembers tw="mt-8 lg:mt-14" />

        <aside tw="mt-14">
          <ReadyPlayerMe />
        </aside>

        <section tw="mt-32 text-left">
          <Title as="h2" tw="text-xl lg:text-2xl xl:text-3xl">
            {t`dao_1.title`}
          </Title>
          <p tw="mt-4 text-justify">{t`dao_1.content`}</p>
        </section>

        <section tw="mt-14 text-left">
          <Title
            as="h2"
            tw="text-xl lg:text-2xl xl:text-3xl"
          >{t`dao_2.title`}</Title>
          <p tw="mt-4 text-justify">{t`dao_2.content`}</p>

          <ul tw="list-disc ml-5 mt-5 space-y-2">
            {daoBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </section>

        <section tw="mt-20">
          <Title as="h2">{t`work_with_us.title`}</Title>
          <p tw="mt-4">{t`work_with_us.description`}</p>

          <div tw="mt-14 space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 grid-flow-col gap-10">
            {openPositions.map((position) => (
              <JobPosition key={position.title} position={position} />
            ))}
          </div>

          <p tw="mt-10">
            <span tw="block">{t`contact_us`}</span>
            <a
              href={`mailto:${config.email.careers}`}
              target="_blank"
              rel="noopener noreferrer"
              tw="text-cyan-400 font-bold"
            >
              {config.email.careers}
            </a>
          </p>
        </section>
      </Container>
    </>
  )
}

export default TeamPage
