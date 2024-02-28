import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StudentContext from "../context/StudentContext";
import SearchBar from "./Searchbar";
import { MenuItem, Select } from "@mui/material";
import Filters from "./Filters";

export default function BasicTable() {
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
    <>
      <div className="w-full flex gap-x-5 my-5">
        <SearchBar value={searchInput} onChange={handleSearchInputChange} />
        <Filters sortBy={sortBy} onSortByChange={handleSortByChange} />
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="left">Contato</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Idade</TableCell>
              <TableCell align="left">Graduacao</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow
                key={student.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="student">
                  {student.name}
                </TableCell>
                <TableCell align="left">{student.calories}</TableCell>
                <TableCell align="left">{student.email}</TableCell>
                <TableCell align="left">{student.birthday}</TableCell>
                <TableCell align="left">{student.belt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
