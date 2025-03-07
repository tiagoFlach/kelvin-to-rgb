"use client";

import Link from "next/link";
import { Button } from "../../components/ui/button";
import { SiGithub } from "react-icons/si";
import { Sun } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const Navbar = () => {
  return (
    <header className="bg-background inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
      <div className="flex h-12 w-full items-center">
        <div className="container mx-auto">
          <div className="flex justify-between w-full px-2 sm:px-4">
            <h1 className="font-medium my-auto">Kelvin to RGB</h1>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon">
                <Link href="https://github.com/tiagoFlach/kelvin-to-rgb">
                  <SiGithub />
                </Link>
                <span className="sr-only">Github repo</span>
              </Button>

              <ThemeToggle />

              <Button variant="ghost" size="icon">
                <Sun />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
