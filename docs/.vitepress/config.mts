import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "我的全部",
  description: "我的知识库",
  base: '/all-my-life/',
  themeConfig: {
    logo: '/assets/logo.jpg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: '我的全部', link: '/' },
      // { text: '健康', link: '/markdown-examples' },
      // { text: '家庭', link: '/markdown-examples' },
      // { text: '生活', link: '/markdown-examples' },
      // { text: '工作', link: '/markdown-examples' },
    ],

    sidebar: {
      // 健康
      '/health/': [
        {
          text: '健康',
          items: [
            { text: '健康', link: '/health/' },
            { text: '健康', link: '/health/' },
            { text: '健康', link: '/health/' },
            { text: '健康', link: '/health/' },
            { text: '健康', link: '/health/' },
          ]
        },
      ],
      // 家庭
      '/family/': [
        {
          text: '健康',
          items: [
            { text: '健康', link: '/health/' },
            { text: '健康', link: '/health/' },
            { text: '健康', link: '/health/' },
            { text: '健康', link: '/health/' },
            { text: '健康', link: '/health/' },
          ]
        },
      ],
      // 生活
      '/life/': [
        {
          text: '健康',
          items: [
            { text: '健康', link: '/health/' },
            { text: '健康', link: '/health/' },
            { text: '健康', link: '/health/' },
            { text: '健康', link: '/health/' },
            { text: '健康', link: '/health/' },
          ]
        },
      ],
      // 工作
      '/work/': [
        {
          text: '健康',
          items: [
            { text: '健康', link: '/health/' },
            { text: '健康', link: '/health/' },
            { text: '健康', link: '/health/' },
            { text: '健康', link: '/health/' },
            { text: '健康', link: '/health/' },
          ]
        },
      ],
      // 学习
      '/study/': [
        {
          text: '记录学习过程',
          items: [
            {
              text: 'Vue',
              collapsed: true,
              items: [
                {
                  text: '读书笔记',
                  items: [
                    {
                      text: '读剑指Vue3',
                      items: [
                        {
                          text: "第一章 Vue.js概述", link: "/study/Vue/reading-line/剑指Vue3/第一章-VueJs概念"
                        }
                      ]
                    },
                  ]
                },
              ]
            },
            {
              text: 'Rust',
              collapsed: true,
              items: [
                { text: 'Rust needs an extended standard library', link: '/study/Rust/Rust-needs-an-extended-standard-library' }
              ]
            },
            {
              text: '量化交易',
              collapsed: true,
              items: [
                { text: 'Rust', link: '/study/rust/' }
              ]
            },
          ]
        },
      ],
      // 副业
      '/bywork/': [
        {
          text: '健康',
          items: [
            { text: '健康', link: '/health/' },
          ]
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
