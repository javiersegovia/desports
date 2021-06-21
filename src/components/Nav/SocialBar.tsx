import { Container } from '@components/UI/Container'
import useTranslation from 'next-translate/useTranslation'
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaDiscord,
  FaTelegram,
  FaYoutube,
  FaTwitch,
  FaReddit,
} from 'react-icons/fa'

const socialNetworks = [
  {
    url: 'twit',
    icon: FaTwitter,
  },
  {
    url: 'tlg',
    icon: FaTelegram,
  },
  {
    url: 'disc',
    icon: FaDiscord,
  },
  {
    url: 'redd',
    icon: FaReddit,
  },
  {
    url: 'fac',
    icon: FaFacebook,
  },
  {
    url: 'ig',
    icon: FaInstagram,
  },
  {
    url: 'yt',
    icon: FaYoutube,
  },
  {
    url: 'twitch',
    icon: FaTwitch,
  },
]

export const SocialBar = () => {
  const { t } = useTranslation('common')
  return (
    <div tw="top-0 w-full bg-gray-900 text-white py-2 items-center">
      <Container tw="flex justify-between">
        <div>{t('socialBar.english')}</div>
        <div tw="flex space-x-4 items-center text-xl text-cyan-500">
          {socialNetworks.map(({ url, icon: Icon }) => {
            return (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                <Icon />
              </a>
            )
          })}
        </div>
      </Container>
    </div>
  )
}
