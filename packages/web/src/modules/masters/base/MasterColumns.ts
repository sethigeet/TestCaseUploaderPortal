import { Column } from "react-table";

import * as timeago from "timeago.js";

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
        Cell: ({ value }) => (value ? timeago.format(parseInt(value)) : "-"),
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
        Cell: ({ value }) => (value ? timeago.format(parseInt(value)) : "-"),
      },
    ],
  },
  {
    Header: "ID",
    accessor: "id",
  },
];
