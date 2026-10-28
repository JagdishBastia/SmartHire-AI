import React, {
  useEffect,
  useState
} from "react";

import { API } from "../App";


function Dashboard({
  refresh,
  goCandidates
}) {

  const [stats, setStats] =
    useState(null);


  // =============================
  // FRONTEND → BACKEND
  // =============================

  useEffect(() => {

    fetch(`${API}/dashboard`)

      .then(response =>
        response.json()
      )

      .then(data => {

        setStats(data);

      })

      .catch(error => {

        console.error(
          "Dashboard API Error:",
          error
        );

      });

  }, [refresh]);


  if (!stats) {

    return (
      <div className="page">
        Loading...
      </div>
    );

  }


  return (

    <div className="page">


      <section className="hero">

        <p className="eyebrow">
          SMART RECRUITMENT
        </p>

        <h1>
          Find the right talent faster.
        </h1>

        <p>
          SmartHire AI helps recruiters
          evaluate candidates using
          skill matching and candidate
          scoring.
        </p>

        <button
          className="primary"
          onClick={goCandidates}
        >

          View Candidates

        </button>

      </section>


      <section className="stats">


        <div className="stat">

          <div className="statIcon">
            👥
          </div>

          <div>

            <span>
              Total Candidates
            </span>

            <strong>
              {stats.total}
            </strong>

          </div>

        </div>


        <div className="stat">

          <div className="statIcon">
            ⭐
          </div>

          <div>

            <span>
              Shortlisted
            </span>

            <strong>
              {stats.shortlisted}
            </strong>

          </div>

        </div>


        <div className="stat">

          <div className="statIcon">
            📅
          </div>

          <div>

            <span>
              Interviews
            </span>

            <strong>
              {stats.interviews}
            </strong>

          </div>

        </div>


        <div className="stat">

          <div className="statIcon">
            🧠
          </div>

          <div>

            <span>
              Average AI Score
            </span>

            <strong>
              {stats.averageScore}%
            </strong>

          </div>

        </div>


      </section>


      <section className="info">

        <div>

          <h2>
            How SmartHire AI works
          </h2>

          <p>
            Candidate skills are compared
            with job requirements to
            calculate an AI match score.
          </p>

        </div>


        <div className="formula">

          <span>
            Matched Skills
          </span>

          <strong>÷</strong>

          <span>
            Required Skills
          </span>

          <strong>× 100</strong>

        </div>

      </section>


    </div>

  );

}


export default Dashboard;