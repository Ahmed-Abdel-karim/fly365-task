import React from "react";
import "./spinner.scss";

const Spinner = ({ className = "" }) => (
  <div className={`spinner ${className}`}>
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Spinner;
