// Selecting elements
const addNoteBtn = document.getElementById("addNote");
const notesContainer = document.getElementById("notesContainer");
const searchInput = document.getElementById("search");
const toggleThemeBtn = document.getElementById("toggleTheme");
let notes = JSON.parse(localStorage.getItem("notes")) || [];


// Load saved notes on page load
window.onload = function () {
    notes.forEach((note) => createNoteElement(note));
  };
  
  // Function to create note element
  function createNoteElement(note) {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    noteDiv.style.backgroundColor = note.color;
    noteDiv.setAttribute("draggable", "true");
    
    noteDiv.innerHTML = `
      <textarea>${note.content}</textarea>
      <div class="note-footer">
        <input type="color" value="${note.color}" class="color-picker" />
        <button class="delete-note">❌</button>
      </div>
    `;
  
  