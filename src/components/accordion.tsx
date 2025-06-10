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
        <span> {title}</span>

        <i>
          <svg
            className="icon-svg undefined"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="#08886a"
          >
            <g
              id="Group_7454"
              data-name="Group 7454"
              transform="translate(-371 -256.265)"
            >
              <rect
                id="Rectangle_5802"
                data-name="Rectangle 5802"
                width="16"
                height="16"
                transform="translate(371 256.265)"
                fill="none"
              ></rect>
              <g
                id="Group_6928"
                data-name="Group 6928"
                transform="translate(373.941 267.067) rotate(-90)"
              >
                <path
                  id="Vector_7"
                  data-name="Vector 7"
                  d="M10.147,1.393A.8.8,0,0,0,9.069.208ZM5.2,4.8,4.665,5.4a.8.8,0,0,0,1.078,0ZM1.339.208A.8.8,0,0,0,.262,1.393Zm7.73,0-4.4,4L5.743,5.4l4.4-4Zm-3.326,4-4.4-4L.262,1.393l4.4,4Z"
                  transform="translate(5.605 0) rotate(90)"
                ></path>
              </g>
            </g>
          </svg>
        </i>
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
