"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Menu, Moon, Sun, Home, X } from "lucide-react"
import { useTheme } from "next-themes"

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const navigationLinks = [
    { href: "/characters", label: "角色" },
    { href: "/weapons", label: "武器" },
    { href: "/enemies", label: "敌人" },
    { href: "/maps", label: "地图" },
    { href: "/items", label: "物品" },
    { href: "/walkthrough", label: "攻略" },
    { href: "/mercenaries", label: "佣兵" },
    { href: "/collectibles", label: "收集品" },
    { href: "/flow", label: "流程图" },
  ]

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold hover:opacity-80 transition-opacity"
            aria-label="回到首页"
          >
            <Home className="h-5 w-5" />
            <span className="hidden sm:inline">RE8 Village Guide</span>
            <span className="sm:hidden">RE8</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted hover:text-foreground"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              )
            })}

            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="ml-2 p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="切换主题"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>

            {/* Search Button */}
            <button 
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="搜索"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="切换主题"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="打开菜单"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-background border-l shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">导航菜单</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md hover:bg-muted transition-colors"
                aria-label="关闭菜单"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-1">
              {navigationLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-base font-medium transition-colors rounded-md ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted hover:text-foreground"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                )
              })}
              
              <div className="pt-4 mt-4 border-t">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium w-full rounded-md hover:bg-muted transition-colors"
                >
                  <Search className="h-5 w-5" />
                  搜索
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
