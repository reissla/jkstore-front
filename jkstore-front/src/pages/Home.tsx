import Hero from "@/components/hero/Hero"
import ProductGrid from "@/components/productGrid/ProductGrid"
import About from "@/components/about/About"
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header"

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