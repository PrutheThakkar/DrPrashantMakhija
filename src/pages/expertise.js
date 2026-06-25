import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import InsidePage from "../components/Insidepage"

const ExpertisePage = ({ data }) => {
  const expertiseList =
    data?.allWpExpertise?.edges?.slice().reverse() || []

  return (
    <Layout>
      <InsidePage pageId={222} />

      <section className="expertise-list-section">
        <div className="container">
          {expertiseList.map(({ node }, index) => {
            const imageData = getImage(
              node?.featuredImage?.node?.gatsbyImage
            )

            const fallbackImage =
              node?.featuredImage?.node?.mediaItemUrl

            return (
              <div
                key={node.slug || index}
                id={node.slug}
                className={`expertise-row ${
                  index % 2 !== 0 ? "reverse" : ""
                }`}
              >
                <div className="left" data-aos="fade-right">
                  <div className="expertise-image">

                    {/* ✅ Optimized Gatsby Image */}
                    {imageData ? (
                      <GatsbyImage
                        image={imageData}
                        alt={
                          node.featuredImage?.node?.altText ||
                          node.title ||
                          "Expertise image"
                        }
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      /* fallback only if needed */
                      fallbackImage && (
                        <img
                          src={fallbackImage}
                          alt={node.title || "Expertise image"}
                          loading="lazy"
                          decoding="async"
                        />
                      )
                    )}

                  </div>
                </div>

                <div className="right" data-aos="fade-left">
                  <div className="expertise-content">
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: node.title,
                      }}
                    />

                    {node.content && (
                      <div
                        className="expertise-text"
                        dangerouslySetInnerHTML={{
                          __html: node.content,
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </Layout>
  )
}

export default ExpertisePage

export const query = graphql`
   query ExpertisePageQuery {
      allWpExpertise {
        edges {
          node {
            slug
            title
            uri
            content
            featuredImage {
              node {
                altText
                mediaItemUrl
                title
                slug
              }
            }
          }
        }
      }
    }
`