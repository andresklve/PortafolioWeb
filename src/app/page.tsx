import { About } from "@/components/about";
import { Background } from "@/components/background";
import { BootScreen } from "@/components/boot-screen";
import { CommandPalette } from "@/components/command-palette";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects";
import { Stack } from "@/components/stack";

export default function Home() {
  return (
    <>
      <Background />
      <CommandPalette />
      <main className="relative z-10">
        <BootScreen>
          <Nav />
          <Hero />
        </BootScreen>
        <About />
        <Stack />
        <Projects />
        <Journey />
        <Contact />
      </main>
    </>
  );
}
