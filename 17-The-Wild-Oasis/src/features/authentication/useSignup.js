import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signUpApi,

    onSuccess: (user) => {
      console.log("Signup success:", user);

      toast.success(
        "Account successfully created! Please verify your email address.",
      );

      navigate("/login", { replace: true });
    },

    onError: (err) => {
      console.error("Signup error:", err);

      toast.error(err?.message || "Account creation failed. Please try again.");
    },
  });

  return { signup, isLoading };
}
