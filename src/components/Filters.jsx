import { MenuItem, Select } from "@mui/material";
import React from "react";

const Filters = ({ sortBy, onSortByChange }) => {
  return (
    <Select value={sortBy} onChange={onSortByChange}>
      <MenuItem value="name_asc">A - Z</MenuItem>
      <MenuItem value="name_desc">Z - A</MenuItem>
      <MenuItem value="age">Idade</MenuItem>
      <MenuItem value="belt">Faixa</MenuItem>
    </Select>
  );
};

export default Filters;
