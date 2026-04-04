"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { signOut } from "@/lib/auth-client";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function UserMenu() {
  const { user, isLoading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("userMenu");
  const tc = useTranslations("common");

  if (isLoading) {
    return (
      <div
        className="w-8 h-8 rounded-full bg-brown-light/20 animate-pulse"
      />
    );
  }

  if (!user) {
    return (
      <Link
        href="/auth/signin"
        className="inline-flex items-center px-4 py-2 bg-brown-dark text-white rounded-full text-xs font-semibold hover:bg-terracotta transition-all duration-300"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        {tc("signIn")}
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-cream-dark/60 transition-colors duration-200"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        <div className="w-7 h-7 rounded-full bg-green-sage/30 flex items-center justify-center text-green-deep text-xs font-bold">
          {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
        </div>
        <span className="text-sm text-brown-dark hidden sm:block max-w-[100px] truncate">
          {user.name || user.email.split("@")[0]}
        </span>
      </button>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div
            role="menu"
            className="absolute right-0 top-full mt-2 w-48 bg-warm-white border border-brown-light/15 rounded-xl shadow-lg z-50 py-2 animate-fade-in"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            <div className="px-4 py-2 border-b border-brown-light/10">
              <p className="text-xs text-brown/40 truncate">{user.email}</p>
            </div>
            <Link
              href="/profile"
              role="menuitem"
              className="block px-4 py-2.5 text-sm text-brown-dark hover:bg-cream-dark/40 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t("myProfile")}
            </Link>
            <Link
              href="/projects/new"
              role="menuitem"
              className="block px-4 py-2.5 text-sm text-brown-dark hover:bg-cream-dark/40 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t("submitProject")}
            </Link>
            <Link
              href="/ideas/new"
              role="menuitem"
              className="block px-4 py-2.5 text-sm text-brown-dark hover:bg-cream-dark/40 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {t("shareAnIdea")}
            </Link>
            <div className="border-t border-brown-light/10 mt-1 pt-1">
              <button
                role="menuitem"
                onClick={() => {
                  signOut();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-brown/50 hover:text-terracotta hover:bg-cream-dark/40 transition-colors"
              >
                {t("signOut")}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
