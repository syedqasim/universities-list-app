import React from "react";
import { useLocation } from "react-router-dom";
import Details from "../components/Details";
import University from "../models/University";

const DetailsView: React.FC = () => {
  const location = useLocation();
  const { university } = location.state as { university: University };

  return <Details university={university} />;
};

export default DetailsView;
