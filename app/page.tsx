"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Hero from "@/components/hero";
import Blobs from "@/components/animation/blobs";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  return (
    <div>
      <Blobs/>
      <main className="space-y-40 mb-40 relative">
        <Hero/>
       

      </main>
    </div>
  );
}
