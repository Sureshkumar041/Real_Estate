import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Start from "./Components/SellerComponent/UpdatePropertyComponent/start";

function App() {
  const homePage = () => {
    const imgStyle = {
      height: 560,
      width: 650,
    };

    const fileId = "1S8C9aUU_pTJwjLgglfCdUYwsilRCf3aB";
    const driveImg = `https://drive.google.com/uc?export=view&id=${fileId}`;

    return (
      <React.Fragment>
        <div>
          <header>
            <div className="row header bg-info bg-opacity-75">
              <div className="col-2 my-4 my-2 text-dark">
                <p className="mx-3 fs-4 fw-bold font-monospace">Real Estate</p>
              </div>
              <div className="col-2 location my-2">
                <select className="form-select rounded-pill">
                  <option defaultValue>Choose the location</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Salem">Salem</option>
                  <option value="Coimbatore">Coimbatore</option>
                </select>
              </div>
              <div className="col-2 location my-2">
                <select className="form-select rounded-pill">
                  <option defaultValue>Property type</option>
                  <option value="Chennai">Buy</option>
                  <option value="Salem">Rent</option>
                </select>
              </div>
              <div className="col-2">
                <Link to={"/signup"}>
                  <button className="btn bg-white rounded-pill"> Seller</button>
                </Link>
              </div>
              <div className="col start">
                <div className="col d-flex flex-row-reverse py-3 px-4">
                  <Link
                    to={"/signup"}
                    className="d-flex flex-row-reverse text-decoration-none"
                  >
                    <button className="btn bg-white ">Login / Signup</button>
                  </Link>
                </div>
              </div>
            </div>
          </header>
          <img
            src={driveImg}
            className=""
            style={imgStyle}
            alt="Google Drive Img Not Avaliable"
            onError={(e) => {
              console.log("Err in img: ", e);
            }}
          />
          <img
            src="https://drive.google.com/uc?export=view&id=1QEXUeKOcs6db0AfLRxyk2BS4JRLmiFxh"
            alt="Google Drive Img"
            onError={(e) => {
              console.log("Err in Google: ", e);
            }}
          />
        </div>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {homePage()}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/start" element={<Start />} />
        </Routes>
      </BrowserRouter> */}
    </React.Fragment>
  );
}

export default App;
