import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h5 className="text-decoration-underline mb-4">About Us</h5>

            <p>
              Deepanshu Dixit Software Solutions Pvt. Ltd. is a tech company
              providing innovative software solutions tailored to diverse
              business needs.
            </p>
          </div>
          <div className="col-lg-6">
            <h5 className="text-decoration-underline mb-4">Contact Us</h5>
            <p>Email: ddixitsoftwares@gmail.com</p>
            <p>Phone: +911855400830</p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col text-center">
            <p>
              &copy;Deepanshu Dixit Software Solutions Pvt. Ltd. | All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
