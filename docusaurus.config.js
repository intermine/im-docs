module.exports = {
  title: 'InterMine Documentation',
  //tagline: 'The tagline of my site',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'intermine', // Usually your GitHub org/user name.
  projectName: 'im-docs', // Usually your repo name.
  
  themeConfig: {
    navbar: {
      title: 'InterMine Documentation',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {to: 'https://intermineorg.wordpress.com/', label: 'Blog', position: 'left'},
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
              to: '/versions',
              label: 'All versions',
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
              label: 'Get Started',
              to: 'docs/get-started/index',
            },
            {
              label: 'InterMine API Description',
              to: 'docs/api/index',
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
              label: 'Email',
              href: 'info@intermine.org',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/intermine/im-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
