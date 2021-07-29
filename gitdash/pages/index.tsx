import Head from "next/head";

import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Features from "../components/features";
import Footer from "../components/footer";
import Team from "../components/team";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Git Dash</title>
      </Head>
      <body>
        <Navbar />
        <Hero />
        <Features />
        <Team />
        <Footer />
      </body>
    </>
  );
}
