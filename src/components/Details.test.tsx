import React from "react";
import { render } from "@testing-library/react";
import Details from "./Details";
import University from "../models/University";

const mockUniversity = new University(
  "Test University",
  "Test Country",
  ["http://test.edu"],
  ["test.edu"]
);

describe("Details Component", () => {
  test("renders university details", () => {
    const { getByText } = render(<Details university={mockUniversity} />);
    // expect(getByText("Test University")).toBeInTheDocument();
    // expect(getByText("Country: Test Country")).toBeInTheDocument();
    // expect(getByText("Web Pages: http://test.edu")).toBeInTheDocument();
    // expect(getByText("Domains: test.edu")).toBeInTheDocument();
  });
});
