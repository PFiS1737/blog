// biome-ignore assist/source/useSortedKeys: better readability
export default {
  site: "https://pfis1737.github.io",

  title: "PFiS'Blog",
  author: "PFiS",
  description: "PFiS'Blog | Powered by Astro and ♥",

  github: "pfis1737",
  repo: "blog",
  branch: "main",

  socialLinks: {
    bilibili: "470803955",
    discord: "",
    email: "pfis1737@gmail.com",
    // biome-ignore lint/security/noSecrets: not a secret
    skland: "2530890042194",
    steam: "",
    telegram: "",
    x: "",
  },

  appearance: {
    postsPerPage: 6,
    recentPostsCount: 4,
  },

  giscus: {
    enabled: true,
  },
} as const
