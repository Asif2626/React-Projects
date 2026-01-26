import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: ({ bookingId }) => {
      // Validate bookingId
      if (!bookingId || isNaN(Number(bookingId))) {
        console.error("Cannot checkout: invalid booking ID", bookingId);
        throw new Error("Invalid booking ID");
      }
      return updateBooking(bookingId, { status: "checked-out" });
    },

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      // Invalidate queries so UI updates
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["booking", data.id] });
    },

    onError: (err) => {
      console.error("Checkout error:", err);
      toast.error("There was an error while checking out");
    },
  });

  return { checkout, isCheckingOut };
};
