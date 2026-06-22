import React, { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

const ClinicalFocusSlider = ({ pageData }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.AOS) {
        window.AOS.refresh()
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [isClient])

  const data = useStaticQuery(graphql`
    query ExpertiseQuery {
      allWpExpertise {
        edges {
          node {
            slug
            title
            uri
            featuredImage {
              node {
                altText
                title
                gatsbyImage(
                  width: 520
                  height: 420
                  quality: 75
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
  `)

  const slides = data?.allWpExpertise?.edges?.slice().reverse() || []

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
              speed={900}
              slidesPerGroup={4}
              spaceBetween={30}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                  spaceBetween: 18,
                },
                720: {
                  slidesPerView: 2,
                  slidesPerGroup: 1,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                  spaceBetween: 30,
                },
                1280: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                  spaceBetween: 50,
                },
              }}
              onInit={() => {
                setTimeout(() => {
                  if (typeof window !== "undefined" && window.AOS) {
                    window.AOS.refresh()
                  }
                }, 300)
              }}
            >
              {slides.map(({ node }, index) => {
                const image = getImage(node?.featuredImage?.node?.gatsbyImage)
                const imageAlt =
                  node?.featuredImage?.node?.altText ||
                  node?.featuredImage?.node?.title ||
                  node?.title ||
                  "Clinical focus image"

                return (
                  <SwiperSlide key={node.slug || index}>
                    <Link
                      to={`/expertise/#${node.slug}`}
                      className="clinical-card"
                      data-aos="fade-up"
                      data-aos-delay={(index % 4) * 100}
                    >
                      <div className="card-img">
                        {image && (
                          <GatsbyImage
                            image={image}
                            alt={imageAlt}
                            loading={index < 4 ? "eager" : "lazy"}
                            decoding="async"
                          />
                        )}
                      </div>

                      <h4 dangerouslySetInnerHTML={{ __html: node.title }} />
                    </Link>
                  </SwiperSlide>
                )
              })}
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