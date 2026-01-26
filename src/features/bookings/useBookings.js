import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constant";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // ----- FILTER -----
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // ----- SORT -----
  const sortByRaw = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy =
    field && (direction === "asc" || direction === "desc")
      ? { field, direction }
      : { field: "startDate", direction: "asc" };

  // ----- PAGINATION -----
  const pageParam = Number(searchParams.get("page"));
  const page = !pageParam || isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  // ----- REACT QUERY -----
  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filterValue ?? "all", sortByRaw, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
    keepPreviousData: true,
  });

  const bookings = data?.data || [];
  const count = data?.count || 0;

  // Prefetch next and previous pages
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue ?? "all", sortByRaw, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue ?? "all", sortByRaw, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, bookings, count, error };
}
