import { useState } from "react";
import "./App.css"; // Make sure to import the CSS file

export default function App() {
  return (
    <>
      <FlashCards />
    </>
  );
}
// array
const questions = [
  {
    id: 1,
    question: "What is React?",
    answer:
      "React is a JavaScript library for building user interfaces. It allows developers to build reusable UI components and manage the state of an application efficiently. React uses a virtual DOM to improve performance and update the real DOM only when necessary.",
  },
  {
    id: 2,
    question: "What are components in React?",
    answer:
      "Components are the building blocks of a React application. They are self-contained, reusable pieces of code that define a part of the UI. Components can be functional or class-based and can manage their own state and lifecycle.",
  },
  {
    id: 3,
    question: "What is JSX?",
    answer:
      "JSX (JavaScript XML) is a syntax extension for JavaScript used in React. It allows you to write HTML-like code inside JavaScript, making it easier to create UI elements. JSX gets transpiled to React.createElement calls by a compiler like Babel.",
  },
  {
    id: 4,
    question: "What is the difference between state and props in React?",
    answer:
      "State is used to manage data that can change over time within a component. Props (short for properties) are used to pass data from parent components to child components. While state is local to a component, props are immutable and come from the outside.",
  },
  {
    id: 5,
    question: "What is the virtual DOM?",
    answer:
      "The virtual DOM is an in-memory representation of the real DOM. React uses it to make updates more efficient by first making changes to the virtual DOM and then determining the minimal number of changes needed to update the real DOM.",
  },
  {
    id: 6,
    question: "What is a higher-order component (HOC)?",
    answer:
      "A higher-order component (HOC) is a function that takes a component and returns a new component with enhanced behavior. HOCs are used for reusing component logic, such as adding authentication or data-fetching capabilities.",
  },
  {
    id: 7,
    question: "What is the useState hook?",
    answer:
      "The useState hook is a React hook that allows functional components to manage local state. It returns an array with two elements: the current state value and a function to update that value.",
  },
  {
    id: 8,
    question: "What is the useEffect hook?",
    answer:
      "The useEffect hook is used to perform side effects in functional components, such as data fetching, DOM manipulation, or setting up subscriptions. It runs after the render and can be configured to run only on certain conditions (e.g., when specific state or props change).",
  },
  {
    id: 9,
    question: "What are controlled components in React?",
    answer:
      "A controlled component is an input element whose value is controlled by React state. The state is updated via the onChange event handler, making React the 'single source of truth' for the input's value.",
  },
  {
    id: 10,
    question: "What is Redux?",
    answer:
      "Redux is a state management library for JavaScript applications. It provides a single store that holds the state of the entire app, and allows state updates through actions and reducers. It is often used with React to manage complex state in large applications.",
  },
];

function FlashCards() {
  const [selectedId, setSelectedId] = useState(null);

  function handleClick(id) {
    setSelectedId(id !== selectedId ? id : null); // Toggle selection
  }

  return (
    <div className="flashcards-container">
      {questions.map((q) => (
        <div
          key={q.id}
          onClick={() => handleClick(q.id)}
          className={q.id === selectedId ? "selected" : ""}
        >
          <p>{q.id === selectedId ? q.answer : q.question}</p>
        </div>
      ))}
    </div>
  );
}
