"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import UserMenu from "./UserMenu";

const navLinks = [
  { href: "/vision", key: "vision" },
  { href: "/layers/food-and-land", key: "layers" },
  { href: "/examples", key: "examples" },
  { href: "/collaborate", key: "collaborate" },
  { href: "/get-started", key: "getStarted" },
] as const;

export default function Header() {
  const t = useTranslations("header");
  const tc = useTranslations("common");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-deep flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FBF7EF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22c0-8-4-12-10-12 0 6 4 12 10 12z" />
                <path d="M12 22c0-8 4-12 10-12 0 6-4 12-10 12z" />
                <path d="M12 22V8" />
              </svg>
            </div>
            <span
              className="text-green-deep font-semibold text-lg tracking-tight group-hover:text-terracotta transition-colors duration-300"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {tc("brandName")}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-brown-dark/70 hover:text-green-deep text-[13px] font-medium tracking-wide uppercase transition-colors duration-300"
                style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
            <span className="w-px h-5 bg-brown-light/40 mx-2" />
            <a
              href="https://github.com/groundlayer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium tracking-wide uppercase text-brown-dark/70 hover:text-green-deep transition-colors duration-300"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              {tc("github")}
            </a>
            <span className="w-px h-5 bg-brown-light/40 mx-2" />
            <UserMenu />
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-brown-dark hover:text-green-deep transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t("toggleMenu")}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M6 18L18 6" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h12" />
                  <path d="M4 17h8" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav
          className="md:hidden bg-cream border-t border-brown-light/20 animate-fade-in"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          <div className="px-6 py-6 flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 text-brown-dark hover:text-green-deep hover:bg-green-light/30 rounded-lg transition-all text-sm font-medium animate-fade-up delay-${i + 1}`}
                onClick={() => setMenuOpen(false)}
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
            <div className="border-t border-brown-light/20 mt-2 pt-2">
              <a
                href="https://github.com/groundlayer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 text-brown hover:text-green-deep text-sm font-medium animate-fade-up delay-5"
                onClick={() => setMenuOpen(false)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                {tc("github")}
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
