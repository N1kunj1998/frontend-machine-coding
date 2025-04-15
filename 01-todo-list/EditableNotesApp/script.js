document.addEventListener("DOMContentLoaded", function () {
    const notesForm = document.querySelector(".notes-form");
    const notesTextarea = document.querySelector("#notes-textarea");
    const notesSubmit = document.querySelector(".notes-submit");
    const notesList = document.querySelector(".notes-list");
    let editMode = false;
    let editItem = null;

    notesForm.addEventListener("submit", function  (event) {
        event.preventDefault();
        const notesText = notesTextarea.value.trim();

        if(notesText !== "") {
            addNotesItem(notesText);
            notesTextarea.value = "";
        } else {
            alert("empty notes is not valid");
        }
    });

    notesList.addEventListener("click", function(event) {
        const target = event.target;

        if(target.tagName === "BUTTON") {
            const noteItem = target.parentNode;

            if(target.innerText === "✏️") {
                editMode = true;
                editItem = noteItem;
                console.log("this works")
                notesSubmit.innerText = "Edit Note";
                notesTextarea.value = noteItem.lastChild.textContent;
                notesTextarea.focus();
            } else if (target.innerText === "❌") {
                noteItem.remove();
            }
        }
    })


    function addNotesItem(notesText) {
        const notesItem = document.createElement("li");
        notesItem.innerHTML = `<span>${notesText}</span>`;

        const notesHeading = document.createElement("h2");
        notesHeading.innerText = `🗓️Note #${notesList.childNodes.length+1}`;

        const editButton = document.createElement("button");
        editButton.innerText = "✏️";

        const removeButton = document.createElement("button");
        removeButton.innerText = "❌";
        
        notesItem.prepend(notesHeading);
        notesList.appendChild(notesItem);
        notesList.prepend(removeButton);
        notesList.prepend(editButton);
    }
})