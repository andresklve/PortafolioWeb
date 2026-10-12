import type { Metadata } from "next";
import { Journey } from "@/components/journey";

export const metadata: Metadata = { title: "Trayectoria" };

export default function JourneyPage() {
  return <Journey />;
}
