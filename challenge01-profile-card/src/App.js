import React from "react";
import "./App.css";
import profileImage from "./profile.jpeg";

function Card() {
  return (
    <div className="card">
      <img
        src={profileImage}
        style={{ width: "250px", height: "250px" }}
        alt="Profile"
        className="img"
      />

      <h2 className="name">Asif Ali</h2>

      <p className="bio">Front-End Web Developer and Learn React at Udemy.</p>

      <div className="tags">
        <span className="tag blue">HTML+CSS</span>
        <span className="tag yellow">JavaScript</span>
        <span className="tag orange">JQuery</span>
        <span className="tag green">Web Design</span>
        <span className="tag red">Git and GitHub</span>
        <span className="tag cyan">React</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f0f0f0",
      }}
    >
      <Card />
    </div>
  );
}

export default App;
