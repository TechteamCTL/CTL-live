import React, { useState, useEffect } from "react";
import axios from "axios";

const QuotePriceComponent = (quotePriceData) => {
  const [formData, setFormData] = useState({
    from: "",
    productName: "",
    description: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [dots, setDots] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const currentUrl = window.location.href;


  useEffect(() => {
    let interval = null;

    if (isSending) {
      interval = setInterval(() => {
        setDots((dots) => {
          if (dots.length === 6) {
            return "";
          }
          return dots + ".";
        });
      }, 500);
    } else {
      clearInterval(interval);
      setDots("");
    }

    return () => clearInterval(interval);
  }, [isSending]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



console.log('quotePriceDataCCCCCCCompoent',quotePriceData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formDataToSend = new FormData();
    formDataToSend.append("from", `${quotePriceData.quotePriceData.name} <${quotePriceData.quotePriceData.email}>`);
    formDataToSend.append("productName", `${quotePriceData.quotePriceData.productName}`);
    formDataToSend.append("description", `<${currentUrl}>`);
    try {
      setIsSending(true);
      const res = await axios.post("/api/sendemail/quoteprice", formDataToSend, config);
      console.log(res.data);
      setIsSending(false);
      setFormData({
        from: "",
        productName: "",
        description: "",
      });
      setSuccessMessage("Email sent successfully");

      setTimeout(() => {
        setSuccessMessage(false);
      }, 4000);
      
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* TODO: have user's name here as from */}
          <div className="form-group" style={{display:"none"}}>
            <input
              className="form-control "
              type="text"
              name="from"
              required
              placeholder="From:"
              value="{from}"
              onChange={handleChange}
            />
          </div>
          <div className="form-group" style={{display:"none"}}>
            <input
              className="form-control "
              type="text"
              name="productName"
              required
              placeholder="Product Name:"
              value="{productName}"
              onChange={handleChange}
            />
          </div>
          <div className="form-group" style={{display:"none"}}>
            <textarea
              className="form-control "
              name="description"
              required
              placeholder="Description"
              value="{description}"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <button
              className="btn btn-block btn-success"
              disabled={isSending || successMessage}
            >
              {isSending ? `Sending${dots}` : "Send Quote"}
            </button>
          </div>
        </form>
        {successMessage && (
          <div className="alert mt-2 w-75 p-1" role="alert" style={{backgroundColor:"lightgray"}}>
            <p className="m-0 ms-2 mb-2">Email has been sent, Thanks for your quote.</p>
            <p className="m-0 ms-2">One of our finest team members will reach out to you soon</p>
          </div>
        )}
      </div>
    </>
  );
};

export default QuotePriceComponent;
