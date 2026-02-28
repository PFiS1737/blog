/** biome-ignore-all assist/source/useSortedKeys: better readability */

import { MailIcon, MarkGithubIcon, type Icon as Octicon, type IconProps as OcticonProps } from "@primer/octicons-react"
import type { SvgComponent } from "astro/types"
import IconBilbil from "@/assets/icons/bilibili.svg"
import IconSteam from "@/assets/icons/steam.svg"

type SiteConfig = {
  site: string

  title: string
  author: string
  description: string

  github: string
  repo: string
  branch: string

  socialLinks: {
    title: string
    href: string
    icon: SvgComponent | Octicon
    octiconProps?: OcticonProps
  }[]

  appearance: {
    postsPerPage: number
    recentPostsCount: number
  }

  giscus: {
    enabled: boolean
  }
}

export default {
  site: "https://pfis1737.github.io",

  title: "PFiS'Blog",
  author: "PFiS",
  description: "PFiS'Blog | Powered by Astro and ♥",

  github: "pfis1737",
  repo: "blog",
  branch: "main",

  socialLinks: [
    {
      title: "GitHub",
      href: "https://github.com/pfis1737",
      icon: MarkGithubIcon,
      octiconProps: { size: 24 },
    },
    {
      title: "Mail",
      href: "mailto:pfis1737@gmail.com",
      icon: MailIcon,
      octiconProps: { size: 16 }, // This is only the octicon variant. The icons are always rendered with 'size-6' (24px).
    },
    // {
    //   title: "X",
    //   href: "https://x.com/pfis1737",
    //   icon: IconX,
    // },
    // {
    //   title: "Telegram",
    //   href: "https://t.me/pfis1737",
    //   icon: IconTelegram,
    // },
    // {
    //   title: "Discord",
    //   href: "https://discord.com/users/pfis1737",
    //   icon: IconDiscord,
    // },
    {
      title: "Steam",
      href: "https://steamcommunity.com/id/pfis1737",
      icon: IconSteam,
    },
    {
      title: "bilibili",
      href: "https://space.bilibili.com/470803955",
      icon: IconBilbil,
    },
  ],

  appearance: {
    postsPerPage: 6,
    recentPostsCount: 4,
  },

  giscus: {
    enabled: true,
  },
} as SiteConfig
