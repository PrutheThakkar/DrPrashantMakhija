// /**
//  * @type {import('gatsby').GatsbyConfig}
//  */

// require("dotenv").config()

// module.exports = {
//   siteMetadata: {
//     title: `Prashant Makhija`,
//     description: `Gatsby + WordPress (WPGraphQL) site`,
//     author: `@Prashant Makhija`,
//     siteUrl:
//       process.env.GATSBY_WEBSITE_URL ||
//       "https://prashant.studiosentientdemo.com/",
//   },
//   plugins: [
//     `gatsby-plugin-image`,
//     `gatsby-plugin-sharp`,
//     `gatsby-transformer-sharp`,
//     `gatsby-plugin-sass`,
//     {
//       resolve: `gatsby-source-wordpress`,
//       options: {
//         url:
//           process.env.GATSBY_WPGRAPHQL_URL ||
//           "https://prashant.studiosentientdemo.com/graphql",
//       },
//     },
//   ],
// }


/**
 * @type {import('gatsby').GatsbyConfig}
 */
require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Prashant Makhija`,
    description: `Gatsby + WordPress (WPGraphQL) site`,
    author: `@Prashant Makhija`,
    siteUrl:
      process.env.GATSBY_WEBSITE_URL ||
      "https://app.drprashantmakhija.com/",
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
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