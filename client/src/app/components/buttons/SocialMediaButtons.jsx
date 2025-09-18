"use client";
import React from 'react';
import styled from 'styled-components';

const socialList = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16" xmlSpace="preserve">
        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" fill="currentColor" />
      </svg>
    ),
    dataSocial: 'linkedin',
    aria: 'LinkedIn',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" viewBox="0 0 16 16"><path d="M16 3.039a6.461 6.461 0 0 1-1.885.516 3.301 3.301 0 0 0 1.443-1.817 6.533 6.533 0 0 1-2.084.797A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.431A3.289 3.289 0 0 0 2.23 6.13 3.323 3.323 0 0 1 .64 5.578v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115c-.21 0-.417-.021-.616-.061a3.283 3.283 0 0 0 3.066 2.281A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045 9.344 9.344 0 0 0 5.034 1.475c6.036 0 9.341-5.003 9.341-9.334 0-.143-.003-.284-.01-.425A6.67 6.67 0 0 0 16 3.039z"/></svg>
    ),
    dataSocial: 'twitter',
    aria: 'Twitter',
  },
  {
    name: 'Youtube',
    href: 'https://youtube.com/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16" xmlSpace="preserve">
        <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" fill="currentColor" />
      </svg>
    ),
    dataSocial: 'youtube',
    aria: 'Youtube',
  },
];

const SocialMediaButtons = () => (
  <StyledWrapper>
    <ul className="example-2">
      {socialList.map(({ name, href, icon, dataSocial, aria }) => (
        <li className="icon-content" key={name}>
          <a href={href} aria-label={aria} data-social={dataSocial} target="_blank" rel="noopener noreferrer">
            <div className="filled" />
            {icon}
          </a>
          <div className="tooltip">{name}</div>
        </li>
      ))}
    </ul>
  </StyledWrapper>
);

const StyledWrapper = styled.div`
  ul {
    list-style: none;
  }
  .example-2 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .example-2 .icon-content {
    margin: 0 10px;
    position: relative;
  }
  .example-2 .icon-content .tooltip {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    padding: 6px 10px;
    border-radius: 5px;
    opacity: 0;
    visibility: hidden;
    font-size: 14px;
    transition: all 0.3s ease;
    pointer-events: none;
    white-space: nowrap;
  }
  .example-2 .icon-content:hover .tooltip {
    opacity: 1;
    visibility: visible;
    top: -50px;
  }
  .example-2 .icon-content a {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: #4d4d4d;
    background-color: #fff;
    transition: all 0.3s ease-in-out;
  }
  .example-2 .icon-content a:hover {
    box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
  }
  .example-2 .icon-content a svg {
    position: relative;
    z-index: 1;
    width: 30px;
    height: 30px;
  }
  .example-2 .icon-content a:hover {
    color: white;
  }
  .example-2 .icon-content a .filled {
    position: absolute;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background-color: #000;
    transition: all 0.3s ease-in-out;
    z-index: 0;
  }
  .example-2 .icon-content a:hover .filled {
    height: 100%;
  }
  .example-2 .icon-content a[data-social="linkedin"] .filled,
  .example-2 .icon-content a[data-social="linkedin"] ~ .tooltip {
    background-color: #0274b3;
  }
  .example-2 .icon-content a[data-social="twitter"] .filled,
  .example-2 .icon-content a[data-social="twitter"] ~ .tooltip {
    background-color: #1DA1F2;
  }
  .example-2 .icon-content a[data-social="youtube"] .filled,
  .example-2 .icon-content a[data-social="youtube"] ~ .tooltip {
    background-color: #ff0000;
  }
`;

export default SocialMediaButtons;
