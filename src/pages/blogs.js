import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import InsidePage from "../components/Insidepage"


const placeholderImage =
  "https://app.drprashantmakhija.com/wp-content/uploads/2026/03/Hero-Image.jpg"

const BlogPage = ({ data }) => {
  const blogList = data?.allWpPost?.edges || []

  const stripHtml = html => {
    if (!html) return ""
    return html.replace(/<[^>]*>?/gm, "").slice(0, 140)
  }

  return (
    <Layout>
      <InsidePage pageId={288} />

      <section className="blog-list-section">
        <div className="container">
          <div className="blog-grid">
            {blogList.map(({ node }) => {
              const blogImage =
                node?.featuredImage?.node?.mediaItemUrl || placeholderImage

              const blogAlt =
                node?.featuredImage?.node?.altText || node?.title || "Blog image"

              return (
              <div className="blog-card" key={node.slug}>
  <Link to={`/blogs/${node.slug}`} className="blog-img-wrap">
    <img src={blogImage} alt={blogAlt} />
  </Link>

  <div className="blog-content">
    <h3>
      <Link to={`/blogs/${node.slug}`}>
        {node.title}
      </Link>
    </h3>

    <div className="btn-wrap">
      <Link to={`/blogs/${node.slug}`} className="read-more-btn">
        Read More
      </Link>
    </div>
  </div>
</div>
              )
            })}
          </div>
        </div>
      </section>


    </Layout>
  )
}

export default BlogPage

export const query = graphql`
  query BlogPageQuery {
    allWpPost(sort: { date: DESC }) {
      edges {
        node {
          title
          content
          slug
          uri
          featuredImage {
            node {
              altText
              mediaItemUrl
            }
          }
        }
      }
    }
  }
`