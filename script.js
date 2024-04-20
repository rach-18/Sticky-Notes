const note = document.querySelector(".note");
const addNote = document.querySelector(".add-note");
const stickyNotes = document.querySelector(".sticky-notes");
const bgColor = document.querySelector(".note-bg");
const textColor = document.querySelector(".note-text");
const notes = [];

const noNoteDiv = document.createElement("div");
noNoteDiv.classList.add("no-note");
const noNote = document.createElement("p");
noNote.innerHTML = "You have not added a note yet!";
noNoteDiv.appendChild(noNote);
stickyNotes.appendChild(noNoteDiv);


addNote.addEventListener("click", (event) => {
    event.preventDefault();

    if(note.value !== "") {
        const stickyNote = document.createElement("div");
        stickyNote.classList.add("sticky-note");
        stickyNote.style.backgroundColor = bgColor.value;
        
        const crossDiv = document.createElement("div");
        const crossBtn = document.createElement("p");
        crossBtn.classList.add("cross");
        crossBtn.innerHTML = "&times;";
        crossDiv.appendChild(crossBtn);

        const contextDiv = document.createElement("div");
        let context = document.createElement("p");
        context.classList.add("context");
        context.innerHTML = note.value;
        context.style.color = textColor.value;
        contextDiv.appendChild(context);

        const editBtnDiv = document.createElement("div");
        const editBtn = document.createElement("i");
        editBtn.classList.add("fa-solid", "fa-pen-to-square", "edit-btn");
        editBtnDiv.appendChild(editBtn);

        stickyNote.appendChild(crossDiv);
        stickyNote.appendChild(contextDiv);
        stickyNote.appendChild(editBtnDiv);

        stickyNotes.appendChild(stickyNote);

        noNoteDiv.style.display = "none";

        notes.push(note.value);

        note.value = "";

        crossBtn.addEventListener("click", () => {
            stickyNote.remove();

            const index = notes.indexOf(context.innerHTML);

            if (index !== -1) {
                notes.splice(index, 1);
            }

            if(notes.length === 0) {
                noNoteDiv.style.display = "block";
                noNoteDiv.style.marginLeft = "13rem";
            }
        });

        editBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            context.contentEditable = "true";
            context.focus();
        });

        context.addEventListener("mousedown", (event) => {
            if (!event.target.classList.contains("edit-btn")) {
                event.preventDefault();
            }
        });
    }
});
