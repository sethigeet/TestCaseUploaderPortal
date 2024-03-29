import { Column } from "react-table";

import { formatTime } from "../../utils";

export const MASTER_COLUMNS: Column[] = [
  {
    Header: "Code",
    accessor: "code",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Deprecated",
    accessor: "deprecated",
    sortType: "boolean",
  },
  {
    Header: "Creation",
    columns: [
      {
        Header: "Created By",
        accessor: "createdBy.username",
        Cell: ({ value }) => value || "-",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) => formatTime(value),
      },
    ],
  },
  {
    Header: "Updation",
    columns: [
      {
        Header: "Updated By",
        accessor: "updatedBy.username",
        Cell: ({ value }) => value || "-",
      },
      {
        Header: "Updated At",
        accessor: "updatedAt",
        Cell: ({ value }) => formatTime(value),
      },
    ],
  },
  {
    Header: "ID",
    accessor: "id",
  },
];
