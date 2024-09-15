import React from "react";
import "./Features.css";
import { FaChevronRight } from "react-icons/fa";
import img from '../assets/2.png'
import mpone from '../assets/mpone.png'

export default function features({ heading, services, text, image }) {
    return (
        <div className="d-flex pt-5 mt-5">
            <div
                className="container px-4 pt-5 col-lg-6 col-md-6 col-sm-11 my-5"
                id="abc"
            >
                <h2 className="pb-2" id="head">
                    <img src={image} alt="Svg" id="svgImg" />
                    {heading}
                </h2>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
                    <div className="col d-flex align-items-start col-lg-6 col-md-6 col-sm-11">
                        <div>
                            <h3 className="fw-bold mb-0 fs-4">{services[0]}</h3>
                            <p className="text-dark">{text[0]}</p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start col-lg-6 col-md-6 col-sm-11">
                        <div>
                            <h3 className="fw-bold mb-0 fs-4">{services[1]}</h3>
                            <p className="text-dark">{text[1]}</p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start col-lg-6 col-md-6 col-sm-11">
                        <div>
                            <h3 className="fw-bold mb-0 fs-4">{services[2]}</h3>
                            <p className="text-dark">{text[2]}</p>
                        </div>
                    </div>
                    <div className="col d-flex align-items-start col-lg-6 col-md-6 col-sm-11">
                        <div>
                            <h3 className="fw-bold mb-0 fs-4">{services[3]}</h3>
                            <p className="text-dark">{text[3]}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container px-4 py-5 col-lg-5 col-md-5 col-sm-11 my-5 mpimg">
                <img src={image} alt="Image related to text." />
            </div>
        </div>
    );
}
