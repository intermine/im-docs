module.exports = {
  title: 'InterMine Server Documentation',
  //tagline: 'The tagline of my site',
  url: 'http://intermine.org',
  baseUrl: '/im-docs/',
  onBrokenLinks: 'error',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'intermine',
  projectName: 'im-docs',
  plugins: [require.resolve('@cmfcmf/docusaurus-search-local')],
  themeConfig: {
    navbar: {
      title: 'InterMine Server Documentation',
      hideOnScroll: true,
      logo: {
        alt: 'InterMine Logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: 'docs/introduction/index', activeBasePath: 'docs', label: 'Docs', position: 'left'},
        {href: 'https://intermineorg.wordpress.com/', label: 'Blog', position: 'left'},
        {
          href: 'http://intermine.org',
          label: 'InterMine',
          position: 'right',
        },
        {
          href: 'https://github.com/intermine/im-docs',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              href: 'https://intermine.readthedocs.io/en/latest/',
              label: 'Legacy Documentation',
            },
          ]
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: 'docs/get-started/tutorial/index',
            },
            {
              label: 'Create Your Own InterMine',
              to: 'docs/get-started/create-your-mine',
            },
            {
              label: 'Web Services',
              to: 'docs/web-services/index',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'http://chat.intermine.org',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/intermineorg',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              href: 'https://intermineorg.wordpress.com/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/intermine/im-docs',
            },
            {
              label: 'Contact us',
              href: 'docs/about/contact-us',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()}, University of Cambridge. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/intermine/im-docs/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
