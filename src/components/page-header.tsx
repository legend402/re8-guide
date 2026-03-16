"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumb?: {
    label: string
    href?: string
  }[]
}

export function PageHeader({ title, description, breadcrumb }: PageHeaderProps) {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const buildBreadcrumb = () => {
    if (isHomePage) {
      return [
        {
          label: "首页",
          href: "/",
        },
      ]
    }

    const segments = pathname.split("/").filter(Boolean)
    const breadcrumbItems = segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`
      return {
        label: decodeURIComponent(segment),
        href,
      }
    })

    return [
      {
        label: "首页",
        href: "/",
      },
      ...breadcrumbItems,
    ]
  }

  const items = buildBreadcrumb()

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol
            className="flex items-center gap-2 text-sm"
            role="list"
            aria-label="面包屑导航"
          >
            {items.map((item, index) => {
              const isLast = index === items.length - 1
              return (
                <li key={item.href} className="flex items-center gap-2">
                  {isLast ? (
                    <span
                      className="text-sm font-medium text-foreground"
                      aria-current="page"
                    >
                      {item.label}
                    </span>
                  ) : (
                    <>
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Home className="size-4" aria-hidden="true" />
                        </Link>
                      ) : (
                        <Home className="size-4 text-muted-foreground" aria-hidden="true" />
                      )}

                      <ChevronRight
                        className="size-4 text-muted-foreground"
                        aria-hidden="true"
                      />

                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </Link>
                    </>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>

        {/* Title and Description */}
        <div className="mt-4">
          <h1
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            id="page-title"
          >
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-lg text-muted-foreground" id="page-description">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
