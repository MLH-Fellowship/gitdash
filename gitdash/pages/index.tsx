import Head from "next/head";
import Hero from "../components/hero";
import Features from "../components/features";
import Footer from "../components/footer";
import Team from "../components/team";
import Navbar from "../components/navbar";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Git Dash</title>
      </Head>
      <Navbar />
      <Hero />
      <Features />
      <Team />
      <Footer />
    </>
  );
}
