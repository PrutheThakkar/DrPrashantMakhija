import React, { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"
import { useStaticQuery, graphql, Link } from "gatsby"
import AOS from "aos"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

const ClinicalFocusSlider = ({ pageData }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      setTimeout(() => {
        AOS.refreshHard()
      }, 300)
    }
  }, [isClient])

  const data = useStaticQuery(graphql`
    query ExpertiseQuery {
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
  `)

  const slides = data.allWpExpertise.edges.slice().reverse()

  return (
    <section
      id="Areas-of-Clinical-focus"
      className="Areas-of-Clinical-Focus"
      data-aos="fade-up"
    >
      <div className="container">
        <h2 data-aos="fade-up">
          <span>{pageData?.clinicalFocusSubtitle}</span>
          {pageData?.clinicalFocusTitle}
        </h2>

        <p
          data-aos="fade-up"
          data-aos-delay="150"
          className="top-text"
          dangerouslySetInnerHTML={{ __html: pageData?.clinicalFocusPara }}
        />

        {isClient && (
          <div
            className="clinical-swiper-wrapper"
            data-aos="fade-up"
            data-aos-delay="250"
          >
            <Swiper
              className="clinical-swiper"
              modules={[Pagination, Navigation]}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: ".clinical-next",
                prevEl: ".clinical-prev",
              }}
              grabCursor={true}
              slidesPerView={4}
              speed={1500}
              slidesPerGroup={4}
              spaceBetween={30}
              breakpoints={{
                0: { slidesPerView: 1, slidesPerGroup: 1 },
                350: { slidesPerView: 1, slidesPerGroup: 1 },
                720: { slidesPerView: 3, slidesPerGroup: 2 },
                1024: { slidesPerView: 4, slidesPerGroup: 4 },
                1280: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 50 },
              }}
              onInit={() => {
                setTimeout(() => {
                  AOS.refreshHard()
                }, 300)
              }}
            >
              {slides.map(({ node }, index) => (
                <SwiperSlide key={index}>
                  <Link
                    to={`/expertise#${node.slug}`}
                    className="clinical-card"
                    data-aos="fade-up"
                    data-aos-delay={(index % 4) * 150}
                  >
                    <div className="card-img">
                      {node.featuredImage?.node?.mediaItemUrl && (
                        <img
                          src={node.featuredImage.node.mediaItemUrl}
                          alt={node.featuredImage.node.altText || node.title}
                          loading="lazy"
                        />
                      )}
                    </div>

                    <h4 dangerouslySetInnerHTML={{ __html: node.title }} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="clinical-prev" aria-label="Previous slide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button className="clinical-next" aria-label="Next slide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default ClinicalFocusSlider