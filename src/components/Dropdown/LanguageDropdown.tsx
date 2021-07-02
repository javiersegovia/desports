import useTranslation from 'next-translate/useTranslation'
import setLanguage from 'next-translate/setLanguage'
import { Menu, Transition } from '@headlessui/react'
import { HiChevronDown } from 'react-icons/hi'
import { Fragment, ReactNode } from 'react'
import { cx } from '@emotion/css'
import { config } from '@lib/config/config'

// interface LanguagesI18n {
//   en: string
//   es: string
// }

// const languageCodes: (keyof LanguagesI18n)[] = ['en', 'es']

const { languages } = config

interface LanguageButtonProps {
  children: ReactNode
  onClick: () => void
  isActive: boolean
}

const LanguageButton = ({
  children,
  isActive = false,
  ...props
}: LanguageButtonProps) => (
  <button
    type="button"
    tw="text-base py-1"
    className={cx({
      'text-cyan-400': isActive,
    })}
    {...props}
  >
    {children}
  </button>
)

export const LanguageDropdown = () => {
  const { lang } = useTranslation('common')

  return (
    <Menu as="div" tw="relative">
      <Menu.Button tw="flex items-center space-x-2 text-sm letter-spacing[1px]">
        <span>{languages[lang as keyof typeof languages]}</span>
        <HiChevronDown tw="mt-1" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-20 p-4 left-1/2 -translate-x-1/2 mt-2 origin-top-right bg-gray-900 divide-y divide-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            {Object.keys(languages).map((key) => (
              <Menu.Item key={key}>
                <LanguageButton
                  onClick={() => setLanguage(key)}
                  isActive={key === lang}
                >
                  {languages[key as keyof typeof languages]}
                </LanguageButton>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
