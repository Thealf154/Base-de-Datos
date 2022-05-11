import React, { useEffect } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  HeaderProps,
  CellProps,
  useRowSelect,
} from "react-table";
import "css/table.css";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoChevronUpOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { tableData } from "../../types/types";

const Table = ({
  columns,
  data,
  onDeleteRow,
  onSelectedRows,
}: {
  columns: any;
  data: any;
  onDeleteRow: (id: string) => void;
  onSelectedRows: (rows: Array<{}>) => void;
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "_selector",
          disableResizing: true,
          disableGroupBy: true,
          minWidth: 45,
          width: 45,
          maxWidth: 45,
          Aggregated: undefined,
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<any>) => (
            //<HeaderCheckbox {...getToggleAllRowsSelectedProps()} />
            <input
              type="checkbox"
              name=""
              id=""
              {...getToggleAllRowsSelectedProps()}
              className="select-row-checkbox"
            />
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }: CellProps<any>) => (
            //<RowCheckbox {...row.getToggleRowSelectedProps()} />
            <input
              type="checkbox"
              name=""
              id=""
              {...row.getToggleRowSelectedProps()}
              className="select-row-checkbox"
            />
          ),
        },
        ...columns,
        {
          id: "actions",
          Header: "Acciones",
          Cell: ({ row }) => (
            <div>
              <div className="table-actions">
                <button>
                  <IoPencilOutline size={"1rem"} className="action-icon" />
                </button>
                <button
                  onClick={() => onDeleteRow(row.allCells[1].value)}
                >
                  <IoTrashOutline size={"1rem"} className="action-icon" />
                </button>
              </div>
            </div>
          ),
        },
      ]);
    }
  );

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setGlobalFilter(value);
  };

  const renderPageNumbers = () => {
    let pageNumbers = [];
    const maxPages = 3;
    for (let index = 0; index < maxPages; index++) {
      const currentNumber = pageIndex + index;
      pageNumbers.push(
        <button
          className={
            pageIndex === currentNumber
              ? "page-number number-active"
              : "page-number number-inactive"
          }
          onClick={() => gotoPage(currentNumber)}
          key={index}
        >
          {currentNumber + 1}
        </button>
      );
    }
    return pageNumbers;
  };

  useEffect(() => {
    onSelectedRows(selectedFlatRows);
    return () => {};
  }, [selectedFlatRows]);

  return (
    <div className="table-container">
      <div className="show-page-container">
        <span className="show-page">
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
        <span>Buscar: </span>
        <input
          onChange={handleFilterInputChange}
          className="text-field"
          id="search-input"
        />
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
                  {column.canSort ? (
                    <SortButton
                      isSorted={column.isSorted}
                      isSortedDesc={column.isSortedDesc}
                    />
                  ) : null}
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
                  if (cell.column.id === "email") {
                    return (
                      <td className="table-cell" {...cell.getCellProps()}>
                        <a href={"mailto:" + cell.value} className="mail-link">
                          {cell.render("Cell")}
                        </a>
                      </td>
                    );
                  } else if (cell.column.id === "grade") {
                    return (
                      <td className="table-cell" {...cell.getCellProps()}>
                        <div
                          className={
                            (parseInt(cell.value) as unknown as number) > 6
                              ? "grade-link grade-approved"
                              : "grade-link grade-failed"
                          }
                        >
                          {cell.render("Cell")}
                        </div>
                      </td>
                    );
                  } else {
                    return (
                      <td className="table-cell" {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  }
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
      { /* <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              "selectedFlatRows[].original": selectedFlatRows.map(
                (d) => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre>*/}
      
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
