import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import useStyles from "./style"
import { useDispatch } from "react-redux";
import {setSearchQuery} from "../../features/currentGenreOrCategory"
import { useLocation } from 'react-router-dom';

const Search = () => {
  const classes = useStyles();
  const location = useLocation();
  const [query, setQuery] = useState(" ")
  const dispatch = useDispatch()

  const handleKeyPress = (e) => {
    if(e.key == "Enter"){
      dispatch(setSearchQuery(query))
    }
  }

  /* If not homepage, do not show Search */
  if(location.pathname !== "/"){
    return null;
  }

  return (
    <div className={classes.searchContainer}>
      <TextField
        hiddenLabel
        id="filled-hidden-label-normal"
        variant="filled"
        placeholder="Search"
        inputProps={{
          'data-testid': 'search-input',
          className: classes.input,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onKeyDown={handleKeyPress}
        // on each Key press, store updated query into state
        onChange={(e) => { setQuery(e.target.value) }}
      />
    </div>
  )
};

export default Search;
