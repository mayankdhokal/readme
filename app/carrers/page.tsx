import { Navbar } from '@/components/navbar'
import CareersHero from '@/components/carrers/hero/page'
import React from 'react'
import CareersGallery from '@/components/carrers/gallery/page'
import CareersJobs from '@/components/carrers/jobs/page'
import CareersCTA from '@/components/carrers/cta/page'
import Footer from '@/components/footer/page'

const page = () => {
  return (
    <div>
        <Navbar />
        <CareersHero />
        <CareersGallery />
        <CareersJobs />
        <CareersCTA />
        <div className="px-4 sm:px-6 md:px-8 lg:px-[65px] pb-[72px]">
            <Footer />
        </div>
    </div>
  )
}

export default page