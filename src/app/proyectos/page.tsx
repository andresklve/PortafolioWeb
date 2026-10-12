import type { Metadata } from "next";
import { Projects } from "@/components/projects";

export const metadata: Metadata = { title: "Proyectos" };

export default function ProjectsPage() {
  return <Projects />;
}
