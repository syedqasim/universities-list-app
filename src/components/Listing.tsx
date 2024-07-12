import React, { useState } from "react";
import { Link } from "react-router-dom";
import University from "../models/University";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./Listing.css";

interface ListingProps {
  universities: University[];
  searchTerm: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSort: () => void;
  onDelete: (name: string) => void;
}

const Listing: React.FC<ListingProps> = ({
  universities,
  searchTerm,
  onSearch,
  onSort,
  onDelete,
}) => {
  const [itemsToDelete, setItemsToDelete] = useState<string[]>([]);

  const handleDelete = (name: string) => {
    setItemsToDelete((prev) => [...prev, name]);
    setTimeout(() => {
      onDelete(name);
      setItemsToDelete((prev) => prev.filter((item) => item !== name));
    }, 500); // Match with CSS animation duration
  };

  return (
    <div className="container">
      <h1 className="title">University Listing</h1>
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={onSearch}
          className="search-input"
        />
        <button onClick={onSort} className="sort-button">
          <FontAwesomeIcon icon={faSort} className="icon" />
          Sort
        </button>
      </div>
      <ul className="university-list">
        {universities.map((uni) => (
          <li
            key={uni.name}
            className={`university-item ${
              itemsToDelete.includes(uni.name) ? "fade-out" : ""
            }`}
          >
            <Link
              to="/details"
              state={{ university: uni }}
              className="university-link"
            >
              {uni.name}
            </Link>
            <button
              onClick={() => handleDelete(uni.name)}
              className="delete-button"
            >
              <FontAwesomeIcon icon={faTrashAlt} className="icon" />
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listing;
