import React from "react";
import styles from "./HomeCustomFooter.module.css";

export default function HomeCustomFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerTop}>
          <div className={styles.footerSections}>
            <div className={styles.footerColumn}>
              <span className={styles.footerTitle}>Explore</span>
              <ul>
                <li>
                  <a
                    href="https://cybrilla.com/about"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://cybrilla.com/careers"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <span className={styles.footerTitle}>Legal</span>
              <ul>
                <li>
                  <a
                    href="https://cybrilla.com/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="https://cybrilla.com/payment-terms-and-refund-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Payment Terms and Refund Policy
                  </a>
                </li>
                <li>
                  <a
                    href="https://cybrilla.com/terms-of-use"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Use
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <span className={styles.footerTitle}>Connect</span>
              <ul>
                <li>
                  <a
                    href="https://cybrilla.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/cybrilla-technologies/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.footerCompanyDetails}>
            <p>
              <span>Company Name:</span> Cybrilla Technologies Private Limited
            </p>
            <p>
              <span>Registered Address:</span> 1660 and 1661, The Millers
              Autograph, 1st Floor, 27th Main, 2nd Sector, HSR Layout,
              Bengaluru, Karnataka, 560102
            </p>
            <p>
              <span>SEBI Registered RTA Number:</span> INR000004404 (Validity of
              the license: 27th March 2024 – Perpetual)
            </p>
            <p>
              <span>CIN:</span> U66190KA2010PTC054206
            </p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.logo}>
            <a
              href="https://cybrilla.com/about"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/img/cybrilla-logo.svg"
                alt="Cybrilla logo"
                width="146"
              />
            </a>
          </div>
          <div className={styles.copyright}>
            © 2021–2025 Cybrilla Technologies
          </div>
        </div>
      </div>
    </footer>
  );
}
