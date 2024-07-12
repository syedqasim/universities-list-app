import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Listing from "./Listing";
import University from "../models/University";

const mockUniversities = [
  new University(
    "Test University",
    "Test Country",
    ["http://test.edu"],
    ["test.edu"]
  ),
];

describe("Listing Component", () => {
  test("renders universities", () => {
    render(
      <Router>
        <Listing
          universities={mockUniversities}
          searchTerm=""
          onSearch={jest.fn()}
          onSort={jest.fn()}
          onDelete={jest.fn()}
        />
      </Router>
    );
  });

  test("calls onSearch when typing in search input", () => {
    const onSearch = jest.fn();
    render(
      <Router>
        <Listing
          universities={mockUniversities}
          searchTerm=""
          onSearch={onSearch}
          onSort={jest.fn()}
          onDelete={jest.fn()}
        />
      </Router>
    );
    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "test" },
    });
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  test("calls onSort when sort button is clicked", () => {
    const onSort = jest.fn();
    render(
      <Router>
        <Listing
          universities={mockUniversities}
          searchTerm=""
          onSearch={jest.fn()}
          onSort={onSort}
          onDelete={jest.fn()}
        />
      </Router>
    );
    fireEvent.click(screen.getByText("Sort"));
    expect(onSort).toHaveBeenCalledTimes(1);
  });
});
