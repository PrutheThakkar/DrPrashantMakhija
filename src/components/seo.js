import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import defaultSocialImage from "../images/Hero-Image.jpg"

const absoluteUrl = (siteUrl, value = "/") => {
  if (/^https?:\/\//i.test(value)) return value
  return new URL(value.replace(/^\/+/, ""), `${siteUrl.replace(/\/$/, "")}/`).href
}

const Seo = ({ title, description, pathname = "/", canonical, keywords = [], image = defaultSocialImage, type = "website", noindex = false, schema, children }) => {
  const { site } = useStaticQuery(graphql`
    query SeoSiteMetadata {
      site { siteMetadata { title description author siteUrl } }
    }
  `)
  const metadata = site.siteMetadata
  const metaTitle = title || metadata.title
  const metaDescription = description || metadata.description
  const pageUrl = canonical || absoluteUrl(metadata.siteUrl, pathname)
  const imageUrl = absoluteUrl(metadata.siteUrl, image)

  return (
    <>
      <html lang="en" />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Dr. Prashant Makhija" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
      {children}
    </>
  )
}

export default Seo
