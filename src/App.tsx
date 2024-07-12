import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListingView from "./views/ListingView";
import DetailsView from "./views/DetailsView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListingView />} />
        <Route path="/details" element={<DetailsView />} />
      </Routes>
    </Router>
  );
}

export default App;
