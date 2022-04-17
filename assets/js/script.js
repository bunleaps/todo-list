let form = document.getElementById("form");
let description = document.getElementById("input");
let task = document.getElementById("task");
let due_date = document.getElementById("due_date");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("button clicked");

  formValidation();
});

let formValidation = () => {
  if (task.value === "") {
    msg.innerHTML = `<span>Task cannot be "blank"!</span>`;
    console.log("failure");
  } else {
    console.log("successs");
    acceptData();

    clearPost();
  }
};

let data = [];

let acceptData = () => {
  data.push({
    task: task.value,
    due_date: due_date.value,
    description: input.value,
  });

  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);

  createPost();
};

let createPost = () => {
  posts.innerHTML = "";
  data.map((x, y) => {
    return (posts.innerHTML += `
    <div id=${y}>
        <h3>${x.task}</h3>
        <span>${x.due_date}</span>
        <p>${x.description}</p>
        <span class="options">
            <i onClick="editPost(this)" class="fas fa-edit"></i>
            <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
        </span>
    </div>
    `);
  });

  clearValue();
};

let deletePost = (e) => {
  e.parentElement.parentElement.remove();

  data.splice(e.parentElement.parentElement.id, 1);

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
};

let editPost = (e) => {
    let selectedTask = e.parentElement.parentElement;

    task.value = selectedTask.children[0].innerHTML;
    due_date.value = selectedTask.children[1].innerHTML;
    description.value = selectedTask.children[2].innerHTML;

    deletePost(e);
};

let clearPost = () => {
  task.innerHTML = "";
  due_date.innerHTML = "";
  description.innerHTML = "";
};

let clearValue = () => {
  task.value = "";
  due_date.value = "";
  description.value = "";
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createPost();
  })();