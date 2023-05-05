import { Carousel, Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./page.css";
import "./promotion.css";
// import "../../public/images2/";


const ProductsPromotionComponent = () => {


  return (
    <>

      {/* <marquee scrollamount="10" > */}


      <ul id="rig" className="mb-3">
        <li className="ms-4">
          <a className="rig-cell" href="http://localhost:3000/product-list?categoryName=PPE">
            {/* <img className="rig-img" src="images2/sample_1.mp4" /> */}
            <video className="rig-img" controls autoPlay muted loop ><source src="images2/sample_1.mp4" type="video/mp4" />
            </video>
            {/* <span className="rig-overlay"></span>
            <span className="rig-text">PPE on Specials!!!!</span> */}
          </a>
        </li>
        <li className="ms-3 me-3">
          <a className="rig-cell" href="http://localhost:3000/product-list?categoryName=PPE&subCategoryName=EYE-PROTECTION">
            <img className="rig-img" src="images2/deal.png" />
            {/* <video className="rig-img" controls autoPlay muted loop><source src="images2/sample_2.mp4" type="video/mp4" />
            </video> */}
            <span className="rig-overlay"></span>
            <span className="rig-text">Access Over 1000 Products<br />
              {/* <text className="rig-text-inner">With over 30 years experience supplying products<br /> to a wide-range of industries, <br />CTL australia can supply any product for any job.</text> */}
            </span>
          </a>
        </li>
        <li className="">
          <a className="rig-cell" href="http://localhost:3000/product-list?categoryName=SITE-SAFETY">
            <img className="rig-img" src="images2/mining.png" />
            {/* <video className="rig-img" controls autoPlay muted loop><source src="images2/sample_3.mp4" type="video/mp4" /> */}
            {/* </video> */}
            <span className="rig-overlay" ></span>
            <span className="rig-text">Site Safty New Arrivals!!!<br />
              {/* <text className="rig-text-inner">Mining differs in many ways compared with other industries<br />with its operations being highly variable  <br />dependingon the nature of the resourcing being mined</text> */}
            </span>
          </a>
        </li>

      </ul>

      {/* </marquee> */}


    </>
  );

};

export default ProductsPromotionComponent;
