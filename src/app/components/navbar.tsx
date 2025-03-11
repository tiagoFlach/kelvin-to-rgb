"use client";

import Link from "next/link";
import { Button } from "../../components/ui/button";
import { SiGithub } from "react-icons/si";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <header className="bg-background inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
      <div className="flex h-12 w-full items-center">
        <div className="container mx-auto">
          <div className="flex w-full justify-between px-4 sm:px-4">
            <h1 className="my-auto font-medium">Kelvin to RGB</h1>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon">
                <Link href="https://github.com/tiagoFlach/kelvin-to-rgb">
                  <SiGithub />
                </Link>
                <span className="sr-only">Github repo</span>
              </Button>

              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
