import { Metadata } from "next";
import InstagramClient from "./InstagramClient";

export const metadata: Metadata = {
  title: "Instagram | Equiviesa Worldwide",
  description: "Explore the possibilities and secure vault at Equiviesa Worldwide.",
};

export default function InstagramLandingPage() {
  return <InstagramClient />;
}
