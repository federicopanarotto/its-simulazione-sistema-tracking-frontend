import { useMemo, useState } from "react";

export function useSearchFilter<T>(
  data: T[] | undefined,
  searchFields: (keyof T)[]
) {
  const [searchText, setSearchText] = useState("");

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!searchText.trim()) return data;

    const searchLower = searchText.toLowerCase().trim();

    return data.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        if (value == null) return false;
        return String(value).toLowerCase().includes(searchLower);
      });
    });
  }, [data, searchText, searchFields]);

  return {
    searchText,
    setSearchText,
    filteredData
  };
}