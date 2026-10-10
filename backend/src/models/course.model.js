let courses = [
  { id: 1, title: "Full Stack Web Development", instructor: "FACE Prep", duration: "12 weeks" },
  { id: 2, title: "Data Structures and Algorithms", instructor: "FACE Prep", duration: "8 weeks" },
];

let nextId = courses.length + 1;

const findAll = () => courses;

const findById = (id) => courses.find((c) => c.id === id);

const create = (data) => {
  const course = { id: nextId++, ...data };
  courses.push(course);
  return course;
};

module.exports = { findAll, findById, create };