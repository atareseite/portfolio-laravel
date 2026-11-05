/*
  Skills data.
  Each object mirrors a database record, so this section is easy to
  convert into a Laravel CRUD later (name, category, level, icon, order).
*/
const skills = [
  { id: 1,  name: "HTML",       category: "Frontend", level: 90, icon: "HT", order: 1 },
  { id: 2,  name: "CSS",        category: "Frontend", level: 85, icon: "CS", order: 2 },
  { id: 3,  name: "JavaScript", category: "Frontend", level: 75, icon: "JS", order: 3 },
  { id: 4,  name: "Tailwind CSS", category: "Frontend", level: 65, icon: "TW", order: 4 },
  { id: 5,  name: "React",      category: "Frontend", level: 55, icon: "Re", order: 5 },
  { id: 6,  name: "PHP",        category: "Backend",  level: 70, icon: "PH", order: 6 },
  { id: 7,  name: "Laravel",    category: "Backend",  level: 55, icon: "La", order: 7 },
  { id: 8,  name: "MySQL",      category: "Backend",  level: 70, icon: "SQ", order: 8 },
  { id: 9,  name: "Git and GitHub", category: "Tools", level: 70, icon: "Gt", order: 9 },
  { id: 10, name: "VS Code",    category: "Tools",    level: 85, icon: "VS", order: 10 }
];