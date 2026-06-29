import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import InsidePage from "../components/Insidepage"

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/autoplay"
import { Autoplay } from "swiper/modules"

const AboutPage = ({ data }) => {
  const pageData = data?.allWpPage?.nodes?.[0]?.aboutPage

  const topImage = getImage(
    pageData?.aboutTopSectionImage?.node?.gatsbyImage
  )

  const topImageAlt =
    pageData?.aboutTopSectionImage?.node?.altText ||
    "Top section image"

  const swiperList = pageData?.aboutSwiper || []

  return (
    <Layout>
      <InsidePage pageId={262} />

      {/* HERO SECTION */}
      <section className="inner-top-section center-text">
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

          <div className="about-wrapper">
            {topImage && (
              <div
                className="top-section-image"
                data-aos="fade-up"
                data-aos-delay="250"
              >
                <GatsbyImage
                  image={topImage}
                  alt={topImageAlt}
                  loading="lazy"
                  decoding="async"
                  className="border-img"
                />
              </div>
            )}

            {pageData?.aboutTopSectionPara && (
              <p
                className="about-para"
                data-aos="fade-up"
                data-aos-delay="300"
                dangerouslySetInnerHTML={{
                  __html: pageData.aboutTopSectionPara,
                }}
              />
            )}
          </div>
        </div>
      </section>

{/* ✅ SWIPER LOGO SLIDER SECTION */}
{swiperList.length > 0 && (
  <section className="logo-slider-section">
    <div className="container">
     <Swiper
  modules={[Autoplay]}
  slidesPerView="auto"
  loop={true}
  speed={4000}
  freeMode={true} // enable smooth scroll for mobile
  freeModeMomentum={false}
  autoplay={{
    delay: 0, // continuous movement
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  }}
  breakpoints={{
    0: {
      slidesPerView: "auto",
      freeMode: true, // mobile continuous scroll
    },
    768: {
      slidesPerView: "auto",
      freeMode: false, // desktop normal slider
    },
  }}
>
        {swiperList.concat(swiperList).map((item, index) => {
          // duplicate the array for seamless loop
          const logo = item?.logo?.node?.mediaItemUrl
          const alt = item?.logo?.node?.altText || "Partner logo"

          return (
            <SwiperSlide key={index}>
              <div className="logo-item">
                {logo && (
                  <img src={logo} alt={alt} loading="lazy" decoding="async" />
                )}
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  </section>
)}

      {/* APPROACH SECTION */}
      <section className="patient-care-section">
        <div className="container">


           {pageData?.aboutTopSectionTitle && (
            <h2 data-aos="fade-up" data-aos-delay="100">
              {pageData?.aboutTopSectionSubtitle && (
                <span className="subtitle">
                  {pageData.approachSubtitle}
                </span>
              )}
              {pageData.approachTitle}
            </h2>
          )}

          {pageData?.approachList?.map((item, index) => {
            const approachImage = getImage(
              item?.approachImage?.node?.gatsbyImage
            )

            const approachAlt =
              item?.approachImage?.node?.altText ||
              `Approach image ${index + 1}`

            return (
              <div
                key={index}
                className={`patient-care-row ${index % 2 !== 0 ? "reverse" : ""
                  }`}
              >
                {approachImage && (
                  <div
                    className="patient-care-image"
                    data-aos="fade-right"
                  >
                    <GatsbyImage
                      image={approachImage}
                      alt={approachAlt}
                      loading="lazy"
                      decoding="async"
                       className="border-img"
                    />
                  </div>
                )}

                {item?.approachSideParagraph && (
                  <div
                    className="patient-care-content"
                    data-aos="fade-left"
                  >
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
        </div>
      </section>


    </Layout>
  )
}

export default AboutPage

export const query = graphql`
  query MyQuery {
    allWpPage(filter: { databaseId: { eq: 262 } }) {
      nodes {
        aboutPage {
          aboutTopSectionTitle
          aboutTopSectionSubtitle
          aboutTopSectionPara

          aboutTopSectionImage {
            node {
              altText
              gatsbyImage(
                width: 609
                height: 342
                quality: 100
                placeholder: BLURRED
                layout: CONSTRAINED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }

          approachTitle
          approachSubtitle

          approachList {
            approachSideParagraph
            approachImage {
              node {
                altText
                gatsbyImage(
                  width: 660
                  height: 517
                  quality: 100
                  layout: CONSTRAINED
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }

          aboutSwiper {
          text
            logo {
              node {
                altText
                mediaItemUrl
              }
            }
          }
        }
      }
    }
  }
`