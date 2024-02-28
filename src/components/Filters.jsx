import { MenuItem, Select } from "@mui/material";
import React from "react";

const Filters = ({ sortBy, onSortByChange }) => {
  return (
    <Select value={sortBy} onChange={onSortByChange}>
      <MenuItem value="name">Sort by Name</MenuItem>
      <MenuItem value="age">Sort by Age</MenuItem>
      <MenuItem value="belt">Sort by Belt</MenuItem>
    </Select>
  );
};

export default Filters;
