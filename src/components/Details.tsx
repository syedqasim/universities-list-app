import React from "react";
//import { useNavigate } from "react-router-dom";
import University from "../models/University";
import "./Details.css";

interface DetailsProps {
  university: University;
}

const Details: React.FC<DetailsProps> = ({ university }) => {
  // const navigate = useNavigate();

  // const handleBack = () => {
  //   navigate("/");
  // };

  return (
    <div className="details-container">
      <h1 className="details-title">{university.name}</h1>
      <table className="details-table">
        <tbody>
          <tr>
            <th>Country</th>
            <td>{university.country}</td>
          </tr>
          <tr>
            <th>Web Pages</th>
            <td>{university.web_pages.join(", ")}</td>
          </tr>
          <tr>
            <th>Domains</th>
            <td>{university.domains.join(", ")}</td>
          </tr>
        </tbody>
      </table>
      {/* <button onClick={handleBack} className="back-button">
        Back
      </button> */}
    </div>
  );
};

export default Details;
