import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
        <div className="bg-red-500 p-10 text-white text-4xl">
            PAGE.TSX TEST
        </div>
      <Features />
      <Footer />
    </>
  );
}