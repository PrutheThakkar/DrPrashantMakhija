import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import AppointmentForm from "../components/AppointmentForm"

const placeholderImage =
  "https://app.drprashantmakhija.com/wp-content/uploads/2026/03/Hero-Image.jpg"

const BlogDetailTemplate = ({ data }) => {
  const post = data?.wpPost

  const blogImage =
    post?.featuredImage?.node?.mediaItemUrl || placeholderImage

  const blogAlt =
    post?.featuredImage?.node?.altText || post?.title || "Blog image"

  return (
    <Layout>
      <section className="blog-detail-banner">
        <div className="container">
          <Link to="/blogs" className="back-to-blog">
            ← Back to Blogs
          </Link>

          <h1 dangerouslySetInnerHTML={{ __html: post?.title }} />

          {post?.date && <p className="blog-date">{post.date}</p>}
        </div>
      </section>

      <section className="blog-detail-section">
        <div className="container">
          <div className="blog-detail-img">
            <img src={blogImage} alt={blogAlt} />
          </div>

          <div
            className="blog-detail-content"
            dangerouslySetInnerHTML={{ __html: post?.content }}
          />
        </div>
      </section>

     
    </Layout>
  )
}

export default BlogDetailTemplate

export const query = graphql`
  query BlogDetailQuery($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      content
      date(formatString: "MMMM DD, YYYY")
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
    }
  }
`