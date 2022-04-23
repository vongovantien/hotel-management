import React from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header.js'
import CallToActionSection from '../components/Home/CallToActionSection'
import ContactInfo from '../components/Home/ContactInfo'
import ShopSection from '../components/Home/ShopSection'

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