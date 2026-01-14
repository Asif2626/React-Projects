import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

const UpdateOrder = ({ order }) => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      method="PATCH"
      className="text-right"
      action={`/order/${order.id}`}
    >
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
};

export default UpdateOrder;

// Action for React Router to handle PATCH request
export async function action({ params }) {
  const orderId = params.orderId;
  const data = { priority: true };
  await updateOrder(orderId, data);
  return null;
}
