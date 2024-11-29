import { useState } from "react";

type AccordionProps = {
  title: string;
  content: string;
};

export const Accordion = ({ title, content }: AccordionProps) => {
  const [open, setOpen] = useState(false);

  const toggleAccordion = () => {
    setOpen(!open);
  };

  return (
    <div className="accordion">
      <button className="accordion-button" onClick={toggleAccordion}>
        {title}
      </button>

      <div
        className="accordion-content"
        style={{
          display: open ? "block" : "none",
        }}
      >
        <p>{content}</p>
      </div>
    </div>
  );
};
