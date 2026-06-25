import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import InsidePage from "../components/Insidepage"

const placeholderImage =
  "https://app.drprashantmakhija.com/wp-content/uploads/2026/03/Hero-Image.jpg"

const BlogPage = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null)

  const blogList = data?.allWpPost?.edges || []
  const faqList = data?.allWpFaq?.edges || []

  const toggleFaq = index => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <Layout>
      <InsidePage pageId={288} />

      <section className="blog-list-section">
        <div className="container">
          <div className="blog-grid">
            {blogList.map(({ node }) => {
              const blogImage = getImage(
                node?.featuredImage?.node?.gatsbyImage
              )

              const blogFallbackImage =
                node?.featuredImage?.node?.mediaItemUrl || placeholderImage

              const blogAlt =
                node?.featuredImage?.node?.altText ||
                node?.title ||
                "Blog image"

              return (
                <div className="blog-card" data-aos="fade-up" key={node.slug}>
                  <Link to={`/blogs/${node.slug}`} className="blog-img-wrap">
                    {blogImage ? (
                      <GatsbyImage
                        image={blogImage}
                        alt={blogAlt}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <img
                        src={blogFallbackImage}
                        alt={blogAlt}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </Link>

                  <div className="blog-content">
                    <h3>
                      <Link to={`/blogs/${node.slug}`}>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: node.title,
                          }}
                        />
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

      <section className="faq-section blog-faq-section">
        <div className="container">
          <div className="section-title">
            <h2 data-aos="fade-up">Frequently Asked Questions</h2>
          </div>

          <div className="faq-wrapper" data-aos="fade-up">
            {faqList.length > 0 ? (
              faqList.map(({ node }, index) => {
                const isActive = activeIndex === index

                return (
                  <div
                    className={`faq-item ${isActive ? "active" : ""}`}
                    key={index}
                    data-aos-delay={index * 150}
                  >
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => toggleFaq(index)}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: node?.title,
                        }}
                      />

                      <span className="faq-icon">
                        {isActive ? "−" : "+"}
                      </span>
                    </button>

                    <div className="faq-answer">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: node?.content,
                        }}
                      />
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="no-faq">No FAQs found.</p>
            )}
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
          slug
          uri
          featuredImage {
            node {
              altText
              mediaItemUrl
              gatsbyImage(
                width: 520
                height: 340
                quality: 72
                layout: CONSTRAINED
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }

    allWpFaq {
      edges {
        node {
          title
          content
        }
      }
    }
  }
`