import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"

const InsidePage = ({ pageId }) => {

  const [bgImage, setBgImage] = useState(
    "https://app.drprashantmakhija.com/wp-content/uploads/2026/03/indise-banner-desk.jpg"
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    const updateBackground = () => {
      if (window.innerWidth <= 768) {
        setBgImage("https://app.drprashantmakhija.com/wp-content/uploads/2026/03/indise-banner-mob.jpg")
      } else {
        setBgImage("https://app.drprashantmakhija.com/wp-content/uploads/2026/03/indise-banner-desk.jpg")
      }
    }

    updateBackground()
    window.addEventListener("resize", updateBackground)

    return () => window.removeEventListener("resize", updateBackground)
  }, [])

  const data = useStaticQuery(graphql`
    query InsidePageQuery {
      allWpPage {
        edges {
          node {
            databaseId
            insidePage {
              pageTitle
              topSectionPara
              topSectionSubtitle
              topSectionTitle
            }
          }
        }
      }
    }
  `)

  const page = data.allWpPage.edges.find(
    ({ node }) => node.databaseId === pageId
  )?.node?.insidePage

  if (!page) return null

  return (
    <>
      {/* Banner Section */}
      <section
        className="inner-hero-sec"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="page-title">
            <h1>{page?.pageTitle}</h1>
          </div>
        </div>
      </section>

      {/* Top Content Section */}
      <section className="inner-top-section center-text">
        <div className="container">

          {page?.topSectionTitle && (
            <h2><span className="subtitle">{page.topSectionSubtitle}</span>{page.topSectionTitle}</h2>
          )}

          {page?.topSectionPara && (
            <p dangerouslySetInnerHTML={{ __html: page.topSectionPara }} />
          )}
        </div>
      </section>
    </>
  )
}

export default InsidePage