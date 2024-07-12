import React from "react";
import { render, fireEvent, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ListingView from "./ListingView";
import UniversityController from "../controllers/UniversityController";
import University from "../models/University";
import "@testing-library/jest-dom"; // This ensures jest-dom matchers are available

// Mock data
const mockUniversities: University[] = [
  {
    name: "University A",
    country: "Country A",
    web_pages: ["http://www.universitya.com"],
    domains: ["universitya.com"],
  },
  {
    name: "University B",
    country: "Country B",
    web_pages: ["http://www.universityb.com"],
    domains: ["universityb.com"],
  },
];

// Mocking the UniversityController methods
jest.mock("../controllers/UniversityController", () => ({
  fetchUniversities: jest.fn(),
  searchUniversities: jest.fn(),
  sortUniversities: jest.fn(),
  deleteUniversity: jest.fn(),
}));

describe("ListingView", () => {
  beforeEach(() => {
    (UniversityController.fetchUniversities as jest.Mock).mockResolvedValue(
      mockUniversities
    );
    (UniversityController.searchUniversities as jest.Mock).mockReturnValue(
      mockUniversities
    );
    (UniversityController.sortUniversities as jest.Mock).mockReturnValue(
      mockUniversities
    );
    (UniversityController.deleteUniversity as jest.Mock).mockReturnValue(
      mockUniversities.slice(1)
    );
  });

  it("renders correctly and matches snapshot", async () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ListingView />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("fetches and displays universities on mount", async () => {
    const { findByText } = render(
      <MemoryRouter>
        <ListingView />
      </MemoryRouter>
    );

    expect(await findByText(/University A/i)).toBeInTheDocument();
    expect(await findByText(/University B/i)).toBeInTheDocument();
  });

  it("searches universities", async () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <ListingView />
      </MemoryRouter>
    );

    const searchInput = getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "University A" } });

    await waitFor(() => {
      expect(UniversityController.searchUniversities).toHaveBeenCalledWith(
        "University A"
      );
    });
  });

  it("sorts universities", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <ListingView />
      </MemoryRouter>
    );

    const sortButton = getByText(/Sort/i);
    fireEvent.click(sortButton);

    await waitFor(() => {
      expect(UniversityController.sortUniversities).toHaveBeenCalledWith(true);
    });
  });

  it("deletes a university", async () => {
    const { findByText } = render(
      <MemoryRouter>
        <ListingView />
      </MemoryRouter>
    );

    // Find the university item containing "University A"
    const universityItem = await findByText(/University A/i);
    const universityListItem = universityItem.closest("li");
    if (!universityListItem) throw new Error("University A item not found");
    const deleteButton = within(universityListItem).getByText(/Delete/i);
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(UniversityController.deleteUniversity).toHaveBeenCalledWith(
        "University A"
      );
    });
  });
});
