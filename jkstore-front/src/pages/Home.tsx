import Hero from "@/components/hero/Hero"
import ProductGrid from "@/components/productGrid/ProductGrid"
import About from "@/components/about/About"
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header"
import { SearchProvider } from "@/contexts/SearchContext"

function Home() {

  return (
    <SearchProvider>
      <div>
        <Header />
        <Hero />
        <ProductGrid />
        <About />
        <Footer />
      </div>
    </SearchProvider>
  )
}

export default Home