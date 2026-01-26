import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  // Mutation for editing a cabin
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      queryClient.setQueriesData(["user"], user);
    },
    onError: (err) =>
      toast.error(
        err?.message || err?.response?.data?.message || "Something went wrong",
      ),
  });

  return { updateUser, isUpdating };
}
