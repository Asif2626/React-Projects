import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        {" | "}
        <Link to="/login">Login</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}
