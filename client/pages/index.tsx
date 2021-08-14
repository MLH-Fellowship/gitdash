import Head from "next/head";
import Hero from "../components/hero";
import Features from "../components/features";
import Footer from "../components/footer";
import Team from "../components/team";
import Sidebar from "../components/sidebar";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Git Dash</title>
      </Head>
      <Sidebar pageTitle="Home" githubData={undefined}>
        <Hero />
        <Features />
        <Team />
        <Footer />
      </Sidebar>
    </>
  );
}
