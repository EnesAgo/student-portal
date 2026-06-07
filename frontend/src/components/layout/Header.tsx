"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/MUDT_logo.svg"
              alt="University Logo"
              width={40}
              height={40}
              className="w-40 h-10 rounded-lg"
            />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Student Portal</h1>
              <p className="text-sm text-gray-500">Mentoring Program</p>
            </div>
          </Link>
          {!isAuthPage && (
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex items-center space-x-6">
                <Link
                  href="/news-feed"
                  className={pathname === '/news-feed' ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}
                >
                  News Feed
                </Link>
                <Link
                  href="/resources"
                  className={pathname === '/resources' ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}
                >
                  Resources/Study Plan
                </Link>
                <Link
                  href="/"
                  className={pathname === '/' ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}
                >
                  Mentoring
                </Link>
                <Link
                  href="/clubs"
                  className={pathname === '/clubs' ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}
                >
                  Clubs Page
                </Link>
              </nav>
              {user && (
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                  <span className="text-sm text-gray-700">
                    {user.firstName} {user.lastName}
                  </span>
                  <button
                    onClick={logout}
                    className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
