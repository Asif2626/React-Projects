import React from "react";
import "./App.css";
import profileImage from "./profile.jpeg";

const skills = [
  {
    skills: "HTML + CSS",
    level: "Advanced",
    color: "#2662EA",
  },
  {
    skills: "JavaScript",
    level: "Intermediate",
    color: "#EFD81D",
  },
  {
    skills: "React",
    level: "Beginner",
    color: "#61c90cff",
  },
  {
    skills: "JQuery",
    level: "Intermediate",
    color: "#E84F33",
  },
  {
    skills: "Bootstrap",
    level: "Intermediate",
    color: "#60DAFB",
  },
  {
    skills: "Git and GitHub",
    level: "Beginner",
    color: "#FF3B00",
  },
];

function App() {
  return (
    <div className="App">
      <div className="centered-layout">
        <Card />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="card">
      <img src={profileImage} alt="Profile" className="img" />
      <h2 className="name">Asif Ali</h2>
      <p className="bio">
        I have 1 year of experience in web development, including 6 months
        focused on React.js cross-platform applications. I’ve built responsive
        UIs, optimized performance, integrated APIs, and worked on projects
        ranging from task management to logistics. I’m skilled in React concepts
        like component architecture, state management, routing, and reusable
        patterns, and I naturally excel at attention to detail, problem-solving,
        and organizing tasks.
      </p>

      <div className="tags">
        {skills.map((skill) => (
          <span
            key={skill.skills}
            className="tag"
            style={{ backgroundColor: skill.color }}
          >
            {skill.skills}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
