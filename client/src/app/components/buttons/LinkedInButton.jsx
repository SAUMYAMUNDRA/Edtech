"use client";
import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  .btn {
    display: grid;
    place-items: center;
    background: #e3edf7;
    padding: 0.6em;
    border-radius: 10px;
    box-shadow:
      6px 6px 10px -1px rgba(0, 0, 0, 0.15),
      -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(0, 0, 0, 0);
    cursor: pointer;
    transition: transform 0.5s, box-shadow 0.5s, border 0.5s;
  }

  .btn:hover {
    box-shadow:
      inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2),
      inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),
      -0.5px -0.5px 0px rgba(255, 255, 255, 1),
      0.5px 0.5px 0px rgba(0, 0, 0, 0.15),
      0px 12px 10px -10px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.1);
    transform: translateY(0.5em);
  }

  .btn svg {
    transition: transform 0.5s, fill 0.5s;
  }

  .btn:hover svg {
    transform: scale(0.9);
    fill: #333333;
  }
`;

export default function LinkedInButton({ href = "#", ariaLabel = "View LinkedIn", size = 24 }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (href && href !== "#") {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <StyledWrapper>
      <button className="btn" aria-label={ariaLabel} type="button" onClick={handleClick}>
        <svg
          width={size}
          height={size}
          fill="#0A66C2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003zM6.9 20.452H3.771V9H6.9v11.452zM5.337 7.433c-1.144 0-2.069-.927-2.069-2.07 0-1.144.925-2.069 2.069-2.069 1.144 0 2.07.925 2.07 2.069 0 1.143-.926 2.07-2.07 2.07zM20.447 20.452h-3.554V14.8c0-1.345-.027-3.078-1.879-3.078-1.88 0-2.168 1.464-2.168 2.976v5.754H9.293V9h3.414v1.561h.049c.476-.9 1.637-1.848 3.37-1.848 3.604 0 4.268 2.371 4.268 5.455v6.284z" />
        </svg>
      </button>
    </StyledWrapper>
  );
}
