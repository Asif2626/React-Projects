import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  function handleCheckout() {
    if (isCheckingOut) return;
    checkout(bookingId);
  }

  return (
    <Button
      variation="primary"
      size="small"
      onClick={handleCheckout}
      disabled={isCheckingOut}
      aria-busy={isCheckingOut}
    >
      {isCheckingOut ? "Checking out..." : "Check out"}
    </Button>
  );
}

export default CheckoutButton;
