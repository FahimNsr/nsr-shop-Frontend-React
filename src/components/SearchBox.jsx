import React, { useState } from "react";
import { withRouter } from "react-router-dom";

const SearchBox = (props) => {
  const [name, setName] = useState();
  // console.log(name)
  if (name) {
    console.log("object");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    if (name) {
      props.history.push(`/products/name/${name}`);
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="input-group">
        <input
          type="text"
          name="search"
          className="form-control"
          placeholder="..........."
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn btn-sm btn-outline-light" type="submit">
          Search
        </button>
      </div>
    </form>
  );
};

export default withRouter(SearchBox);
