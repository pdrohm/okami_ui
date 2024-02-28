import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import StudentTable from "../components/StudentTable";
import SearchBar from "../components/Searchbar";
import Filters from "../components/Filters";
import StudentContext from "../context/StudentContext";
import AddMemberButton from "../components/AddMemberButton";

const Students = () => {
  const { students } = useContext(StudentContext);
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredStudents = students
    .filter((student) =>
      student.name.toLowerCase().includes(searchInput.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "age") {
        return a.birthday - b.birthday;
      } else if (sortBy === "belt") {
        return a.belt.localeCompare(b.belt);
      } else {
        return a.name.localeCompare(b.name);
      }
    });

  return (
    <Layout>
      <div className="p-10">
        <h1>Alunos</h1>
        <div className="w-full flex gap-x-5 my-5">
          <SearchBar value={searchInput} onChange={handleSearchInputChange} />
          <Filters sortBy={sortBy} onSortByChange={handleSortByChange} />
          <AddMemberButton />
        </div>
        <StudentTable students={filteredStudents} />
      </div>
    </Layout>
  );
};

export default Students;
