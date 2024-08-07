import { FilterFn, Row } from "@tanstack/react-table";

export const dateRangeFilterFn: FilterFn<any> = (
  row: Row<any>,
  columnId: string,
  filterValue: [Date, Date]
) => {
  const [startDate, endDate] = filterValue;
  const rowDate = new Date(row.getValue(columnId));

  if (!startDate && !endDate) return true; // If no range is selected, show all rows
  if (!endDate) return rowDate >= startDate; // Filter only with start date
  if (!startDate) return rowDate <= endDate; // Filter only with end date
  return rowDate >= startDate && rowDate <= endDate; // Filter with both
};

export const booleanFilterFn: FilterFn<any> = (
  row: Row<any>,
  columnId: string,
  filterValue: boolean
) => {
  const rowValue = row.getValue(columnId);
  return filterValue === rowValue;
};

export const enumFilterFn: FilterFn<any> = (
  row: Row<any>,
  columnId: string,
  filterValue: string
) => {
  const rowValue: string = row.getValue(columnId);
  return filterValue === rowValue;
};

export const multiEnumFilterFn: FilterFn<any> = (
  row: Row<any>,
  columnId: string,
  filterValue: string[]
) => {
  const rowValue: string = row.getValue(columnId);
  return filterValue.some((value) => rowValue === value);
};

export const arrayFilterFn: FilterFn<any> = (
  row: Row<any>,
  columnId: string,
  filterValue: string[]
) => {
  const rowValue: string[] = row.getValue(columnId);
  if (!rowValue || !rowValue.length) {
    return true;
  }

  return filterValue.some((filterItem) =>
    rowValue.some((value) => value === filterItem)
  );
};
