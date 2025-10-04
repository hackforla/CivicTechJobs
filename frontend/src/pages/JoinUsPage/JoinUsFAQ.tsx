import React from "react";
import Typography from "tw-components/Typography";
import { AccordionFaq } from "tw-components/AccordionFaq";

const JoinUsFAQ = () => {
  const faqData = [
    {
      id: "1",
      question:
        "How many hours are you expected to commit to Hack for LA each week?",
      answer: [
        "Most volunteers commit between 5–10 hours per week, but the exact time depends on the project and your availability. We encourage consistent engagement so you can make meaningful contributions and stay connected with your team.",
      ],
    },
    {
      id: "2",
      question: "What is a Community of Practice (CoP)?",
      answer: [
        "A Community of Practice is a group of people who share a common professional focus and learn from each other. At Hack for LA, CoPs bring together volunteers in areas such as software development, data science, product management, and marketing. These communities offer skill-building opportunities, peer support, and networking.",
      ],
    },
    {
      id: "3",
      question: "Why is onboarding mandatory?",
      answer: [
        "Onboarding ensures that every volunteer understands our mission, tools, and processes before joining a project. It helps you navigate our platforms, connect with your Community of Practice, and set you up for success in your role.",
      ],
    },
    {
      id: "4",
      question:
        "Why is completing the Skills Evaluation survey a required step before joining a project?",
      answer: [
        "Our Skills Evaluation survey connects you with projects that match your experience and career goals. Projects outline the skills they need, and you self-select your competencies and experience levels. This ensures a strong fit that supports your growth while helping the project succeed.",
      ],
    },
  ];

  return (
    <div className="bg-grey-light p-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center rounded-lg bg-grey-light p-6">
        <Typography.Title2 className="mb-12 text-charcoal">
          Frequently Asked Questions
        </Typography.Title2>
        <AccordionFaq items={faqData} />
        <div className="mt-20" />
      </div>
    </div>
  );
};
export default JoinUsFAQ;
