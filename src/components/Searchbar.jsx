import React from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";

const SearchBar = ({ value, onChange }) => {
  return (
    <InputBase
      placeholder="Search by name"
      value={value}
      className="rounded-md bg-whiter"
      onChange={onChange}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
    />
  );
};

export default SearchBar;
