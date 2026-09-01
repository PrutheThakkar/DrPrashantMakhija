
/**
 * @type {import('gatsby').GatsbyConfig}
 */
require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Dr. Prashant Makhija`,
    description: `Consultant neurologist and sleep medicine specialist in Mumbai.`,
    author: `Dr. Prashant Makhija`,
    siteUrl:
      process.env.GATSBY_WEBSITE_URL ||
      "https://drprashantmakhija.com",
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url:
          process.env.GATSBY_WPGRAPHQL_URL ||
          "https://app.drprashantmakhija.com/graphql",
      },
    },
  ],
}


// https://pruthe.app.n8n.cloud/webhook-test/e804e415-42cd-45f4-8d91-6bd2adc1b6ad
