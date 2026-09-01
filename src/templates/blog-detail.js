import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import AppointmentForm from "../components/AppointmentForm"
import Seo from "../components/seo"
import { blogSeo, SITE_URL } from "../data/seo"

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

          {post?.dateDisplay && <p className="blog-date">{post.dateDisplay}</p>}
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

export const Head = ({ data }) => {
  const post = data?.wpPost
  const seo = blogSeo[post?.slug] || {}
  const pathname = `/blogs/${post?.slug || ""}/`
  const image = post?.featuredImage?.node?.mediaItemUrl
  const description =
    seo.description ||
    post?.excerpt?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() ||
    `Read ${post?.title || "this neurology article"} by Dr. Prashant Makhija.`

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: seo.title || post?.title,
    description,
    image: image ? [image] : undefined,
    datePublished: post?.date,
    dateModified: post?.modified,
    mainEntityOfPage: `${SITE_URL}${pathname}`,
    author: {
      "@type": "Person",
      name: "Dr. Prashant Makhija",
      url: `${SITE_URL}/about/`,
    },
  }

  return (
    <Seo
      {...seo}
      title={seo.title || post?.title}
      description={description}
      pathname={pathname}
      canonical={`${SITE_URL}${pathname}`}
      image={image}
      type="article"
      schema={articleSchema}
    />
  )
}

export const query = graphql`
  query BlogDetailQuery($id: String!) {
    wpPost(id: { eq: $id }) {
      title
      slug
      excerpt
      content
      date
      dateDisplay: date(formatString: "MMMM DD, YYYY")
      modified
      featuredImage {
        node {
          altText
          mediaItemUrl
        }
      }
    }
  }
`
