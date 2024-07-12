import React, { useState, useEffect } from "react";
import UniversityController from "../controllers/UniversityController";
import Listing from "../components/Listing";
import University from "../models/University";

const ListingView: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UniversityController.fetchUniversities();
        setUniversities(data);
      } catch (error) {
        console.error((error as Error).message);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setUniversities(UniversityController.searchUniversities(e.target.value));
  };

  const handleSort = () => {
    setSortOrder(!sortOrder);
    setUniversities(UniversityController.sortUniversities(sortOrder));
  };

  const handleDelete = (name: string) => {
    setUniversities(UniversityController.deleteUniversity(name));
  };

  return (
    <Listing
      universities={universities}
      searchTerm={searchTerm}
      onSearch={handleSearch}
      onSort={handleSort}
      onDelete={handleDelete}
    />
  );
};

export default ListingView;
