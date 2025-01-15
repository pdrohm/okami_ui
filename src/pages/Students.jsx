import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import SearchBar from "../components/Searchbar";
import Filters from "../components/Filters";
import AddMemberButton from "../components/AddMemberButton";
import StudentsTable from "../components/StudentTable/StudentTable";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { differenceInYears } from "date-fns";
import { useStudentStore } from "../store/useStudentStore";
import Pagination from "@mui/material/Pagination";

const Students = () => {
  const { students, getStudents } = useStudentStore();
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("name_asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const filteredStudents = students
    .filter((student) =>
      student.name.toLowerCase().includes(searchInput.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "age_asc") {
        const ageA = differenceInYears(new Date(), new Date(a.birthDate));
        const ageB = differenceInYears(new Date(), new Date(b.birthDate));
        return ageA - ageB;
      } else if (sortBy === "age_desc") {
        const ageA = differenceInYears(new Date(), new Date(a.birthDate));
        const ageB = differenceInYears(new Date(), new Date(b.birthDate));
        return ageB - ageA;
      } else if (sortBy === "belt") {
        return a.belt.localeCompare(b.belt);
      } else if (sortBy === "name_asc") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "name_desc") {
        return b.name.localeCompare(a.name);
      }
    });

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="flex justify-center w-screen bg-whiter">
      <div className="p-10 w-full">
        <div className="flex gap-x-3 mb-5">
          <div className="flex justify-center items-end text-orange">
            <PeopleAltIcon fontSize="large" />
          </div>
          <h1 className="text-4xl">Alunos</h1>
        </div>
        <div className="w-full flex gap-x-5 items-center mb-5">
          <SearchBar value={searchInput} onChange={handleSearchInputChange} />
          <Filters sortBy={sortBy} onSortByChange={handleSortByChange} />
          <AddMemberButton
            title="Adicionar aluno"
            urlNavigate="/alunos/registro"
          />
          <div className="ml-auto">
            <Pagination
              count={Math.ceil(filteredStudents.length / rowsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </div>
        <StudentsTable students={paginatedStudents} />
      </div>
    </div>
  );
};

export default Students;