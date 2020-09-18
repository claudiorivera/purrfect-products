import React from "react";
import "./Sidebar.css";

const navLinks = [
  {
    url: "/categories/toys",
    title: "Toys",
  },
  {
    url: "/categories/food",
    title: "Food",
  },
  {
    url: "/categories/miscellaneous",
    title: "Miscellaneous",
  },
];

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
        {navLinks.map((link, index) => (
          <li key={index}>
            <a href={link.url}>{link.title}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
