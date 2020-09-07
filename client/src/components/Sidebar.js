import React from "react";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h3>Shopping Categories</h3>
      <button
        className="sidebar-close-button"
        onClick={() => {
          document.querySelector(".sidebar").classList.remove("open");
        }}
      >
        X
      </button>
      <ul>
        <li>
          <a href="/categories/toys">Toys</a>
        </li>
        <li>
          <a href="/categories/food">Food</a>
        </li>
        <li>
          <a href="/categories/miscellaneous">Miscellaneous</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
