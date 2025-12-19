const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const DATA_PATH = path.join(__dirname, "data.json");

// File helpers
function readData() {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, "[]", "utf-8");
  }
  const raw = fs.readFileSync(DATA_PATH, "utf-8").trim();
  return raw ? JSON.parse(raw) : [];
}

function writeData(list) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(list, null, 2), "utf-8");
}

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

// Health check
app.get("/", (req, res) => {
  res.json({
    ok: true,
    service: "GEvidence MVP API",
    endpoints: ["/projects"],
  });
});

// GET /projects
app.get("/projects", (req, res) => {
  const projects = readData();
  res.json(projects);
});

// POST /projects 
app.post("/projects", (req, res) => {
  const body = req.body || {};

  if (!isNonEmptyString(body.name)) {
    return res.status(400).json({ error: "Field 'name' (string) is required." });
  }

  const projects = readData();
  const now = new Date().toISOString();

  const newProject = {
    id: uuidv4(),
    name: body.name.trim(),
    description: typeof body.description === "string" ? body.description : "",
    owner: body.owner && typeof body.owner === "object" ? body.owner : undefined,
    site: body.site && typeof body.site === "object" ? body.site : undefined,
    sector: typeof body.sector === "string" ? body.sector : "Unknown",
    status: typeof body.status === "string" ? body.status : "draft",
    methodology: body.methodology && typeof body.methodology === "object" ? body.methodology : undefined,
    iot: body.iot && typeof body.iot === "object" ? body.iot : undefined,
    metrics: body.metrics && typeof body.metrics === "object" ? body.metrics : undefined,
    evidence: body.evidence && typeof body.evidence === "object" ? body.evidence : undefined,
    createdAt: now,
    updatedAt: now,
  };

  projects.push(newProject);
  writeData(projects);

  res.status(201).json(newProject);
});

// PUT /projects/:id 
app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body || {};

  const projects = readData();
  const idx = projects.findIndex((p) => p.id === id);

  if (idx === -1) {
    return res.status(404).json({ error: "Project not found." });
  }

  // If "name" is provided, validate it
  if (updates.name !== undefined) {
    if (!isNonEmptyString(updates.name)) {
      return res.status(400).json({ error: "Field 'name' must be a non-empty string." });
    }
    projects[idx].name = updates.name.trim();
  }

  const allowedFields = [
    "description",
    "owner",
    "site",
    "sector",
    "status",
    "methodology",
    "iot",
    "metrics",
    "evidence",
  ];

  for (const key of allowedFields) {
    if (updates[key] !== undefined) {
      projects[idx][key] = updates[key];
    }
  }

  projects[idx].updatedAt = new Date().toISOString();

  writeData(projects);
  res.json(projects[idx]);
});

// DELETE /projects/:id
app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  const projects = readData();
  const idx = projects.findIndex((p) => p.id === id);

  if (idx === -1) {
    return res.status(404).json({ error: "Project not found." });
  }

  projects.splice(idx, 1);
  writeData(projects);

  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`GEvidence API running on http://localhost:${PORT}`);
});
