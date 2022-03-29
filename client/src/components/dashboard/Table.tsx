import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import "css/table.css";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoChevronUpOutline,
} from "react-icons/io5";
import { tableData } from "../../types/types";

const Table = ({
  columns,
  data,
}: {
  columns: any;
  data: any;
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  const renderPageNumbers = () => {
    let pageNumbers = [];
    for (let index = 0; index < pageOptions.length; index++) {
      pageNumbers.push(
        <button
          className={
            pageIndex === index
              ? "page-number number-active"
              : "page-number number-inactive"
          }
          onClick={() => gotoPage(index)}
          key={index}
        >
          {index + 1}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="table-container">
      <div className="show-page-container">
        <span>
          Mostrar
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            className="show-results"
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          elementos
        </span>
      </div>
      <table {...getTableProps()} className="table-body">
        <thead className="table-thead">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="table-header"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <SortButton
                    isSorted={column.isSorted}
                    isSortedDesc={column.isSortedDesc}
                  />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="table-row">
                {row.cells.map((cell) => {
                  return (
                    <td className="table-cell" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <div className="pagination-buttons">
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="page-button"
          >
            <IoChevronBackOutline size={"1.2rem"} />
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="page-button"
          >
            <IoChevronForwardOutline size={"1.2rem"} />
          </button>
        </div>
        <div className="page-of">
          Página{" "}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>
        </div>
      </div>
    </div>
  );
};

const SortButton = ({
  isSorted,
  isSortedDesc,
}: {
  isSorted: boolean;
  isSortedDesc: boolean | undefined;
}) => {
  return (
    <button className="sort-button">
      <IoChevronUpOutline
        className={
          isSorted
            ? isSortedDesc
              ? "sort-icon-desc"
              : "sort-icon-asc"
            : "sort-icon"
        }
        size={"1rem"}
      />
    </button>
  );
};

export default Table;
