import React from "react";
import ContactInfo from "../components/Home/ContactInfo.js";
import ShopSection from "../components/Home/ShopSection.js";

const HomeScreen = () => {
    return (
        <div>
            <ShopSection />
            {/* <CallToActionSection /> */}
            <ContactInfo />
        </div>
    );
};

export default HomeScreen;
