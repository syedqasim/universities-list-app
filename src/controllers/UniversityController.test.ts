// UniversityController.test.ts
import fetchMock from "fetch-mock";
import UniversityController from "./UniversityController";
import University from "../models/University";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

describe("UniversityController", () => {
  afterEach(() => {
    fetchMock.restore();
    localStorage.clear();
  });

  it("fetches data successfully from the API", async () => {
    const mockData = [
      {
        name: "University of ABC",
        country: "United Arab Emirates",
        web_pages: ["http://www.abc.ac.ae"],
        domains: ["abc.ac.ae"],
      },
    ];
    fetchMock.get(
      "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates",
      {
        status: 200,
        body: mockData,
      }
    );

    const universities = await UniversityController.fetchUniversities();
    expect(universities).toEqual([
      new University(
        "University of ABC",
        "United Arab Emirates",
        ["http://www.abc.ac.ae"],
        ["abc.ac.ae"]
      ),
    ]);
    expect(localStorage.getItem("universities")).toEqual(
      JSON.stringify(universities)
    );
  });

  it("throws an error when the network response is not ok", async () => {
    fetchMock.get(
      "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates",
      500
    );

    await expect(UniversityController.fetchUniversities()).rejects.toThrow(
      "Failed to fetch universities and no cached data found"
    );
  });

  it("returns cached data when network response is not ok and cached data exists", async () => {
    const cachedData = [
      new University(
        "Cached University",
        "United Arab Emirates",
        ["http://www.cached.ac.ae"],
        ["cached.ac.ae"]
      ),
    ];
    localStorage.setItem("universities", JSON.stringify(cachedData));

    fetchMock.get(
      "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates",
      500
    );

    const universities = await UniversityController.fetchUniversities();
    expect(universities).toEqual(cachedData);
  });

  it("throws an error when network response is not ok and no cached data exists", async () => {
    fetchMock.get(
      "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates",
      500
    );

    await expect(UniversityController.fetchUniversities()).rejects.toThrow(
      "Failed to fetch universities and no cached data found"
    );
  });
});
