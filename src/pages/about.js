import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import InsidePage from "../components/Insidepage"

const ExpertisePage = ({ data }) => {
  const pageData = data?.allWpPage?.nodes?.[0]?.aboutPage
  const topImage = getImage(pageData?.aboutTopSectionImage?.node?.gatsbyImage)
  const topImageAlt =
    pageData?.aboutTopSectionImage?.node?.altText || "Top section image"

  return (
    <Layout>
      <InsidePage pageId={262} />

      <section className="inner-top-section center-text" >
        <div className="container">
          {pageData?.aboutTopSectionTitle && (
            <h2 data-aos="fade-up" data-aos-delay="100">
              {pageData?.aboutTopSectionSubtitle && (
                <span className="subtitle">
                  {pageData.aboutTopSectionSubtitle}
                </span>
              )}
              {pageData.aboutTopSectionTitle}
            </h2>
          )}

          {topImage && (
            <div className="top-section-image" data-aos="fade-up" data-aos-delay="250">
              <GatsbyImage
                image={topImage}
                alt={topImageAlt}
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          {pageData?.aboutTopSectionPara && (
            <p data-aos="fade-up" data-aos-delay="300"
              dangerouslySetInnerHTML={{ __html: pageData.aboutTopSectionPara }}
            />
          )}
        </div>
      </section>

      <section className="patient-care-section">
        <div className="container">
          {(pageData?.approachSubtitle || pageData?.approachTitle) && (
            <div className="section-heading center-text" data-aos="fade-up">
              {pageData?.approachSubtitle && (
                <span className="subtitle">{pageData.approachSubtitle}</span>
              )}
              {pageData?.approachTitle && <h2>{pageData.approachTitle}</h2>}
            </div>
          )}

          {pageData?.approachList?.map((item, index) => {
            const approachImage = getImage(item?.approachImage?.node?.gatsbyImage)
            const approachAlt =
              item?.approachImage?.node?.altText || `Approach image ${index + 1}`

            return (
              <div

                key={index}
                className={`patient-care-row ${index % 2 !== 0 ? "reverse" : ""}`}
              >
                {approachImage && (
                  <div className="patient-care-image" data-aos="fade-right">
                    <GatsbyImage
                      image={approachImage}
                      alt={approachAlt}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}

                {item?.approachSideParagraph && (
                  <div className="patient-care-content" data-aos="fade-left">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: item.approachSideParagraph,
                      }}
                    />
                  </div>
                )}
              </div>
            )
          })}

          {/* {pageData?.bottomParagraph && (
            <div className="patient-care-bottom-text">
              <p
                dangerouslySetInnerHTML={{
                  __html: pageData.bottomParagraph,
                }}
              />
            </div>
          )} */}
        </div>
      </section>
    </Layout>
  )
}

export default ExpertisePage

export const query = graphql`
  query MyQuery {
    allWpPage(filter: { databaseId: { eq: 262 } }) {
      nodes {
        title
        aboutPage {
          aboutTopSectionTitle
          aboutTopSectionSubtitle
          aboutTopSectionPara
          aboutTopSectionImage {
            node {
              altText
              gatsbyImage(
                width: 1000
                quality: 90
                placeholder: BLURRED
                layout: CONSTRAINED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
          approachTitle
          approachSubtitle
          bottomParagraph
          approachList {
            approachSideParagraph
            approachImage {
              node {
                altText
                gatsbyImage(
                  width: 800
                  quality: 90
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
  }
`