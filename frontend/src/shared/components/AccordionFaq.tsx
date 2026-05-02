"use client";

import React from "react";
import Typography from "./Typography";
import IconDropdownDown from "@/shared/icons/icon-dropdown-down.svg";
import IconDropdownUp from "@/shared/icons/icon-dropdown-up.svg";
import styles from "./AccordionFaq.module.css";

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
      <div className={styles.header} onClick={toggleAccordion}>
        <Typography.Title5 className={styles.questionPrefix}>
          {question}
        </Typography.Title5>

        <div className={styles.iconWrap}>
          {isOpen ? (
            <IconDropdownUp className={styles.icon} />
          ) : (
            <IconDropdownDown className={styles.icon} />
          )}
        </div>
      </div>

      {isOpen && (
        <div className={styles.answer}>
          {answer.map((paragraph, index) => (
            <Typography.Paragraph2 key={index} className={styles.paragraph}>
              {paragraph}
            </Typography.Paragraph2>
          ))}
        </div>
      )}
    </div>
  );
};

type AccordionFaqProps = {
  items: FaqItem[];
};

const AccordionFaq: React.FC<AccordionFaqProps> = ({ items }) => {
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <div key={item.id} className={styles.item}>
          <AccordionItem question={item.question} answer={item.answer} />
        </div>
      ))}
    </div>
  );
};

export { AccordionFaq };
