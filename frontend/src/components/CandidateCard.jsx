import React from "react";


function CandidateCard({
  candidate,
  onStatusChange,
  onDelete
}) {

  const scoreClass =
    candidate.score >= 80
      ? "high"
      : candidate.score >= 50
      ? "mid"
      : "low";


  return (

    <div className="card">


      <div className="cardTop">

        <div className="avatar">

          {candidate.name
            .charAt(0)
            .toUpperCase()}

        </div>


        <div className="identity">

          <h3>
            {candidate.name}
          </h3>

          <p>
            {candidate.role}
          </p>

        </div>


        <span
          className={
            `badge ${
              candidate.status
                .toLowerCase()
            }`
          }
        >

          {candidate.status}

        </span>

      </div>


      <div className="contact">

        {candidate.email}

        <span>•</span>

        {candidate.experience}
        {" "}years

        <span>•</span>

        {candidate.appliedDate}

      </div>


      <div className="skills">

        {candidate.skills.map(
          (skill, index) => (

            <span key={index}>
              {skill}
            </span>

          )
        )}

      </div>


      {/* AI SCORE */}

      <div className="scoreRow">

        <div>

          <small>
            AI MATCH SCORE
          </small>

          <div className="bar">

            <i
              className={scoreClass}
              style={{
                width:
                  `${candidate.score}%`
              }}
            />

          </div>

        </div>


        <strong>
          {candidate.score}%
        </strong>

      </div>


      {/* ACTIONS */}

      <div className="actions">

        <select

          value={candidate.status}

          onChange={event =>
            onStatusChange(
              candidate.id,
              event.target.value
            )
          }

        >

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


        <button

          className="danger"

          onClick={() =>
            onDelete(
              candidate.id
            )
          }

        >

          Delete

        </button>

      </div>


    </div>

  );

}


export default CandidateCard;