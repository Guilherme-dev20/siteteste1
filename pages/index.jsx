import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingButtons from '../components/FloatingButtons'
import Hero from '../sections/Hero'
import Campaign from '../sections/Campaign'
import FeaturedProducts from '../sections/FeaturedProducts'
import Themes from '../sections/Themes'
import HowItWorks from '../sections/HowItWorks'
import WhyUs from '../sections/WhyUs'
import Testimonials from '../sections/Testimonials'
import FinalCTA from '../sections/FinalCTA'

export default function Home() {
  return (
    <div className="nebula-bg min-h-screen">
      <Head>
        <title>Cometa Personalização - Sua Identidade no Universo</title>
      </Head>

      <Navbar />
      <main>
        <Hero />
        <Campaign />
        <FeaturedProducts />
        <Themes />
        <HowItWorks />
        <WhyUs />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  )
}
