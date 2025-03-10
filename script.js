// Selecting elements
const addNoteBtn = document.getElementById("addNote");
const notesContainer = document.getElementById("notesContainer");
const searchInput = document.getElementById("search");
const toggleThemeBtn = document.getElementById("toggleTheme");
let notes = JSON.parse(localStorage.getItem("notes")) || [];


