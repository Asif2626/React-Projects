import styled from "styled-components";
import { useEffect, useState } from "react";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { checkin, isCheckingIn } = useCheckin();
  const moveBack = useMoveBack();

  //  sync paid status from DB
  useEffect(() => {
    if (booking) setConfirmPaid(booking.isPaid);
  }, [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    status,
  } = booking;

  const isCheckedIn = status === "checked-in";

  const optionalBreakfastPrice =
    settings.breakFastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid || isCheckedIn) return;

    checkin({
      bookingId,
      breakfast: addBreakfast
        ? {
            hasBreakfast: true,
            extrasPrice: optionalBreakfastPrice,
            totalPrice: totalPrice + optionalBreakfastPrice,
          }
        : {},
    });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {/*  Price color changes here when isPaid=true */}
      <BookingDataBox booking={booking} />

      {/* Breakfast option only before check-in */}
      {!hasBreakfast && !isCheckedIn && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((prev) => !prev);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirm-paid"
          checked={confirmPaid}
          disabled={isCheckedIn || isCheckingIn}
          onChange={() => setConfirmPaid((prev) => !prev)}
        >
          I confirm that {guests.fullName} has paid{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice,
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice,
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isCheckingIn || isCheckedIn}
        >
          Check in booking #{bookingId}
        </Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
