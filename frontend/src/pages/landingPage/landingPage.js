import React from "react";
import { groupBackground } from "../../assets/images/images";

function LandingPage(){
    return(
        <div>
            <h1>Together,
                <br/>
                we can create greater civic change
            </h1>
            <p>CivicTechJobs unites ambitious technology practitioners with volunteer opportunities from a central hub of listings to build digital products, programs, and services. </p>
            <button></button>
            <img src={groupBackground}/>
        </div>
    )
}

export {LandingPage};