import { useRouter } from "next/router";
import React from "react";

function Home1About() {
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
                Our Story
                <img src="assets/images/icon/section-vec-r1.svg" alt="" />
              </span>
              <h2>come to know what we have done about pets.</h2>
            </div>
            <div className="story-content">
              <p>
                PetziPal was founded with a simple mission: to make pet care
                easier, more joyful, and accessible for everyone. Our journey
                began with a love for animals and a desire to connect pet owners
                with the best products, services, and advice.
              </p>
              <div className="story-title-reviews">
                <h3>
                  At PetziPal, we believe a caring community can{" "}
                  <span>transform</span> pet lives.
                </h3>
              </div>
              <p>
                From curated collections of pet essentials to expert tips and
                heartfelt stories, PetziPal is your trusted companion in every
                step of your pet parenting journey. Join us as we build a
                vibrant, supportive space for pets and their people.
              </p>
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-lg-end justify-content-center">
            <div className="story-img">
              <img
                className="img-fluid"
                src="assets/images/bg/pet-care.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home1About;
