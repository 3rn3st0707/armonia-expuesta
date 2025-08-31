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

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'es', // Spanish as the default
    locales: ['es', 'en'], // Add English
    localeConfigs: {
      es: { label: 'Español' },
      en: { label: 'English' },
    },
  },

 
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


                  /*
          {
            type: 'doc',
            docId: 'intro',
            position: 'right',
            label: 'Chord',
          },

          {to: '/textos/guerra', label: 'Más Textos', position: 'right'},

                   */


          {to: '/highlighter', label: 'Chord Highlighter', position: 'right'},
          
          

        ],


      },
      footer: {
        style: 'dark',
        links: [

 
          {

            items: [

              {
                html: `

                `,
              },
            ],
          },          
        ],
        
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
