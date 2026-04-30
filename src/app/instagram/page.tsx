import { Metadata } from "next";
import InstagramClient from "./InstagramClient";

export const metadata: Metadata = {
  title: "Instagram | Viesa Automations Worldwide",
  description: "Explore the possibilities and secure vault at Viesa Automations Worldwide.",
};

export default function InstagramLandingPage() {
  return <InstagramClient />;
}
