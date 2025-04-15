document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.querySelector(".todo-form");
    const todoInput = document.querySelector(".todo-input");
    const todoSubmit = document.querySelector(".todo-submit");
    const todoList = document.querySelector(".todo-list");
    let editMode = false;
    let editItem = null;

    todoForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const todoText = todoInput.value.trim();

        if(todoText !== "") {
            if(editMode) {
                editItem.firstChild.textContent = todoText;
                todoSubmit.innerText = "Add Todo";
                editMode = false;
                editItem = null;
                todoInput.value = "";
            }
            else {
                addTodoItem(todoText);
                todoInput.value = "";
            }
        } else {
            alert("please enter a valid task");
        }
    });

    todoList.addEventListener("click", function(event){
        const target = event.target;

        if(target.tagName === "BUTTON") {
            const todoItem = target.parentNode;
            if(target.innerText === `✏️`) {
                editMode = true;
                editItem = todoItem;
                todoSubmit.innerText = "Edit Todo";
                todoInput.value = todoItem.firstChild.textContent;
                todoInput.focus();
            } else if(target.innerText === `❌`) {
                todoItem.remove();
            }
        }
    })

    function addTodoItem(todoText) {
        const todoItem = document.createElement("li");
        todoItem.innerHTML = `<span>${todoText}</span>`;
        
        const editButton = document.createElement("button");
        editButton.textContent = "✏️";

        const removeButton = document.createElement("button");
        removeButton.textContent = "❌";

        todoItem.appendChild(editButton);
        todoItem.appendChild(removeButton);

        todoList.appendChild(todoItem);
    }
})