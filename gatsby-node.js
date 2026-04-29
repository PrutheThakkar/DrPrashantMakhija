const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allWpPost {
        nodes {
          id
          slug
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const blogDetailTemplate = path.resolve("./src/templates/blog-detail.js")

  result.data.allWpPost.nodes.forEach(post => {
    createPage({
      path: `/blogs/${post.slug}`,
      component: blogDetailTemplate,
      context: {
        id: post.id,
      },
    })
  })
}