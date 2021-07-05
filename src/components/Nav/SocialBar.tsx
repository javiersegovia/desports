import { LanguageDropdown } from '@components/Dropdown/LanguageDropdown'
import { Container } from '@components/UI/Container'
import { config } from '@lib/config/config'
import {
  FaTwitter,
  FaInstagram,
  FaDiscord,
  FaTelegram,
  FaReddit,
} from 'react-icons/fa'

const socialNetworks = [
  {
    url: config.social.twitter,
    icon: FaTwitter,
  },
  {
    url: config.social.telegram,
    icon: FaTelegram,
  },
  {
    url: config.social.discord,
    icon: FaDiscord,
  },
  {
    url: config.social.reddit,
    icon: FaReddit,
  },
  // {
  //   url: config.social.facebook,
  //   icon: FaFacebook,
  // },
  {
    url: config.social.instagram,
    icon: FaInstagram,
  },
]

export const SocialIcons = ({ ...props }) => {
  return (
    <>
      {socialNetworks.map(({ url, icon: Icon }) => (
        <a
          key={url}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          <Icon />
        </a>
      ))}
    </>
  )
}

export const SocialBar = ({ ...props }) => {
  return (
    <div tw="top-0 w-full bg-gray-900 text-white py-2 items-center" {...props}>
      <Container tw="flex justify-between">
        <div>
          <LanguageDropdown />
        </div>

        <div tw="flex space-x-4 items-center text-xl text-cyan-500">
          <SocialIcons />
        </div>
      </Container>
    </div>
  )
}
