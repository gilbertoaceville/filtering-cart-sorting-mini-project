import React from "react";
import ReactPaginate from "react-paginate";
import classes from "./pagination.module.css";

const Pagination = ({
  pageCount,
  offset,
  currentPage,
  handlePageClick,
}) => {
  const { pagination_container, pagination, active } = classes;
  return (
    <div className={pagination_container}>
      <ReactPaginate
        previousLabel={
          <i
            style={{ display: offset ? "inline-block" : "none" }}
            className="fa fa-chevron-left"
          ></i>
        }
        nextLabel={
          <i
            style={{
              display: currentPage !== pageCount - 1 ? "inline-block" : "none",
            }}
            className="fa fa-chevron-right"
          ></i>
        }
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={pagination}
        activeClassName={active}
      />
    </div>
  );
};

export default Pagination;
