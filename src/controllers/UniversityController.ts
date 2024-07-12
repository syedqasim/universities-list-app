// UniversityController.ts
import University from "../models/University";

const API_URL =
  "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates";

class UniversityController {
  static async fetchUniversities(): Promise<University[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const universities = data.map(
        (uni: any) =>
          new University(uni.name, uni.country, uni.web_pages, uni.domains)
      );
      localStorage.setItem("universities", JSON.stringify(universities));
      return universities;
    } catch (error) {
      const cachedUniversities = localStorage.getItem("universities");
      if (cachedUniversities) {
        return JSON.parse(cachedUniversities);
      } else {
        throw new Error(
          "Failed to fetch universities and no cached data found"
        );
      }
    }
  }

  static searchUniversities(keyword: string): University[] {
    const universities: University[] = JSON.parse(
      localStorage.getItem("universities") || "[]"
    );
    return universities.filter((uni) =>
      uni.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  static sortUniversities(alphabetically: boolean = true): University[] {
    const universities: University[] = JSON.parse(
      localStorage.getItem("universities") || "[]"
    );
    return universities.sort((a, b) => {
      if (alphabetically) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }

  static deleteUniversity(name: string): University[] {
    let universities: University[] = JSON.parse(
      localStorage.getItem("universities") || "[]"
    );
    universities = universities.filter((uni) => uni.name !== name);
    localStorage.setItem("universities", JSON.stringify(universities));
    return universities;
  }
}

export default UniversityController;
