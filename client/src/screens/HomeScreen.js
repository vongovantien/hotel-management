import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header.js";
import CallToActionSection from "../components/Home/CallToActionSection.js";
import ContactInfo from "../components/Home/ContactInfo.js";
import ShopSection from "../components/Home/ShopSection.js";

const HomeScreen = () => {
    return (
        <div>
            <ShopSection />
            <CallToActionSection />
            <ContactInfo />
        </div>
    );
};

export default HomeScreen;
