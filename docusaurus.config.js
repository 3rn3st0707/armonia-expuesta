// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Armonia Expuesta',
  favicon: '/img/guitar&amp.jpg',

  // Set the production url of your site here
  url: 'https://armonia-expuesta.netlify.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Armonia Expuesta', // Usually your GitHub org/user name.
  projectName: 'Armonia Expuesta', // Usually your repo name.

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',




  plugins: [

    [

      '@docusaurus/plugin-content-blog',
      {
        /**
         * Required for any multi-instance plugin
         */
        id: 'textos',
        /**
         * URL route for the blog section of your site.
         * *DO NOT* include a trailing slash.
         */
        routeBasePath: 'textos',
        /**
         * Path to data on filesystem relative to site dir.
         */
        path: './textos',

        showReadingTime: false,
        blogSidebarTitle: 'Más Textos',
        blogSidebarCount: 'ALL',
      },


    ],



  ],



  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          breadcrumbs: false,
          routeBasePath: '/'
        },

        gtag: {
          trackingID: 'G-8P3WMTND89', // Replace with your Measurement ID
          anonymizeIP: true, // Optional: anonymize IP addresses for privacy
        },


        blog: {
          showReadingTime: false,
          blogSidebarTitle: 'Blog',
          blogSidebarCount: 'ALL',


        },


        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],



  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({

      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },

      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },


      // Replace with your project's social card
      image: '/img/guitar&amp.jpg',
      navbar: {
        title: 'Armonia Expuesta',

        items: [

          {
            to: '/donaciones', // Link to your custom page URL path
            label: 'Donaciones', // The text displayed in the navbar
            position: 'right', // Position on the left or right of the navbar
          },

          {
            label: 'PDF', // The name to be shown
            href: 'https://ernestory8.gumroad.com/l/jtywjl', // The full external URL
            position: 'right', // Position on the navbar
          },

          {
            to: '/APP', // Link to your custom page URL path
            label: 'APP', // The text displayed in the navbar
            position: 'right', // Position on the left or right of the navbar
          },

          {
            label: 'Telegram', // The name to be shown
            href: 'https://t.me/+z8CqgSWodZllN2I5', // The full external URL
            position: 'right', // Position on the navbar
          },


        ],

      },
      footer: {
        style: 'dark',
        links: [


        ],

      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
