import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import InsidePage from "../components/Insidepage"

const ExpertisePage = ({ data }) => {
  const pageData = data?.allWpPage?.nodes?.[0]?.expertisePage
  const expertiseList = data?.allWpExpertise?.edges?.slice().reverse() || []

  return (
    <Layout>
    <InsidePage pageId={222} />

      <section className="expertise-list-section">
        <div className="container">
          {expertiseList.map(({ node }, index) => (
            <div
              key={node.slug || index}
              id={node.slug}
              className={`expertise-row ${index % 2 !== 0 ? "reverse" : ""}`}
            >
            <div className="left">
              <div className="expertise-image">
                {node.featuredImage?.node?.mediaItemUrl && (
                  <img
                    src={node.featuredImage.node.mediaItemUrl}
                    alt={node.featuredImage.node.altText || node.title}
                  />
                )}
              </div>
            </div>

            <div className="right">
              <div className="expertise-content">
                <h3>{node.title}</h3>

                {node.content && (
                  <div
                    className="expertise-text"
                    dangerouslySetInnerHTML={{ __html: node.content }}
                  />
                )}

                <Link to="/contact-us" className="expertise-btn btn-appt">
                  Know More
                </Link>
                
              </div>
            </div>
            </div>
          ))}
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