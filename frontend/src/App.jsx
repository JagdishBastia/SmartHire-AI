import React, { useState } from "react";

import Dashboard from "./pages/Dashboard";

import Candidates from "./pages/Candidates";


// =================================
// BACKEND CONNECTION
// =================================

export const API =
  "http://localhost:5000/api";


function App() {

  const [page, setPage] =
    useState("dashboard");


  const [refresh, setRefresh] =
    useState(0);


  function refreshDashboard() {

    setRefresh(
      value => value + 1
    );

  }


  return (

    <div className="app">


      {/* NAVBAR */}

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


      {/* PAGE */}

      <main>

        {page === "dashboard" ? (

          <Dashboard

            refresh={refresh}

            goCandidates={() =>
              setPage("candidates")
            }

          />

        ) : (

          <Candidates

            onChange={
              refreshDashboard
            }

          />

        )}

      </main>

    </div>

  );

}


export default App;