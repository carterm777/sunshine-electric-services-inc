import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import GoogleReviews from './components/GoogleReviews.jsx'
import TrustBadges from './components/TrustBadges.jsx'
import WhyUs from './components/WhyUs.jsx'
import Services from './components/Services.jsx'
import ServiceAreas from './components/ServiceAreas.jsx'
import Story from './components/Story.jsx'
import FinalCTA from './components/FinalCTA.jsx'
import FAQ from './components/FAQ.jsx'
import Footer from './components/Footer.jsx'
import StickyCallBar from './components/StickyCallBar.jsx'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      <main id="main">
        {/*
          .lede is the containing block for the photo-diagnosis widget's
          sticky rail. The widget travels from the top of the hero to the
          bottom of the reviews section and then releases — because the rail
          is bounded by this element, it can never reach the trust-badge
          banner underneath.
        */}
        <div className="lede-wrap">
          <Hero />
          <GoogleReviews />
        </div>

        <TrustBadges />
        <WhyUs />
        <Services />
        <ServiceAreas />
        <Story />
        <FinalCTA />
        <FAQ />
      </main>

      <Footer />
      <StickyCallBar />
    </>
  )
}
