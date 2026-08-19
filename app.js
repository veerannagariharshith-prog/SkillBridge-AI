const roles = {
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Git"],
  "Full Stack Developer": ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB", "Git"],
  "Python Developer": ["Python", "SQL", "Git", "REST API", "Django"],
  "Data Analyst": ["Python", "SQL", "Excel", "Statistics", "Power BI"]
};

const normalize = s => s.trim().toLowerCase();

document.getElementById("analyzeBtn").addEventListener("click", () => {
  const name = document.getElementById("studentName").value.trim() || "Student";
  const role = document.getElementById("role").value;
  const input = document.getElementById("skills").value;
  const skills = input.split(",").map(normalize).filter(Boolean);
  const required = roles[role];

  const matched = required.filter(r => skills.includes(normalize(r)));
  const missing = required.filter(r => !skills.includes(normalize(r)));
  const percentage = Math.round((matched.length / required.length) * 100);

  document.getElementById("resultTitle").textContent = `${name} • ${role}`;
  document.getElementById("score").textContent = `${percentage}%`;
  document.getElementById("heroScore").textContent = `${percentage}%`;
  document.getElementById("progress").style.width = `${percentage}%`;
  document.getElementById("matchedCount").textContent = matched.length;
  document.getElementById("missingCount").textContent = missing.length;

  // Demo job matching: roles are ranked using the same skill comparison.
  const jobMatches = Object.entries(roles).map(([job, req]) => {
    const count = req.filter(r => skills.includes(normalize(r))).length;
    return { job, score: Math.round((count / req.length) * 100) };
  }).filter(x => x.score > 0).sort((a,b) => b.score-a.score);
  document.getElementById("jobCount").textContent = jobMatches.length;

  document.getElementById("matchedSkills").innerHTML =
    matched.length ? matched.map(x => `<span class="chip">${x}</span>`).join("") : "<span>No direct matches yet</span>";

  document.getElementById("missingSkills").innerHTML =
    missing.length ? missing.map(x => `<span class="chip missing">${x}</span>`).join("") : "<span>Great! No skill gaps for this role.</span>";

  document.getElementById("recommendations").innerHTML =
    missing.length
      ? missing.map(x => `<div class="recommendation"><strong>Learn ${x}</strong><br><small>Adding this skill can improve your ${role} readiness.</small></div>`).join("")
      : `<div class="recommendation"><strong>You're ready for the selected role.</strong><br><small>Keep improving through projects and practical experience.</small></div>`;
});
