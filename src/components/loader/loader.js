import React from "react";
import './loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div class="lds-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
