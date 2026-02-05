/** biome-ignore-all assist/source/useSortedKeys: better readability */

import { MailIcon, MarkGithubIcon } from "@primer/octicons-react"
import IconBilbil from "@/assets/icons/bilibili.svg"
import IconSteam from "@/assets/icons/steam.svg"

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
      iconProps: { size: 24 },
    },
    {
      title: "Mail",
      href: "mailto:pfis1737@gmail.com",
      icon: MailIcon,
      iconProps: { size: 16 }, // This is only the octicon style. The icons are always rendered with 'size-6' (24px).
    },
    // {
    //   title: "X",
    //   href: "https://x.com/pfis1737",
    //   icon: IconX,
    //   iconProps: { width: 24, height: 24 },
    // },
    // {
    //   title: "Telegram",
    //   href: "https://t.me/pfis1737",
    //   icon: IconTelegram,
    //   iconProps: { width: 24, height: 24 },
    // },
    // {
    //   title: "Discord",
    //   href: "https://discord.com/users/pfis1737",
    //   icon: IconDiscord,
    //   iconProps: { width: 24, height: 24 },
    // },
    {
      title: "Steam",
      href: "https://steamcommunity.com/id/pfis1737",
      icon: IconSteam,
      iconProps: { width: 24, height: 24 },
    },
    {
      title: "bilibili",
      href: "https://space.bilibili.com/470803955",
      icon: IconBilbil,
      iconProps: { width: 24, height: 24 },
    },
  ],

  appearance: {
    postsPerPage: 6,
    recentPostsCount: 4,
  },

  giscus: {
    enabled: true,
  },
} as const
