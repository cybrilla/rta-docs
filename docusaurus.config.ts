import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const BASE_URL =
  process.env.PR_NUMBER !== undefined
    ? `/pr-preview/pr-${process.env.PR_NUMBER}/`
    : "/";

const config: Config = {
  title: "Cybrilla POA",
  tagline: "A digital point of acceptance for MF transactions",
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
  plugins: [
    "@docusaurus/theme-mermaid",
    "docusaurus-lunr-search", // Only works after building the app, use `npm run build` & `npm run serve` to test
    // "docusaurus-tailwindcss-loader",
  ],
  markdown: {
    mermaid: true,
  },
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
        docs: {
          sidebarPath: "./sidebars.ts",
        },
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
        src: "img/cybrilla-logo.svg",
        href: "https://cybrilla.com/",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "sidebar",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://cybrilla.com/about",
          label: "About Us",
          position: "right",
          target: "_blank",
        },
        {
          href: "https://cybrilla.com/careers",
          label: "Careers",
          position: "right",
          target: "_blank",
        },
        {
          href: "https://cybrilla.com/in-the-news",
          label: "In The News",
          position: "right",
          target: "_blank",
        },
        {
          href: "https://cybrilla.com/contact",
          label: "Contact Us",
          position: "right",
          target: "_blank",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Explore",
          items: [
            {
              label: "About Us",
              href: "https://cybrilla.com/about",
              target: "_blank",
            },
            {
              label: "Careers",
              href: "https://cybrilla.com/careers",
              target: "_blank",
            },
          ],
        },
        {
          title: "Legal",
          items: [
            {
              label: "Privacy Policy",
              href: "https://cybrilla.com/privacy-policy",
              target: "_blank",
            },
            {
              label: "Payment Terms and Refund Policy",
              href: "https://cybrilla.com/payment-terms-and-refund-policy",
              target: "_blank",
            },
            {
              label: "Terms of Use",
              href: "https://cybrilla.com/terms-of-use",
              target: "_blank",
            },
          ],
        },
        {
          title: "Connect",
          items: [
            {
              label: "Contact Us",
              href: "https://cybrilla.com/contact",
              target: "_blank",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/cybrilla-technologies/",
              target: "_blank",
            },
          ],
        },
        {
          items: [
            {
              html: `
             <div class="footer__address"><p><span class="highlight-text">Company Name :</span> Cybrilla Technologies Private Limited</p><p><span class="highlight-text">Registered Address:</span> 1660 and 1661, The Millers Autograph 1st Floor 27th Main 2nd Sector HSR Layout, Bengaluru, Karnataka, 560102</p><p><span class="highlight-text">SEBI Registered RTA Number :</span> INR000004404 (Validity of the license : 27th March 2024 - Perpetual)</p><p><span class="highlight-text">CIN :</span> U66190KA2010PTC054206</p></div>
              `,
            },
          ],
        },
      ],
      logo: {
        alt: "Cybrilla logo",
        src: "img/cybrilla-logo.svg",
        href: "https://cybrilla.com/",
      },
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
