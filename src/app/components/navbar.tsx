"use client";

import Link from "next/link";
import { Button } from "../../components/ui/button";
import { SiGithub } from "react-icons/si";
import { ModeToggle } from "./mode-toggle";
// import { LanguageToggle } from "./language-toggle";

const Navbar = () => {
  return (
    <header className="bg-background inset-x-0 top-0 isolate z-10 mb-6 flex shrink-0 items-center gap-2 border-b">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center px-2 sm:px-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="my-auto font-medium">Kelvin to RGB</h1>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <Link href="https://github.com/tiagoFlach/kelvin-to-rgb">
                <SiGithub />
              </Link>
              <span className="sr-only">Github repo</span>
            </Button>

            {/* <LanguageToggle /> */}

            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
