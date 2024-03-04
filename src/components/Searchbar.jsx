import React from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";

const SearchBar = ({ value, onChange }) => {
  return (
    <InputBase
      placeholder="Procurar pelo nome"
      value={value}
      className="rounded-md px-2 bg-whiter"
      onChange={onChange}
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      }
    />
  );
};

export default SearchBar;
