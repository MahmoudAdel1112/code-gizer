// components/Navbar.tsx
"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Navbar() {
  const [isPhone, setIsPhone] = React.useState<Boolean>(false);

  return (
    <nav className="sticky top-0 bg-gray-900 shadow-md left-0 right-0 z-30 border-b px-2">
      <div className="sticky top-0 left-0 right-0 z-30 container mx-auto flex justify-between items-center py-4">
        {/* Logo / Brand */}
        <Link href="/" className="text-lg font-semibold">
          CodeRate
        </Link>

        {/* Desktop Navigation */}
        {
          <>
            <NavigationMenu className="sticky top-0 left-0 right-0 z-30 hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/about" className="px-4 py-2 hover:underline">
                    About
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" className="px-4 py-2 hover:underline">
                    Contact Us
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/pricing" className="px-4 py-2 hover:underline">
                    Pricing
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link className="hidden md:block" href="/signin">
              <Button>Signin with GitHub</Button>
            </Link>
          </>
        }
        {/*Mobile Navigation */}
        <Sheet>
          <SheetTrigger className="md:hidden ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
              />
            </svg>
          </SheetTrigger>
          <SheetContent className="w-screen">
            <SheetHeader>
              <SheetTitle>CodeRate</SheetTitle>
            </SheetHeader>
            <div>
              {/* Mobile Navigation */}
              <NavigationMenu className="">
                <NavigationMenuList className="flex flex-col items-start gap-3">
                  <NavigationMenuItem>
                    <Link href="/about" className="px-4 py-2 hover:underline">
                      About
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/contact" className="px-4 py-2 hover:underline">
                      Contact Us
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/pricing" className="px-4 py-2 hover:underline">
                      Pricing
                    </Link>
                  </NavigationMenuItem>
                  <Link href="/signin">
                    <Button>Signin with GitHub</Button>
                  </Link>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </SheetContent>
        </Sheet>

        {/* Authentication */}
      </div>
    </nav>
  );
}
