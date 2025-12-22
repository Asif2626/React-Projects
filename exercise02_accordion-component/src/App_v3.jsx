import { useState } from "react";
import "./index.css";
// question
const faqs = [
  {
    title: "What is React?",
    text: "React is a JavaScript library for building user interfaces. It allows developers to build reusable UI components and manage the state of an application efficiently. React uses a virtual DOM to improve performance and update the real DOM only when necessary.",
  },
  {
    title: "What are components in React?",
    text: "Components are the building blocks of a React application. They are self-contained, reusable pieces of code that define a part of the UI. Components can be functional or class-based and can manage their own state and lifecycle.",
  },
  {
    title: "What is JSX?",
    text: "JSX (JavaScript XML) is a syntax extension for JavaScript used in React. It allows you to write HTML-like code inside JavaScript, making it easier to create UI elements. JSX gets transpiled to React.createElement calls by a compiler like Babel.",
  },
  {
    title: "What is the difference between state and props in React?",
    text: "State is used to manage data that can change over time within a component. Props (short for properties) are used to pass data from parent components to child components. While state is local to a component, props are immutable and come from the outside.",
  },
  {
    title: "What is the virtual DOM?",
    text: "The virtual DOM is an in-memory representation of the real DOM. React uses it to make updates more efficient by first making changes to the virtual DOM and then determining the minimal number of changes needed to update the real DOM.",
  },
  {
    title: "What is a higher-order component (HOC)?",
    text: "A higher-order component (HOC) is a function that takes a component and returns a new component with enhanced behavior. HOCs are used for reusing component logic, such as adding authentication or data-fetching capabilities.",
  },
  {
    title: "What is the useState hook?",
    text: "The useState hook is a React hook that allows functional components to manage local state. It returns an array with two elements: the current state value and a function to update that value.",
  },
  {
    title: "What is the useEffect hook?",
    text: "The useEffect hook is used to perform side effects in functional components, such as data fetching, DOM manipulation, or setting up subscriptions. It runs after the render and can be configured to run only on certain conditions (e.g., when specific state or props change).",
  },
  {
    title: "What are controlled components in React?",
    text: "A controlled component is an input element whose value is controlled by React state. The state is updated via the onChange event handler, making React the 'single source of truth' for the input's value.",
  },
  {
    title: "What is Redux?",
    text: "Redux is a state management library for JavaScript applications. It provides a single store that holds the state of the entire app, and allows state updates through actions and reducers. It is often used with React to manage complex state in large applications.",
  },
];

function App_v3() {
  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
}
export default App_v3;

function Accordion({ data }) {
  return (
    <div className="accordion">
      {data.map((el, i) => (
        <AccordionItem title={el.title} text={el.text} num={i} key={i} />
      ))}
    </div>
  );
}

function AccordionItem({ num, title, text }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`item ${isOpen ? "open" : ""}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="header">
        <span className="number">{num + 1}</span>
        <span className="text">{title}</span>
        <span className="icon">{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}
