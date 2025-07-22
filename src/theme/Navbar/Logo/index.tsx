import React from "react";
import { useLocation } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function NavbarLogo(): JSX.Element {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const logoSrc = useBaseUrl("img/cybrilla-logo.svg"); // update if your logo path is different
  const logoAlt = "Cybrilla logo";

  return (
    <a
      className="navbar__brand"
      href={isHomePage ? "https://cybrilla.com/" : "/"}
      target={isHomePage ? "_blank" : "_self"}
      rel="noopener noreferrer"
    >
      <img className="navbar__logo" src={logoSrc} alt={logoAlt} />
    </a>
  );
}
