# Date: 01-14-26

# Habit-Tracker

A habit tracker is ideal for learning this stack because it naturally needs auth, forms, server state, global state, and routing.

I’ll lock the remaining decisions in a way that maximizes learning and real-world relevance. If you want changes later, we can adjust.

🔒 Final Stack (Locked)

App: Habit Tracker
Frontend: React + Vite
Routing: React Router
Server state: React Query
Global state: Redux Toolkit (best for mastery + interviews)
Forms & validation: React Hook Form + Zod
Auth & backend: Supabase (auth + database = full-stack experience)

This combo mirrors how modern production apps are actually built.

🧠 What You’ll Learn (for real)

By the end, you will confidently know:

When to use React Query vs Redux

How to structure a scalable React app

How auth flows actually work

How to build robust forms with validation

How to fetch, cache, mutate, and sync data

How to protect routes properly

📦 App Features (scope we’ll build)

Auth

Sign up / login

Persisted session

Protected routes

Habits

Create habit (name, frequency, goal)

Edit & delete habits

Mark habit as completed (daily)

View habit streaks

UX

Loading states

Error handling

Clean folder structure

🧭 Roadmap (Step-by-step)
Phase 1 – Project Foundation (NEXT)

Vite + React setup

Install core libraries

Folder structure

React Router layout

Phase 2 – Supabase Auth

Supabase project setup

Auth flows

Auth state in Redux

Protected routes

Phase 3 – Habits Data

Supabase tables

React Query queries & mutations

Cache invalidation

Phase 4 – Forms

React Hook Form + Zod

Create/edit habit forms

Validation UX

Phase 5 – State Architecture

Redux slices

What goes in Redux vs React Query

Best practices

🚀 Step 1: Project Setup (Let’s start)
1️⃣ Create the project
npm create vite@latest habit-tracker -- --template react
cd habit-tracker
npm install
npm run dev

2️⃣ Install dependencies
npm install react-router-dom
npm install @tanstack/react-query
npm install @reduxjs/toolkit react-redux
npm install react-hook-form zod @hookform/resolvers
npm install @supabase/supabase-js

✅ Your task now

Create the project

Install the dependencies

Confirm it runs

Reply with “done” and I’ll guide you through:
👉 folder structure + React Router layout (public vs protected routes)

🔹 Step 2: Folder Structure + Routing Architecture

We’ll set up a scalable structure and real routing (public vs protected).

📁 Folder Structure (create these)

Inside src/:

src/
├─ app/
│ ├─ store.js
│ ├─ queryClient.js
│
├─ features/
│ ├─ auth/
│ │ ├─ authSlice.js
│ │ └─ ProtectedRoute.jsx
│ │
│ └─ habits/
│ ├─ habitsApi.js
│ ├─ habitsSlice.js (later)
│ └─ components/
│
├─ pages/
│ ├─ Login.jsx
│ ├─ Register.jsx
│ ├─ Dashboard.jsx
│ └─ NotFound.jsx
│
├─ routes/
│ └─ AppRouter.jsx
│
├─ lib/
│ └─ supabase.js
│
├─ components/
│ └─ Layout.jsx
│
├─ main.jsx
└─ App.jsx

This mirrors real production apps.

🔹 Step 3: Setup React Router
src/routes/AppRouter.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../features/auth/ProtectedRoute";

const router = createBrowserRouter([
{
path: "/",
element: <Layout />,
errorElement: <NotFound />,
children: [
{ path: "login", element: <Login /> },
{ path: "register", element: <Register /> },
{
path: "dashboard",
element: (
<ProtectedRoute>
<Dashboard />
</ProtectedRoute>
),
},
],
},
]);

export default function AppRouter() {
return <RouterProvider router={router} />;
}

🔹 Step 4: Layout Component
src/components/Layout.jsx
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
return (
<>

<nav>
<Link to="/dashboard">Dashboard</Link>{" | "}
<Link to="/login">Login</Link>
</nav>

      <main>
        <Outlet />
      </main>
    </>

);
}

🔹 Step 5: Placeholder Pages

Create simple placeholders so routing works.

Example: src/pages/Login.jsx
export default function Login() {
return <h1>Login</h1>;
}

Do the same for:

Register.jsx

Dashboard.jsx

NotFound.jsx

🔹 Step 6: Wire Router into the App
src/App.jsx
import AppRouter from "./routes/AppRouter";

export default function App() {
return <AppRouter />;
}

🔹 Step 7: Update main.jsx

We’ll prepare for Redux + React Query (logic comes next).

src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { store } from "./app/store";
import { queryClient } from "./app/queryClient";

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
<Provider store={store}>
<QueryClientProvider client={queryClient}>
<App />
</QueryClientProvider>
</Provider>
</React.StrictMode>
);

(We’ll create store.js and queryClient.js next.)

✅ Your task now

Create the folder structure

Add router, layout, and placeholder pages

Confirm you can navigate:

/login

/register

/dashboard (will be protected later)

Reply “ready” once it works.

Next step 👉 Redux Toolkit setup + auth slice 🧠

🔹 Step 4: Redux Toolkit Setup + Auth Slice

We’ll do minimal Redux now, just enough to support auth correctly.

1️⃣ Create the Redux Store
src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
reducer: {
auth: authReducer,
},
});

2️⃣ Create Auth Slice
src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
user: null,
status: "idle", // idle | loading | authenticated
};

const authSlice = createSlice({
name: "auth",
initialState,
reducers: {
setUser(state, action) {
state.user = action.payload;
state.status = action.payload ? "authenticated" : "idle";
},
logout(state) {
state.user = null;
state.status = "idle";
},
},
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

This slice only tracks client auth state.
Supabase remains the source of truth.

3️⃣ Create Query Client
src/app/queryClient.js
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
defaultOptions: {
queries: {
retry: 1,
refetchOnWindowFocus: false,
},
},
});

4️⃣ Protected Route Logic
src/features/auth/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
const { user } = useSelector((state) => state.auth);

if (!user) {
return <Navigate to="/login" replace />;
}

return children;
}

This will work once we wire Supabase auth → Redux.

5️⃣ Quick Sanity Check

At this point:

App should still run

/login and /register are accessible

/dashboard redirects to /login

(There’s no user yet, so redirect is expected.)

🧠 Important Concept (remember this)

Supabase = server auth truth

Redux = client auth state

React Query = server data (habits)

This separation is huge for clean architecture.

✅ Your task now

Add store.js, authSlice.js, queryClient.js

Add ProtectedRoute.jsx

Confirm /dashboard redirects to /login

Reply “confirmed” when it works.

Next step 👉 Supabase setup + real authentication (login/register) 🔐

Perfect. Now we make this app real.

🔐 Step 5: Supabase Setup + Real Authentication

This is where everything clicks:
Supabase auth → Redux → protected routes

1️⃣ Create Supabase Project

Go to Supabase Dashboard

Create a new project

Save:

Project URL

Anon public key

2️⃣ Configure Supabase Client
src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

3️⃣ Add Environment Variables
.env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

Restart the dev server after this.

4️⃣ Wire Supabase Auth → Redux (CRITICAL)

We need to:

Restore session on refresh

Listen for auth changes

src/App.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "./lib/supabase";
import { setUser, logout } from "./features/auth/authSlice";
import AppRouter from "./routes/AppRouter";

export default function App() {
const dispatch = useDispatch();

useEffect(() => {
// Restore session
supabase.auth.getSession().then(({ data }) => {
dispatch(setUser(data.session?.user ?? null));
});

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        dispatch(setUser(session?.user ?? null));
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };

}, [dispatch]);

return <AppRouter />;
}

This is production-grade auth handling.

5️⃣ Login Page (Real Auth)
src/pages/Login.jsx
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);

const handleLogin = async (e) => {
e.preventDefault();
setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
    else navigate("/dashboard");

};

return (

<form onSubmit={handleLogin}>
<h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>

      {error && <p>{error}</p>}
    </form>

);
}

6️⃣ Register Page
src/pages/Register.jsx
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Register() {
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);

const handleRegister = async (e) => {
e.preventDefault();
setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) setError(error.message);
    else navigate("/dashboard");

};

return (

<form onSubmit={handleRegister}>
<h1>Register</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Register</button>

      {error && <p>{error}</p>}
    </form>

);
}

7️⃣ Add Logout (Dashboard)
src/pages/Dashboard.jsx
import { supabase } from "../lib/supabase";

export default function Dashboard() {
return (
<>

<h1>Dashboard</h1>
<button onClick={() => supabase.auth.signOut()}>
Logout
</button>
</>
);
}

✅ What should work now

✅ Register a new user

✅ Login

✅ Page refresh keeps you logged in

✅ /dashboard is protected

✅ Logout redirects back to login

This is real authentication, not tutorial fluff.

🧠 Important takeaway

You just implemented:

Persistent auth

Auth listeners

Redux + Supabase sync

Protected routing

This is senior-level React knowledge.

✅ Your task

Create Supabase project

Add env vars

Test login / register / logout

Reply “auth works” when done.

Next 👉 Habits database schema + React Query CRUD 📊
