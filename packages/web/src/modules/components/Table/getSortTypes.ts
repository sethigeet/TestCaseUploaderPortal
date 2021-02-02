import { SortByFn } from "react-table";

export const getSortTypes = (): Record<string, SortByFn<any>> => ({
  boolean: (rowA, rowB, columnId) => {
    if (rowA.values[columnId] && rowB.values[columnId]) {
      return 0;
    }
    if (rowA.values[columnId]) {
      return 1;
    }
    if (rowB.values[columnId]) {
      return -1;
    }
    return 0;
  },
});
