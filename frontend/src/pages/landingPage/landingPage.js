import React from "react";
import { groupBackground } from "../../assets/images/images";
import { groupBkgPattern } from "../../assets/images/images";
import "./landingPage.scss";

function LandingPage(){
    const LandingImage = () => {
        return (
            <div style={{zIndex: "-1"}} className="image-parent">
                <div style={{margin: "0 12%"}}>
                     <img className="group-image " src={groupBackground} />
                </div>
            </div>
        )
    }

    return(
        <div className="text-center pt-5">
            <div style={{maxWidth: "705px", margin: "auto", paddingLeft: "50px", paddingRight: "50px"}}>
                <h1 style={{marginTop: "80px"}}>Together,
                    <br/>
                    we can create greater civic change
                </h1>
                <p className="mb-5">CivicTechJobs unites ambitious technology practitioners with volunteer opportunities from a central hub of listings to build digital products, programs, and services. </p>
                <button className="btn btn-lg btn-primary">Join us</button>
            </div>
            <LandingImage/>
            <div className="mission-content flex-container">
                <div style={{margin: "auto", maxWidth: "800px"}} className="align-center text-center">
                    <h1>Our Misson</h1>
                    <p>
                    We bring together civic-minded volunteers from diverse backgrounds such as YOU to help local communities and governments. Thanks to the power of our volunteers, we are able to positively impact the communities of Los Angeles region and beyond!
                    </p>
                </div>
            </div>
        </div>
    )
}

export {LandingPage};