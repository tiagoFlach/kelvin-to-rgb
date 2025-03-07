"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  // const { setTheme } = useTheme();

  return (
    <Button variant="ghost" size="icon">
      <Sun
        // onClick={setTheme("light")}
        aria-label="Toggle light theme"
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        // onClick={setTheme("dark")}
        aria-label="Toggle dark theme"
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
