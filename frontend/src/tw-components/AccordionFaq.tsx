import React from "react";
import Typography from "tw-components/Typography";
import { IconDropdownDown, IconDropdownUp } from "assets/images/images";

type FaqItem = {
  id: string;
  question: string;
  answer: string[];
};

const AccordionItem: React.FC<Omit<FaqItem, "id">> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className="flex cursor-pointer items-start justify-between"
        onClick={toggleAccordion}
      >
        <Typography.Title5 className="pr-4 text-charcoal">
          {question}
        </Typography.Title5>

        <div className="flex-shrink-0">
          {isOpen ? (
            <IconDropdownUp className="h-4 w-4" />
          ) : (
            <IconDropdownDown className="h-4 w-4" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="mr-4 mt-2">
          {answer.map((paragraph, index) => (
            <Typography.Paragraph2
              key={index}
              className="mt-6 pr-8 text-charcoal"
            >
              {paragraph}
            </Typography.Paragraph2>
          ))}
        </div>
      )}
    </div>
  );
};

// Main FAQ Component:
type AccordionFaqProps = {
  items: FaqItem[];
};

const AccordionFaq: React.FC<AccordionFaqProps> = ({ items }) => {
  return (
    <div className="mx-auto rounded-lg border border-solid border-blue-dark bg-white px-10 py-4 lg:w-[902px]">
      {items.map((item) => (
        <div
          key={item.id}
          className="border-b-[1.5px] border-grey py-6 last:border-b-0"
        >
          <AccordionItem question={item.question} answer={item.answer} />
        </div>
      ))}
    </div>
  );
};

export { AccordionFaq };
