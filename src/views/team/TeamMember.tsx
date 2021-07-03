import Image from 'next/image'
import avatarJasaImg from '@public/images/avatar_jasa.jpg'
import avatarAlImg from '@public/images/avatar_al.jpg'
import avatarAiImg from '@public/images/avatar_ai.jpg'
import avatarNaticImg from '@public/images/avatar_natic.jpg'
import { theme } from 'twin.macro'
import useTranslation from 'next-translate/useTranslation'

export interface TeamMemberI18n {
  name: 'AL' | 'NATIC' | 'JASA' | 'Ai'
  pos_1: string
  pos_2: string
}

interface TeamMemberProps {
  member: TeamMemberI18n
  avatar: StaticImageData
  color: string
}

export const TeamMember = ({ member, avatar, color }: TeamMemberProps) => {
  const { name, pos_1, pos_2 } = member

  return (
    <div tw="h-full flex flex-col items-center">
      <figure
        tw="relative w-32 h-32 sm:w-40 sm:h-40 2xl:w-48 2xl:h-48 rounded-full overflow-hidden border-4"
        style={{
          borderColor: color,
        }}
      >
        <Image
          src={avatar}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt={`${name} avatar`}
        />
      </figure>

      <h4 tw="mt-6 font-mono font-bold text-2xl" style={{ color }}>
        {name}
      </h4>

      <div tw="mt-2">
        <p>{pos_1}</p>
        <p>{pos_2}</p>
      </div>
    </div>
  )
}

const membersData = {
  NATIC: {
    avatar: avatarNaticImg,
    color: theme`colors.yellow.400`,
  },
  AL: {
    avatar: avatarAlImg,
    color: theme`colors.red.500`,
  },
  JASA: {
    avatar: avatarJasaImg,
    color: theme`colors.cyan.400`,
  },
  Ai: {
    avatar: avatarAiImg,
    color: theme`colors.purple.500`,
  },
}

export const TeamMembers = ({ ...props }) => {
  const { t } = useTranslation('team')

  const teamMembers: TeamMemberI18n[] = t('team_members', null, {
    returnObjects: true,
  })

  return (
    <main
      tw="grid grid-cols-2 gap-y-10 lg:flex items-center w-full justify-center lg:space-x-14 2xl:space-x-20"
      {...props}
    >
      {teamMembers.map((member) => (
        <TeamMember
          key={member.name}
          member={member}
          avatar={membersData[member.name]?.avatar}
          color={membersData[member.name]?.color}
        />
      ))}
    </main>
  )
}
