import React from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import withHocs from "./MoviesSearchHoc";
import InputLabel from "@material-ui/core/InputLabel";
class MoviesSearch extends React.Component {
  render() {
    const { classes, name, handleChange, handleSearch, handleSelectChange, selectedValue } = this.props;
    const  genre  = selectedValue;
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={handleChange("name")}
          onKeyPress={(e) => handleSearch(e)}
          value={name}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
        <div className={classes.dropDown}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            genre
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={genre}
            name='genre'
            onChange={(e) => {
              handleSelectChange(e);
              handleChange('genre')(e);
            }}
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'hentai'}>hentai</MenuItem>
            <MenuItem value={'senen'}>senen</MenuItem>
            <MenuItem value={'life'}>life</MenuItem>
          </Select>
        </div>
      </div>
    );
  }
}

export default withHocs(MoviesSearch);
