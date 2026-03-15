import Head from 'next/head'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingButtons from '../components/FloatingButtons'
import Ticker from '../components/Ticker'
import Hero from '../sections/Hero'
import Campaign from '../sections/Campaign'
import FeaturedProducts from '../sections/FeaturedProducts'
import Themes from '../sections/Themes'
import HowItWorks from '../sections/HowItWorks'
import WhyUs from '../sections/WhyUs'
import Testimonials from '../sections/Testimonials'
import FinalCTA from '../sections/FinalCTA'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

export default function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="nebula-bg min-h-screen"
    >
      <Head>
        <title>Cometa Personalização - Sua Identidade no Universo</title>
      </Head>

      <Navbar />
      <main>
        <Hero />
        <Ticker />
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
    </motion.div>
  )
}
