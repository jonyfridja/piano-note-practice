import {
  G_SCALE_NOTES,
  F_SCALE_NOTES,
  G_SCALE_PX_FROM_TOP_MAP,
  F_SCALE_PX_FROM_TOP_MAP,
} from "./consts.js";

let note = "A2";
let scale = "G";

function getNotesByScale(scale) {
  return scale === "G" ? G_SCALE_NOTES : F_SCALE_NOTES;
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("note-form")
    .addEventListener("submit", handleFormSubmit);
  document.getElementById("refresh").addEventListener("click", () => next());

  next();
});

/**
 * @param {SubmitEvent} e
 */
function handleFormSubmit(e) {
  e.preventDefault();

  const noteInput = document.getElementById("noteInput");
  const isRight = note.includes(noteInput.value);
  const message = isRight ? "Correct!" : "Wrong!";
  const outputMessageEl = document.getElementById("output-message");
  outputMessageEl.innerText = message;
  outputMessageEl.classList.remove("lose");
  if (!isRight) {
    outputMessageEl.classList.add("lose");
  }

  outputMessageEl.innerText = message;
  outputMessageEl.classList.add("show");

  setTimeout(() => {
    outputMessageEl.classList.remove("show");
    next();
  }, 1000);
}

function generateNote() {
  const notes = getNotesByScale(scale);
  note = notes[Math.floor(Math.random() * notes.length)];
}

function randomizeScale() {
  scale = Math.random() > 0.5 ? "G" : "F";
}

function render() {
  const isGScale = scale === "G";
  const pxMap = isGScale ? G_SCALE_PX_FROM_TOP_MAP : F_SCALE_PX_FROM_TOP_MAP;
  const px = pxMap[note];

  document.getElementById("note-line").classList.remove("show");
  let displayLine = false;
  if (isGScale) {
    displayLine = note === "C" || note === "A2";
  }

  if (!isGScale) {
    displayLine = note === "E" || note === "C2";
  }

  if (displayLine) {
    document.getElementById("note-line").classList.add("show");
  }

  document.getElementById(
    "hint"
  ).innerText = `Hint: note: ${note}. scale: ${scale}`;
  document.getElementById("note").style.top = `${px}px`;
}

function next() {
  document.getElementById("noteInput").value = "";
  generateNote();
  randomizeScale();
  render();
}
