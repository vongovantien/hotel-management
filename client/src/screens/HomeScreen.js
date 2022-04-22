import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import CallToActionSection from '../components/home/CallToActionSection'
import ContactInfo from '../components/home/ContactInfo'
import ShopSection from '../components/home/ShopSection'

const HomeScreen = () => {
  return (
    <div>
        <Header/>
        <ShopSection/>
        <CallToActionSection/>
        <ContactInfo/>
        <Footer/>
    </div>
  )
}

export default HomeScreen