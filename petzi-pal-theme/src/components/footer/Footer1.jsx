import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function Footer1() {
  const currentRouter = useRouter().pathname;
  return (
    <footer>
      <div className="container">
        <div className="row pt-90 pb-90 justify-content-center">
          <div className="col-lg-3 col-sm-6 order-lg-1 order-2 d-flex justify-content-sm-start justify-content-start">
            <div className="footer-items contact ">
              <h3>Contacts</h3>
              <div className="hotline mb-30">
                <div className="hotline-icon">
                  <img src="assets/images/icon/phone-icon.svg" alt="" />
                </div>
                <div className="hotline-info">
                  <h6 className="">
                    <a href="tel:+94775437880">+94 77 5437 880</a>
                  </h6>
                </div>
              </div>
              <div className="email mb-30">
                <div className="email-icon">
                  <img src="assets/images/icon/envelope.svg" alt="" />
                </div>
                <div className="email-info">
                  <h6 className="">
                    <a href="mailto:hello@petzipal.com">hello@petzipal.com</a>
                  </h6>
                </div>
              </div>
              <div className="email">
                <div className="email-icon">
                  <img src="assets/images/icon/location.svg" alt="" />
                </div>
                <div className="email-info">
                  <h6 className="mb-10">
                    <a>Abbas Building, </a>
                  </h6>
                  <h6>
                    <a>Colombo Street, Kandy.</a>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-flex align-items-center order-lg-2 order-1 justify-content-sm-center justify-content-start">
            <div className="footer-items">
              <h2>
                Every pet deserves <span>caring hands and a loving home</span>
                <br />
                that’s what <span>PetziPal stands for.</span>
              </h2>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 d-flex justify-content-sm-end justify-content-start order-3">
            <div className="footer-items opening-time">
              <div className="usefull-links">
                <h3>Usefull Links</h3>
                <h6 className="mb-25">
                  <a>About</a>
                </h6>
                <h6 className="mb-25">
                  <a>Services</a>
                </h6>
                <h6 className="mb-25">
                  <a>Blog</a>
                </h6>
                <h6 className="">
                  <a>Contact</a>
                </h6>
              </div>
              <ul className="social-icons">
                <li>
                  <a href="https://www.facebook.com/">
                    <i className="bx bxl-facebook" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/">
                    <i className="bx bxl-twitter" />
                  </a>
                </li>
                <li>
                  <a href="https://www.pinterest.com/">
                    <i className="bx bxl-pinterest-alt" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/">
                    <i className="bx bxl-instagram" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row border-top">
          <div className="col-lg-6">
            <div className="copyright-area">
              <p>
                © 2023 PetziPal is Proudly Powered by{" "}
                <a href="https://www.egenslab.com/"> Klaynz.</a>
              </p>
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-lg-end justify-content-center">
            <ul className="footer-btm-menu">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms &amp; Conditions</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer1;
