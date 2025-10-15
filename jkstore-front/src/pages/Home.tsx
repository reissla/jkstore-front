import Hero from "@/components/Hero"
import ProductGrid from "@/components/ProductGrid"
import About from "@/components/About"
import Footer from "@/components/Footer";
import Header from "@/components/Header"

function Home() {

  return (
    <div>
      <Header />
      <Hero />
      <ProductGrid />
      <About />
      <Footer />

    </div>
  )
}

export default Home