import axios from "axios";
import React, { useState } from "react";
import Modal from "./Modal";

const DataTable = ({ data }) => {
  if (data === null) {
    return <div>No data available</div>;
  }

  const initialFormData = data.reduce((obj, item) => {
    return {
      ...obj,
      [item]: "",
    };
  }, {});
  // console.log(initialFormData, "datassss");

  const [formData, setFormData] = useState(initialFormData);
  const [dataOutput, setDataOutput] = useState();
  const [errorMessages, setErrorMessages] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(typeof(Number(value)),'value');

    //new changes validation
    const inputValue = value.trim();
    if (/^[-+]?\d*\.?\d+$/.test(inputValue)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: Number(value),
      }));
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    } else {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [name]: "Please enter a valid number.",
      }));
    }
  };
  // console.log(formData,'formdata');

  const handleSubmit = (e) => {
    e.preventDefault();
    const temp = Object.values(formData);
    const dataArray = {
      user_input: temp,
    };
    console.log(dataArray, "dataaaa");

    const baseurl = import.meta.env.VITE_REACT_APP_API_BASE_URL;
    // const baseurl = import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:8000/';

    console.log(import.meta.env, "meta");
    console.log(baseurl, "baseurl");

    axios
      .post(baseurl + "api/predict/", dataArray, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setDataOutput(response.data.prediction_data.Output);

        console.log("responsee", response);
      })
      .catch((error) => {
        console.error("Error making the request:", error);
      });
    handleShowModal();
  };

  const renderFields = () => {
    return (
      <div className="form-group-container">
        {data.map((key, index) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>{key}</label>
            <input
              type="text"
              required
              id={index}
              name={key}
              value={formData[key]}
              // value={4}
              onChange={handleInputChange}
            />
          </div>
        ))}
      </div>
    );
  };

  // for modals
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // const handleModalSubmit = (e) => {
  //   e.preventDefault();
  // };
  //

  return (
    <div className="form-container">
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          {renderFields()}
          {/* <hr /> */}
          <button type="submit">Submit</button>
        </form>
      </div>
      <Modal
        show={showModal}
        handleClose={handleCloseModal}
        dataOutput={dataOutput}
      />
      <br />
      <br />
    </div>
  );
};

export default DataTable;

// const renderFields = () => {
//   return data.map((key, index) => (
//     <div key={key} className="form-group">
//       <label htmlFor={key}>{key}</label>
//       <input
//         type="text"
//         id={index}
//         name={key}
//         value={formData.key}
//         onChange={handleInputChange}
//       />
//     </div>
//   ));
// };
