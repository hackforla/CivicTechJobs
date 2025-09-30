import React from "react";
import {
  joinusStepOne,
  joinusStepTwo,
  joinusStepThree,
  joinusStepFour,
} from "assets/images/images";

const VolunteerSteps = () => {
  const steps = [
    {
      id: 1,
      title: "Browse our Communities of Practice (CoP)",
      description: (
        <>
          Browse and learn about our different CoPs on the bottom of our{" "}
          <a href="/" className="text-blue-600 underline">
            Home page
          </a>{" "}
          to find what communities interest you. In your CoP you have access to
          announcements, meeting zoom links, and helpful resources, as well as
          networking opportunities.
        </>
      ),
      image: joinusStepOne,
      imgPosition: "left",
    },
    {
      id: 2,
      title: "Attend an onboarding session",
      description: (
        <>
          Onboarding is a <b>mandatory</b> zoom session that all prospective
          volunteers must register and attend prior to committing to a role
          within a project. Please RSVP for one of these weekly sessions on our{" "}
          <a href="/" className="text-blue-600 underline">
            Meetup page
          </a>
          .
        </>
      ),
      image: joinusStepTwo,
      imgPosition: "right",
    },
    {
      id: 3,
      title: "Sign up for an account",
      description: (
        <>
          Create an account to save your preferred role(s) and availability.
          Once you complete onboarding, you can sign up and finalize the process
          in <b>three simple steps:</b>
          <p className=" ml-6 mt-2 mb-2">
            1. Select your <b>Practice Area</b><br/>
            2. Complete the <b>Skill Evaluation</b> survey *<br/>
            3. Choose your <b>Availability</b><br/>
          </p>
          With your account set up, you’ll be able to access full details for
          your desired roles.
        </>
      ),
      image: joinusStepThree,
      imgPosition: "left",
    },
    {
      id: 4,
      title: "Join a project",
      description: (
        <>
          Search for a project role you're interested in and submit your
          application via Slack. If your skills align with the requirements, one
          of our Product Managers will reach out to you.
        </>
      ),
      image: joinusStepFour,
      imgPosition: "right",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 h-[2400px] flex flex-col justify-between relative">
    <div className="absolute left-1/6 top-0 h-full w-2 bg-gray-300"></div>
    {steps.map((step, index) => (
        <div
        key={step.id}
        className={`flex flex-row ${
            step.imgPosition === "right" ? "md:flex-row-reverse" : ""
        } items-center gap-16 my-10`}
        >
        <div className="flex flex-col items-center w-1/3 relative my-10">
            <img
            src={step.image}
            alt={step.title}
            className="w-full max-w-sm h-80 rounded-lg shadow-md z-10"
            />
        </div>

        <div className="w-2/3 text-left pl-6">
            <h2 className="text-2xl font-bold mb-4">
            {step.id}. {step.title}
            </h2>
            <div className="text-gray-700 text-base md:text-lg leading-relaxed">
            {step.description}
            </div>
        </div>
        </div>
    ))}
    </div>


  );
};

export default VolunteerSteps;
