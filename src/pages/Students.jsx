import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import SearchBar from "../components/Searchbar";
import Filters from "../components/Filters";
import StudentContext from "../context/StudentContext";
import AddMemberButton from "../components/AddMemberButton";
import StudentsTable from "../components/StudentTable/StudentTable";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const Students = () => {
  const { students } = useContext(StudentContext);
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("name_asc");

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
      } else if (sortBy === "name_asc") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "name_desc") {
        return b.name.localeCompare(a.name);
      }
    });

  return (
    <Layout>
      <div className="p-10">
        <div className="flex gap-x-3">
          <div className="flex justify-center items-end text-orange">
            <PeopleAltIcon fontSize="large" />
          </div>
          <h1 className="text-4xl">Alunos</h1>
        </div>
        <div className="w-full flex gap-x-5 my-5">
          <SearchBar value={searchInput} onChange={handleSearchInputChange} />
          <Filters sortBy={sortBy} onSortByChange={handleSortByChange} />
          <AddMemberButton />
        </div>
        <StudentsTable students={filteredStudents} />
      </div>
    </Layout>
  );
};

export default Students;
