import React, {
  useState
} from "react";

import { API } from "../App";


function CandidateForm({
  onClose,
  onCreated
}) {

  const [form, setForm] =
    useState({

      name: "",

      email: "",

      role: "",

      experience: 0,

      skills: "",

      requiredSkills: ""

    });


  const [loading, setLoading] =
    useState(false);


  function handleChange(event) {

    setForm({

      ...form,

      [event.target.name]:
        event.target.value

    });

  }


  // =================================
  // POST → BACKEND
  // =================================

  async function handleSubmit(
    event
  ) {

    event.preventDefault();

    setLoading(true);


    const skills =
      form.skills
        .split(",")
        .map(
          skill => skill.trim()
        )
        .filter(Boolean);


    const requiredSkills =
      form.requiredSkills
        .split(",")
        .map(
          skill => skill.trim()
        )
        .filter(Boolean);


    try {

      const response =
        await fetch(
          `${API}/candidates`,
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

              name:
                form.name,

              email:
                form.email,

              role:
                form.role,

              experience:
                form.experience,

              skills,

              requiredSkills

            })

          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          "Failed to add candidate"
        );

        return;

      }


      console.log(
        "Candidate created:",
        data
      );


      onCreated(data);

    }

    catch (error) {

      console.error(
        "POST Error:",
        error
      );


      alert(
        "Backend server is not running."
      );

    }

    finally {

      setLoading(false);

    }

  }


  return (

    <div className="overlay">

      <div className="modal">


        <div className="modalHead">

          <div>

            <h2>
              Add Candidate
            </h2>

            <p>
              Add candidate details
              and required skills.
            </p>

          </div>


          <button
            className="close"
            onClick={onClose}
          >
            ×
          </button>

        </div>


        <form
          onSubmit={handleSubmit}
        >


          <label>

            Name

            <input

              name="name"

              value={form.name}

              onChange={handleChange}

              placeholder=
                "Rahul Sharma"

              required

            />

          </label>


          <label>

            Email

            <input

              type="email"

              name="email"

              value={form.email}

              onChange={handleChange}

              placeholder=
                "rahul@gmail.com"

              required

            />

          </label>


          <label>

            Role

            <input

              name="role"

              value={form.role}

              onChange={handleChange}

              placeholder=
                "Full Stack Developer"

              required

            />

          </label>


          <label>

            Experience

            <input

              type="number"

              name="experience"

              min="0"

              value={
                form.experience
              }

              onChange={
                handleChange
              }

            />

          </label>


          <label>

            Candidate Skills

            <input

              name="skills"

              value={
                form.skills
              }

              onChange={
                handleChange
              }

              placeholder=
                "React, Node.js, JavaScript"

              required

            />

            <small>
              Example: React, Node.js,
              MongoDB
            </small>

          </label>


          <label>

            Required Job Skills

            <input

              name="requiredSkills"

              value={
                form.requiredSkills
              }

              onChange={
                handleChange
              }

              placeholder=
                "React, Node.js, MongoDB, Express"

            />

            <small>
              These skills are used
              for AI match score.
            </small>

          </label>


          <div className="formActions">

            <button
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>


            <button
              type="submit"
              className="primary"
              disabled={loading}
            >

              {loading
                ? "Adding..."
                : "Add Candidate"}

            </button>

          </div>


        </form>

      </div>

    </div>

  );

}


export default CandidateForm;