import React, {
  useEffect,
  useState
} from "react";

import { API } from "../App";

import CandidateCard
  from "../components/CandidateCard";

import CandidateForm
  from "../components/CandidateForm";


function Candidates({
  onChange
}) {

  const [candidates, setCandidates] =
    useState([]);


  const [search, setSearch] =
    useState("");


  const [status, setStatus] =
    useState("All");


  const [showForm, setShowForm] =
    useState(false);


  const [loading, setLoading] =
    useState(false);


  // =================================
  // GET CANDIDATES
  // =================================

  async function loadCandidates() {

    try {

      setLoading(true);


      const params =
        new URLSearchParams();


      if (search) {

        params.set(
          "search",
          search
        );

      }


      if (status !== "All") {

        params.set(
          "status",
          status
        );

      }


      const response =
        await fetch(
          `${API}/candidates?${params}`
        );


      if (!response.ok) {

        throw new Error(
          "Failed to fetch candidates"
        );

      }


      const data =
        await response.json();


      setCandidates(data);

    }

    catch (error) {

      console.error(
        "GET Error:",
        error
      );

    }

    finally {

      setLoading(false);

    }

  }


  useEffect(() => {

    loadCandidates();

  }, [search, status]);


  // =================================
  // UPDATE STATUS
  // =================================

  async function changeStatus(
    id,
    newStatus
  ) {

    try {

      const response =
        await fetch(
          `${API}/candidates/${id}/status`,
          {

            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              status: newStatus
            })

          }
        );


      if (!response.ok) {

        throw new Error(
          "Status update failed"
        );

      }


      await response.json();


      loadCandidates();

      onChange();

    }

    catch (error) {

      console.error(
        "PATCH Error:",
        error
      );

    }

  }


  // =================================
  // DELETE
  // =================================

  async function deleteCandidate(id) {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this candidate?"
      );


    if (!confirmDelete) {
      return;
    }


    try {

      const response =
        await fetch(
          `${API}/candidates/${id}`,
          {
            method: "DELETE"
          }
        );


      if (!response.ok) {

        throw new Error(
          "Delete failed"
        );

      }


      await response.json();


      loadCandidates();

      onChange();

    }

    catch (error) {

      console.error(
        "DELETE Error:",
        error
      );

    }

  }


  // =================================
  // AFTER ADD
  // =================================

  function handleCreated() {

    setShowForm(false);

    loadCandidates();

    onChange();

  }


  return (

    <div className="page">


      {/* HEADER */}

      <div className="pageTitle">

        <div>

          <p className="eyebrow">
            TALENT PIPELINE
          </p>

          <h1>
            Candidates
          </h1>

          <p>
            Search, evaluate and manage
            applicants.
          </p>

        </div>


        <button

          className="primary"

          onClick={() =>
            setShowForm(true)
          }

        >

          + Add Candidate

        </button>

      </div>


      {/* SEARCH */}

      <div className="toolbar">

        <input

          type="text"

          placeholder=
            "Search by name, role or skill..."

          value={search}

          onChange={event =>
            setSearch(
              event.target.value
            )
          }

        />


        <select

          value={status}

          onChange={event =>
            setStatus(
              event.target.value
            )
          }

        >

          <option>
            All
          </option>

          <option>
            Applied
          </option>

          <option>
            Shortlisted
          </option>

          <option>
            Interview
          </option>

          <option>
            Rejected
          </option>

        </select>

      </div>


      {/* CANDIDATES */}

      {loading ? (

        <div className="empty">
          Loading candidates...
        </div>

      ) : candidates.length === 0 ? (

        <div className="empty">
          No candidates found.
        </div>

      ) : (

        <div className="grid">

          {candidates.map(
            candidate => (

              <CandidateCard

                key={candidate.id}

                candidate={candidate}

                onStatusChange={
                  changeStatus
                }

                onDelete={
                  deleteCandidate
                }

              />

            )
          )}

        </div>

      )}


      {/* FORM */}

      {showForm && (

        <CandidateForm

          onClose={() =>
            setShowForm(false)
          }

          onCreated={
            handleCreated
          }

        />

      )}

    </div>

  );

}


export default Candidates;