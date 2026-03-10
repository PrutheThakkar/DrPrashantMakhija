import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import { useStaticQuery, graphql, Link } from "gatsby"

import "swiper/css"
import "swiper/css/pagination"

const ClinicalFocusSlider = ({ pageData }) => {
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
    <section id="Areas-of-Clinical-focus" className="Areas-of-Clinical-Focus">
      <div className="container">
        <h2>
          <span>{pageData?.clinicalFocusSubtitle}</span>
          {pageData?.clinicalFocusTitle}
        </h2>

        <p
          className="top-text"
          dangerouslySetInnerHTML={{ __html: pageData?.clinicalFocusPara }}
        />

        <Swiper
          className="clinical-swiper"
          modules={[Pagination]}
          pagination={{ clickable: true }}
          grabCursor={true}
          slidesPerView={4}
          slidesPerGroup={4}
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
              slidesPerGroup: 1,
            },
            350: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            600: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            1280: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 50,
            },
          }}
        >
          {slides.map(({ node }, index) => (
            <SwiperSlide key={index}>
              <Link to={`/expertise#${node.slug}`} className="clinical-card">
                <div className="card-img">
                  {node.featuredImage?.node?.mediaItemUrl && (
                    <img
                      src={node.featuredImage.node.mediaItemUrl}
                      alt={node.featuredImage.node.altText || node.title}
                    />
                  )}
                </div>

                <h4>{node.title}</h4>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default ClinicalFocusSlider