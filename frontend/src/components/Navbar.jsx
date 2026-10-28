import React from "react";

function Navbar({
  page,
  setPage
}) {

  return (

    <header className="navbar">

      <div className="brand">

        <div className="logo">
          S
        </div>

        <div>

          <b>
            SmartHire
          </b>

          <small>
            AI Recruitment
          </small>

        </div>

      </div>


      <nav>

        <button

          className={
            page === "dashboard"
              ? "active"
              : ""
          }

          onClick={() =>
            setPage("dashboard")
          }

        >

          Dashboard

        </button>


        <button

          className={
            page === "candidates"
              ? "active"
              : ""
          }

          onClick={() =>
            setPage("candidates")
          }

        >

          Candidates

        </button>

      </nav>

    </header>

  );

}


export default Navbar;