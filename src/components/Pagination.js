import React from "react";

const Pagination = ({ onLeftClick, onRightClick, page, totalPages }) => {
  return (
    <div className="row d-flex align-items-center">
      <button className="btn btn-dark btn-round" onClick={onLeftClick}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <p className="m-2">
        {page} de {totalPages}
      </p>
      <button className="btn btn-dark btn-round" onClick={onRightClick}>
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
