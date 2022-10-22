//All the selectors from the HTML file.
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dataInput = document.getElementById("dataInput");
let textarea = document.getElementById("textarea");
let mgs = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

//This code validates the input fields so that users can't submit blank input fields
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Task cannot be blank";

    } else {
        console.log("success");
        msg.innerHTML = "";
        //This code allows the modal to close automatically
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
};
//The acceptData function and the array named data collects data from the input fields. Then pushes it inside a local storage. The acceptData function inside the else statement in the form validation variable has to be invoked to work. 
let data = [];

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });
    
    localStorage.getItem("data", JSON.stringify(data));
    
    console.log(data);
    createTasks();
};
//To create new task we created a function, used template literals to create HTML elemnts and use map to push data collected from inside user template.
let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
        return (tasks.innerHTML += `
        <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>

            <span class="options">
                <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                <i onClick= "deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
        </div>
        `);
    });

    resetForm();
};
//This is the deleteTask function. The first line deletes the HTML element from the screen. The second removes the targetted Task fron the data array and the third line updates local storage with the new data.
let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
};
//The editTask function targets tasks selected to edit. This code also targes the values [task,date,description] of the task we want to edit. It also runs the delete function to remove the selected data from local storage, datat array and HTML element.
let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
};
//Here we created the resetFrom function. This code clears the input fields.
let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};
//This code retrieves data from the local storage. It runs a Immediately invoked function expression.
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
})();
