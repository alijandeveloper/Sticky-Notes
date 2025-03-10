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
  noteDiv.setAttribute("data-id", note.id);

  noteDiv.innerHTML = `
    <textarea>${note.content}</textarea>
    <div class="note-footer">
      <input type="color" value="${note.color}" class="color-picker" />
      <button class="delete-note">❌</button>
    </div>
  `;

  // Delete note event
  noteDiv.querySelector(".delete-note").addEventListener("click", () => {
    notes = notes.filter((n) => n.id !== note.id);
    localStorage.setItem("notes", JSON.stringify(notes));
    noteDiv.remove();
  });

  // Edit note event
  noteDiv.querySelector("textarea").addEventListener("input", (e) => {
    note.content = e.target.value;
    localStorage.setItem("notes", JSON.stringify(notes));
    highlightSearchTerm(); // Highlight search term in real-time
  });

  // Color change event
  noteDiv.querySelector(".color-picker").addEventListener("input", (e) => {
    note.color = e.target.value;
    noteDiv.style.backgroundColor = e.target.value;
    localStorage.setItem("notes", JSON.stringify(notes));
  });

  notesContainer.appendChild(noteDiv);
}

// Add new note
addNoteBtn.addEventListener("click", () => {
  const newNote = {
    id: Date.now(),
    content: "",
    color: "#fffa65",
  };
  notes.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notes));
  createNoteElement(newNote);
});

// Search Notes (with real-time highlighting)
function highlightSearchTerm() {
  const searchTerm = searchInput.value.toLowerCase();
  document.querySelectorAll(".note").forEach((note) => {
    const textArea = note.querySelector("textarea");
    if (textArea.value.toLowerCase().includes(searchTerm)) {
      note.style.display = "block";
      textArea.style.border = "2px solid #3498db"; // Highlight matching notes
    } else {
      note.style.display = "none";
      textArea.style.border = "none";
    }
  });
}

searchInput.addEventListener("input", highlightSearchTerm);

// Toggle Dark Mode
toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Apply Dark Mode from local storage
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}

// Drag and Drop Feature
document.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("note")) {
    e.dataTransfer.setData("text/plain", e.target.dataset.id);
  }
});

document.addEventListener("dragover", (e) => {
  e.preventDefault();
});

document.addEventListener("drop", (e) => {
  e.preventDefault();
  const draggedId = e.dataTransfer.getData("text/plain");
  const draggedElement = document.querySelector(`[data-id="${draggedId}"]`);
  if (draggedElement) {
    notesContainer.appendChild(draggedElement);
  }
});
