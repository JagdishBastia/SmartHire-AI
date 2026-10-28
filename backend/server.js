const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

// ===============================
// MIDDLEWARE
// ===============================

// Allow React frontend to connect
app.use(cors());

// Read JSON request body
app.use(express.json());


// ===============================
// TEMPORARY DATABASE
// ===============================

let candidates = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    role: "Frontend Developer",
    experience: 1,
    skills: [
      "React",
      "JavaScript",
      "HTML",
      "CSS"
    ],
    score: 80,
    status: "Shortlisted",
    appliedDate: "2026-10-01"
  },

  {
    id: 2,
    name: "Priya Das",
    email: "priya@gmail.com",
    role: "Full Stack Developer",
    experience: 2,
    skills: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JavaScript"
    ],
    score: 100,
    status: "Applied",
    appliedDate: "2026-10-02"
  },

  {
    id: 3,
    name: "Aman Kumar",
    email: "aman@gmail.com",
    role: "Backend Developer",
    experience: 1,
    skills: [
      "Node.js",
      "Express",
      "JavaScript"
    ],
    score: 60,
    status: "Applied",
    appliedDate: "2026-10-03"
  }
];


// ===============================
// HELPER
// ===============================

function normalize(value) {
  return String(value)
    .trim()
    .toLowerCase();
}


// ===============================
// AI MATCH SCORE
// ===============================

function calculateScore(
  candidateSkills,
  requiredSkills
) {

  if (
    !requiredSkills ||
    requiredSkills.length === 0
  ) {
    return 0;
  }

  const candidateSkillSet =
    candidateSkills.map(normalize);

  let matched = 0;

  requiredSkills.forEach(skill => {

    if (
      candidateSkillSet.includes(
        normalize(skill)
      )
    ) {
      matched++;
    }

  });

  return Math.round(
    (matched / requiredSkills.length) * 100
  );
}


// ===============================
// HEALTH CHECK
// ===============================

app.get("/api/health", (req, res) => {

  res.json({
    success: true,
    message: "SmartHire API is running"
  });

});


// ===============================
// GET ALL CANDIDATES
// ===============================

app.get("/api/candidates", (req, res) => {

  const {
    search = "",
    status = "All"
  } = req.query;

  let result = [...candidates];


  // SEARCH
  if (search) {

    const query =
      normalize(search);

    result = result.filter(candidate => {

      const name =
        normalize(candidate.name)
          .includes(query);

      const role =
        normalize(candidate.role)
          .includes(query);

      const skills =
        candidate.skills.some(skill =>
          normalize(skill)
            .includes(query)
        );

      return name || role || skills;

    });

  }


  // STATUS FILTER
  if (status !== "All") {

    result = result.filter(
      candidate =>
        candidate.status === status
    );

  }


  res.json(result);

});


// ===============================
// GET SINGLE CANDIDATE
// ===============================

app.get(
  "/api/candidates/:id",
  (req, res) => {

    const id =
      Number(req.params.id);

    const candidate =
      candidates.find(
        candidate =>
          candidate.id === id
      );

    if (!candidate) {

      return res.status(404).json({
        message: "Candidate not found"
      });

    }

    res.json(candidate);

  }
);


// ===============================
// ADD CANDIDATE
// ===============================

app.post(
  "/api/candidates",
  (req, res) => {

    const {
      name,
      email,
      role,
      experience,
      skills,
      requiredSkills
    } = req.body;


    if (
      !name ||
      !email ||
      !role ||
      !skills
    ) {

      return res.status(400).json({
        message:
          "Name, email, role and skills are required"
      });

    }


    const score =
      calculateScore(
        skills,
        requiredSkills || []
      );


    const newCandidate = {

      id:
        Date.now(),

      name,

      email,

      role,

      experience:
        Number(experience) || 0,

      skills,

      score,

      status:
        "Applied",

      appliedDate:
        new Date()
          .toISOString()
          .split("T")[0]

    };


    candidates.unshift(
      newCandidate
    );


    res.status(201).json(
      newCandidate
    );

  }
);


// ===============================
// UPDATE CANDIDATE
// ===============================

app.put(
  "/api/candidates/:id",
  (req, res) => {

    const id =
      Number(req.params.id);

    const index =
      candidates.findIndex(
        candidate =>
          candidate.id === id
      );


    if (index === -1) {

      return res.status(404).json({
        message:
          "Candidate not found"
      });

    }


    candidates[index] = {

      ...candidates[index],

      ...req.body,

      id: id

    };


    res.json(
      candidates[index]
    );

  }
);


// ===============================
// UPDATE STATUS
// ===============================

app.patch(
  "/api/candidates/:id/status",
  (req, res) => {

    const id =
      Number(req.params.id);

    const candidate =
      candidates.find(
        candidate =>
          candidate.id === id
      );


    if (!candidate) {

      return res.status(404).json({
        message:
          "Candidate not found"
      });

    }


    const allowedStatuses = [
      "Applied",
      "Shortlisted",
      "Interview",
      "Rejected"
    ];


    if (
      !allowedStatuses.includes(
        req.body.status
      )
    ) {

      return res.status(400).json({
        message:
          "Invalid status"
      });

    }


    candidate.status =
      req.body.status;


    res.json(candidate);

  }
);


// ===============================
// DELETE CANDIDATE
// ===============================

app.delete(
  "/api/candidates/:id",
  (req, res) => {

    const id =
      Number(req.params.id);

    const exists =
      candidates.some(
        candidate =>
          candidate.id === id
      );


    if (!exists) {

      return res.status(404).json({
        message:
          "Candidate not found"
      });

    }


    candidates =
      candidates.filter(
        candidate =>
          candidate.id !== id
      );


    res.json({
      message:
        "Candidate deleted successfully"
    });

  }
);


// ===============================
// DASHBOARD
// ===============================

app.get(
  "/api/dashboard",
  (req, res) => {

    const total =
      candidates.length;


    const shortlisted =
      candidates.filter(
        c =>
          c.status === "Shortlisted"
      ).length;


    const interviews =
      candidates.filter(
        c =>
          c.status === "Interview"
      ).length;


    const rejected =
      candidates.filter(
        c =>
          c.status === "Rejected"
      ).length;


    const averageScore =
      total === 0
        ? 0
        : Math.round(
            candidates.reduce(
              (sum, c) =>
                sum + c.score,
              0
            ) / total
          );


    res.json({

      total,

      shortlisted,

      interviews,

      rejected,

      averageScore

    });

  }
);


// ===============================
// START SERVER
// ===============================

app.listen(
  PORT,
  () => {

    console.log(
      `SmartHire Backend running at http://localhost:${PORT}`
    );

  }
);