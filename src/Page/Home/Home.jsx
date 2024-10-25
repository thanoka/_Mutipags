import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="content-wrapper">
        <div className="profile-section">
          <img
            src="profile.jpg"
            alt="Instructor"
            className="profile-picture"
          />
          <div className="instructor-details">
            <p><strong>MR. Thannava Auamyam</strong></p>
            <p>Computer Science and Software Development Innovation Department (CSI)</p>
            <p>School of Information Technology (SIT)</p>
            <p>Srinakharinwirot University (SPU)</p>
          </div>
        </div>
        <div className="course-section">

          <p>This course teaches several topics as follows:</p>
          <ul>
            <li><strong>Basic UX/UI</strong>: Review the background basics to design friendly web interfaces.</li>
            <li><strong>Traditional HTML/CSS/JS</strong>: Learn from scratch to build layouts and interact with DOM using JavaScript.</li>
            <li><strong>React Web Application</strong>: Learn React basics, including hooks, components, props, and state.</li>
            <li><strong>Prepare Back End Interfaces</strong>: A glimpse into backend integration.</li>
            <li><strong>Basic DevOps</strong>: Learn about virtual machines, container technology, and version control.</li>
          </ul>
          <p><strong>Yes i enjoy this course!!</strong></p>
        </div>
      </div>
    </div>
  );
}

export default Home;
