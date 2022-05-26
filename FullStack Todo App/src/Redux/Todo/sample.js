const todos = [
  {
    title: "Title",
    description: "hello Ashish",
    status: "progress",
    subTasks: [],
    tags: ["Personal", "Official"],
  },
  {
    title: "Title",
    description: "hello Others",
    status: "progress",
    subTasks: [],
    tags: ["Personal", "Others"],
  },
  {
    title: "only Official",
    description: "hello Official",
    status: "progress",
    subTasks: [],
    tags: ["Official"],
  },
];

let Official = todos.filter((td) => td.tags.includes("Personal"));
console.log("Personal:", Official);
