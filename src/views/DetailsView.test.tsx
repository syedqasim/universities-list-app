import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DetailsView from "./DetailsView";
import University from "../models/University";

const mockUniversity: University = {
  name: "Mock University",
  country: "Mock Country",
  web_pages: ["http://www.mockuniversity.com"],
  domains: ["mockuniversity.com"],
};

describe("DetailsView", () => {
  it("renders correctly and matches snapshot", () => {
    const { asFragment } = render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/details", state: { university: mockUniversity } },
        ]}
      >
        <Routes>
          <Route path="/details" element={<DetailsView />} />
        </Routes>
      </MemoryRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
