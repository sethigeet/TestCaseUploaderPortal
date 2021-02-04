import { Column } from "react-table";

export const CHILD_MASTER_COLUMNS: Column[] = [
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
    Header: "ID",
    accessor: "id",
  },
];
