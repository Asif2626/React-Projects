import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';

const AppLayout = () => {
  const navigate = useNavigation();
  const isLoading = navigate.state === 'loading';
  return (
    <div className="grid h-screen grid-rows-[auto-1fr-auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="max-width-3xl mx-auto">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
};

export default AppLayout;
