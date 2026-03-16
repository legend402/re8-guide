"use client"

import Link from "next/link"
import { ArrowUp, Copyright } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: "/characters", label: "角色" },
    { href: "/weapons", label: "武器" },
    { href: "/enemies", label: "敌人" },
    { href: "/guides", label: "攻略" },
  ]

  const additionalLinks = [
    { href: "/about", label: "关于" },
    { href: "/contact", label: "联系" },
    { href: "/privacy", label: "隐私政策" },
    { href: "/terms", label: "服务条款" },
  ]

  return (
    <footer
      className="border-t bg-muted/50"
      role="contentinfo"
      aria-label="页脚"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold hover:opacity-80 transition-opacity"
              aria-label="回到首页"
            >
              <span>RE8 Village Guide</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              最全面的《生化危机8：村庄》攻略与资料库
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">快速链接</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">更多信息</h3>
            <ul className="space-y-2">
              {additionalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">联系我们</h3>
            <p className="text-sm text-muted-foreground mb-4">
              有问题或建议？欢迎联系我们
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
              联系作者
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Copyright className="size-4" />
              <span>RE8 Village Guide. All rights reserved.</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="返回顶部"
                className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <ArrowUp className="size-4 mr-2" />
                返回顶部
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
