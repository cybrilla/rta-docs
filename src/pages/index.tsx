import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import ClockCheckIcon from "@site/static/img/clock-check.svg";
import CoinIcon from "@site/static/img/coin.svg";
import DocumentIcon from "@site/static/img/document.svg";
import ShieldCheckIcon from "@site/static/img/shield-check.svg";
import SupportIcon from "@site/static/img/support.svg";
import TickIcon from "@site/static/img/tick.svg";
import "./styles.css";
import { Accordion } from "../components/accordion";
import HomeCustomFooter from "../components/HomeCustomFooter";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout noFooter>
      <div className="poa-wrapper custom-home-page">
        <div className="hero container">
          <div className="hero-content">
            <h1>Simplify mutual fund distribution with Cybrilla</h1>
            <p>
              We provide the backend infrastructure that enables AMCs and
              distributors to efficiently process and accept orders — helping
              reduce costs, speed up time to market, and elevate the investor
              experience.
            </p>
          </div>
        </div>

        <div className="section-gradient section" id="distributor-benefits">
          <div className="container">
            <h2>Value Proposition for Distributors</h2>
            <div className="card-container">
              <div className="card">
                <div className="card-header">
                  <div className="card-header__img-wrapper">
                    <CoinIcon />
                  </div>
                  <h3>Reduced Mutual Fund Distribution Costs</h3>
                </div>
                <ul>
                  <li>Zero payment gateway costs</li>
                  <li>Zero annual fee or maintenance fees for API access</li>
                  <li>Zero operations cost for order and payment operations</li>
                  <li>Zero-cost KYC for new investors</li>
                  <li>Zero hidden costs</li>
                </ul>
              </div>
              <div className="card">
                <div className="card-header">
                  <div className="card-header__img-wrapper">
                    <ClockCheckIcon />
                  </div>

                  <h3>Reduced Time to Market</h3>
                </div>

                <ul>
                  <li>
                    No need to sign up multiple digital distribution agreements
                  </li>
                  <li>Easy API integration with exhaustive documentation</li>
                  <li>Integration support from our Customer Success team</li>
                </ul>
              </div>
              <div className="card">
                <div className="card-header">
                  <div className="card-header__img-wrapper">
                    <DocumentIcon />
                  </div>

                  <h3>Improved Investor Experience</h3>
                </div>

                <ul>
                  <li>100% paperless KYC for new investors</li>
                  <li>Well-defined error codes for effective communication</li>
                </ul>
              </div>
              <div className="card">
                <div className="card-header">
                  <div className="card-header__img-wrapper">
                    <ShieldCheckIcon />
                  </div>

                  <h3>Reduced Business Risks</h3>
                </div>

                <ul>
                  <li>
                    Transactions via open protocols to eliminate platform
                    lock-in
                  </li>
                  <li>Regulatory compliance handled at the platform level</li>
                  <li>
                    Adherence to cybersecurity frameworks, reducing security
                    risks
                  </li>
                  <li>Load-tested infrastructure with 99.9% uptime</li>
                  <li>Backup and disaster recovery mechanisms</li>
                </ul>
              </div>
              <div className="card">
                <div className="card-header">
                  <div className="card-header__img-wrapper">
                    <SupportIcon />
                  </div>

                  <h3>Reduced Product Operations</h3>
                </div>

                <ul>
                  <li>In-house operations for orders and payments</li>
                  <li>Dedicated customer support</li>
                  <li>Regulatory compliance updates handled by us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="section faq">
          <div className="container">
            <div className="row-faq">
              <div className="faq-header">
                <h3>Distributor FAQs</h3>
              </div>
              <div className="accordion-wrapper">
                <Accordion
                  title="What kind of intermediaries are supported?"
                  content="  Currently, we support distributors. In the next phase, we
                      will support RIAs and EOPs."
                />
                <Accordion
                  title="What happens to my brokerage?"
                  content="No changes to your brokerage. Orders are forwarded to AMCs/RTAs, and brokerage is as per your agreement."
                />

                <Accordion
                  title="What is the cost of using this service?"
                  content="This service is completely free for intermediaries."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="section section-gradient">
          <div className="container">
            <h2>Value proposition for AMCs</h2>
            <div className="card-container card-container-gap-sm">
              <div className="info-card">
                <h3>AUM Growth</h3>
                <ul>
                  <li>Access distributors across India via the ONDC network</li>
                  <li>
                    Connect with a growing network of Fintech Primitives
                    distributors
                  </li>
                </ul>
              </div>
              <div className="info-card">
                <h3>Reduced Average Cost per Transaction</h3>
                <ul>
                  <li>Competitive transaction processing fees</li>
                  <li>No top-up payment processing fees</li>
                </ul>
              </div>
              <div className="info-card">
                <h3>Improved Partner Servicing Experience</h3>
                <ul>
                  <li>Your partners benefit from reduced distribution costs</li>
                  <li>Faster time to market</li>
                  <li>Enhanced investor experience</li>
                  <li>Reduced business risks</li>
                  <li>Streamlined operations</li>
                </ul>
              </div>
              <div className="info-card">
                <h3>Own the Channel Experience</h3>
                <ul>
                  <li>
                    Dedicated service to help build your channels for
                    distributors and investors
                  </li>
                  <li>
                    Customized experiences available by contacting us:
                    <a
                      href="mailto:contact@cybrilla.com"
                      title="contact@cybrilla.com"
                      target="_blank"
                    >
                      contact@cybrilla.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="section faq">
          <div className="container">
            <div className="row-faq">
              <div className="faq-header">
                <h3>AMC FAQs</h3>
              </div>
              <div className="accordion-wrapper">
                <Accordion
                  title="How does it work?"
                  content="As an AMC, you appoint Cybrilla Technologies Pvt. Ltd. as one of your official point of acceptances. Distributors then empanel with AMCs as usual and signup with Cybrilla and start placing orders. AMCs are then charged basis the orders processed via our platform. For distributors, the platform is completely free."
                />

                <Accordion
                  title="On what capacity can Cybrilla Technologies Pvt. Ltd be appointed as an official point of acceptance?"
                  content="Cybrilla is a SEBI registered Category 1 RTA(Registration number : INR000004404). Category 1 RTAs can act as both registrars and transfer agents. Being a registrar, we can collect applications from investors in respect of an issue i.e we can accept orders from investors. For more details please refer to Securities and Exchange Board of India (Registrars to an Issue and Share Transfer Agents) Regulations,1993 [Last amended on August 18, 2023]."
                />

                <Accordion
                  title="What kind of AMC partners do you serve?"
                  content="In the first phase, we will be serving distributors i.e we will only support regular schemes. In next phases, we will support RIAs and EOPs too."
                />

                <Accordion
                  title="How are transaction cut-off times handled?"
                  content="As a matter of practice, we submit the orders to AMCs as soon as we receive them. Since we are the official point of acceptance of the AMC, we will timestamp the orders and RTAs are expected to accept the orders with the timestamps we have provided."
                />

                <Accordion
                  title="How do I get started?"
                  content="For more info, please write to contact@cybrilla.com."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="section-gradient section" id="Current-capabilities">
          <div className="container">
            <h2>Current capabilities</h2>
            <p>
              Please note that we are rapidly expanding our capabilities. If the
              below capabilities are not enough for your use cases feel free to
              check our sister product
              <a
                title="Fintechprimitives"
                target="_blank"
                href="https://fintechprimitives.com/"
                style={{ marginLeft: "4px" }}
              >
                Fintechprimitives
              </a>
            </p>
            <div className="card-container">
              <div className="card card-with-bg">
                <div className="card-header">
                  <h3>KYC Status check</h3>
                </div>
                <ul>
                  <li>
                    No separate API for KYC status checks. KYC status checks
                    triggered automatically in order flows.
                  </li>
                </ul>
              </div>
              <div className="card card-with-bg">
                <div className="card-header">
                  <h3>KYC application</h3>
                </div>
                <ul>
                  <li>
                    New KYC application for Resident individuals supported. No
                    KYC modifications yet.
                  </li>
                </ul>
              </div>
              <div className="card card-with-bg">
                <div className="card-header">
                  <h3>Type of investors supported</h3>
                </div>
                <ul>
                  <li>Resident Individuals with single holding pattern</li>
                </ul>
              </div>
            </div>
            <div className="table-wrapper">
              <div className="poa-table-container">
                <h3>Order Types</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Order Type</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Lumpsum Purchase</td>
                      <td>
                        <div className="image-desc-wrapper">
                          <TickIcon />
                          Yes. Both fresh and additional purchase
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Redemptions</td>
                      <td>
                        <div className="image-desc-wrapper">
                          <TickIcon />
                          Yes
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Switch</td>
                      <td>Coming Soon</td>
                    </tr>
                    <tr>
                      <td>SIP</td>
                      <td>
                        <div className="image-desc-wrapper">
                          <TickIcon />
                          Yes. Monthly SIPs with cancellation.
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>SWP</td>
                      <td>Coming Soon</td>
                    </tr>
                    <tr>
                      <td>STP</td>
                      <td>Coming Soon</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="poa-table-container">
                <h3>Payment Methods</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Payment Method</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Netbanking</td>
                      <td>
                        <div className="image-desc-wrapper">
                          <TickIcon />
                          Supported
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>UPI</td>
                      <td>
                        <div className="image-desc-wrapper">
                          <TickIcon />
                          Supported
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>E-Nach Mandates</td>
                      <td>
                        <div className="image-desc-wrapper">
                          <TickIcon />
                          Supported
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>UPI Autopay</td>
                      <td>
                        <div className="image-desc-wrapper">
                          <TickIcon />
                          Supported
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeCustomFooter />
    </Layout>
  );
}
