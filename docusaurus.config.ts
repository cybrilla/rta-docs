import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const BASE_URL =
  process.env.PR_NUMBER !== undefined
    ? `/rta-docs/pr-preview/pr-${process.env.PR_NUMBER}/`
    : "/rta-docs/";

const config: Config = {
  title: "Cybrilla RTA",
  tagline: "Dinosaurs are cool",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://cybrilla.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: BASE_URL,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "cybrilla", // Usually your GitHub org/user name.
  projectName: "rta-docs", // Usually your repo name.

  trailingSlash: false,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  // plugins: ["docusaurus-tailwindcss-loader", "docusaurus-lunr-search"],
  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    colorMode: {
      disableSwitch: true,
      respectPrefersColorScheme: false,
      defaultMode: "light",
    },
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "",
      logo: {
        alt: "Cybrilla logo",
        src: "img/cybrilla-logo-full.webp",
      },
      items: [
        {
          href: "https://fintechprimitives.com/api/",
          label: "APIs",
          position: "right",
        },
        {
          type: "dropdown",
          label: "About us",
          position: "right",
          items: [
            {
              label: "Fintech primitives",
              href: "https://fintechprimitives.com/",
            },
            {
              label: "Cybrilla technologies",
              href: "https://www.cybrilla.com/",
            },
            {
              label: "Careers",
              href: "https://www.cybrilla.com/careers.html",
            },
          ],
        },
      ],
    },
    footer: {
      style: "dark",
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Cybrilla Technologies Private Limited`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
