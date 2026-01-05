import { useRouter } from "next/router";
import React from "react";

function AboutUs() {
  const currentpage = useRouter().pathname;
  return (
    <div
      className={
        currentpage === "/about"
          ? "h1-story-area two mb-120 pt-120"
          : "h1-story-area mb-120"
      }
    >
      <div className="container">
        <div className="row g-lg-4 gy-5">
          <div className="col-lg-6">
            <div className="section-title1">
              <span>
                <img src="assets/images/icon/section-vec-l1.svg" alt="" />
                PetziPal — Your Pet. Our Priority.
                <img src="assets/images/icon/section-vec-r1.svg" alt="" />
              </span>
              <h2>
                Your trusted partner in pet care – where love meets convenience.
              </h2>
            </div>
            <div className="story-content">
              <p className="mb-4">
                At PetziPal, we’re not just another pet services pla\orm — we’re
                a passionate community built by pet lovers, for pet lovers.
              </p>
              <p className="mb-4">
                We’re proud to be Sri Lanka’s first all-in-one pet care hub,
                starEng in Colombo 1–12, Dehiwala, and Mount Lavinia, bringing
                together trusted service providers and caring pet parents under
                one digital roof.
              </p>
              <p className="mb-4">
                Our mission is simple yet meaningful: to make pet care easy,
                safe, and rewarding. From grooming, vet visits, and training to
                boarding and si`ng, you can search, book, and review verified
                service providers — all in one place.
              </p>
              <p>
                Each provider has a profile with real reviews, helping you
                choose confidently and ensuring your furry friend receives the
                best possible care.
              </p>
              <div className="story-title-reviews">
                <h3>
                  Connecting Hearts, {" "}
                  <span>One Paw</span> at a Time.
                </h3>
              </div>
              <p className="mb-4">
                But PetziPal isn’t only about services — it’s about community
                and compassion. Every Eme you book, you earn reward points that
                can be redeemed for discounts or fun goodies from our upcoming
                PetziPal Shop. Service providers also earn points, building a
                fair, connected ecosystem for everyone.
              </p>
              <p className="mb-4">
                Beyond convenience, PetziPal is driven by kindness and purpose.
                A part of our revenue goes toward feeding and caring for street
                animals across Sri Lanka — because every paw deserves love.
              </p>
              <p>
                Join us on this paw-some journey as we create a happier,
                healthier world for pets and their people.
              </p>
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-lg-end justify-content-center">
            <div className="story-img">
              <img
                className="img-fluid"
                src="assets/images/About-Us-img.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
