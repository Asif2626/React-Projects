import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constant";

// Map URL values to actual DB column values
const statusMap = {
  "checked-out": "checked-out",
  "checked-in": "checked-in",
  unconfirmed: "unconfirmed",
};

// Map sort fields to Supabase column names
const sortFieldMap = {
  startDate: "startDate",
  totalPrice: "totalPrice",
};

export async function getBookings({ filter, sortBy, page }) {
  // First, get total count for this filter
  const { count: totalCount, error: countError } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true }) // head: true returns only count
    .match(
      filter && filter.field === "status"
        ? { status: statusMap[filter.value] }
        : {},
    );

  if (countError) {
    console.error("Supabase count error:", countError);
    return { data: [], count: 0 };
  }

  const pageCount = Math.ceil(totalCount / PAGE_SIZE) || 1;
  const safePage = page > pageCount ? pageCount : page;

  let query = supabase.from("bookings").select(
    `
      id,
      created_at,
      startDate,
      endDate,
      numNights,
      numGuests,
      status,
      totalPrice,
      cabins(name),
      guests(fullName, email)
      `,
    { count: "exact" },
  );

  // ----- FILTER -----
  if (filter && filter.field && filter.value) {
    const value =
      filter.field === "status" ? statusMap[filter.value] : filter.value;
    query = query.eq(filter.field, value);
  }

  // ----- SORT -----
  if (sortBy && sortBy.field) {
    const field = sortFieldMap[sortBy.field] || sortBy.field;
    query = query.order(field, { ascending: sortBy.direction === "asc" });
  }

  // ----- PAGINATION -----
  const from = (safePage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  query = query.range(from, to);

  // ----- EXECUTE -----
  const { data, error } = await query;

  if (error) {
    console.error("Supabase error:", error);
    return { data: [], count: totalCount || 0 }; // safe fallback
  }

  return { data: data || [], count: totalCount || 0 };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// iso Date
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`,
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  // Validate the ID
  if (!id || isNaN(Number(id))) {
    console.error("Cannot update booking: invalid or missing ID", id);
    throw new Error("Booking ID is required and must be a number");
  }

  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Supabase update error:", error);
    throw new Error("Booking could not be updated");
  }

  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
