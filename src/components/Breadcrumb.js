import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

const Breadcrumb = ({ currentTitle }) => {
  const [path, setPath] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPath(window.location.pathname)
    }
  }, [])

  if (!path || path === "/") return null

  const cleanTitle = title => {
    if (!title) return ""
    return title.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&")
  }

  const makeTitle = text => {
    return text
      .replace(/-/g, " ")
      .replace(/\b\w/g, char => char.toUpperCase())
  }

  const pathArray = path.split("/").filter(Boolean)

  return (
    <nav className="breadcrumb-wrap" aria-label="Breadcrumb">
      <Link to="/">Home</Link>

      {pathArray.map((item, index) => {
        const isLast = index === pathArray.length - 1
        const linkPath = "/" + pathArray.slice(0, index + 1).join("/")

        const label =
          isLast && currentTitle ? cleanTitle(currentTitle) : makeTitle(item)

        return (
          <React.Fragment key={linkPath}>
            <span className="breadcrumb-separator">/</span>

            {isLast ? (
              <span className="breadcrumb-current">{label}</span>
            ) : (
              <Link to={linkPath}>{label}</Link>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

export default Breadcrumb