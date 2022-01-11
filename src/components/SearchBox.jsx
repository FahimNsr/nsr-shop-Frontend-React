import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SearchBox = (props) => {
  const { t } = useTranslation();
  const [name, setName] = useState();
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
          {t("nav.search")}
        </button>
      </div>
    </form>
  );
};

export default withRouter(SearchBox);
