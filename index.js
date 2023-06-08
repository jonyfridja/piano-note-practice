let note = "E";
const notes = ["C", "D", "E", "F", "G", "A", "B"];
const PX_HEIGHT = 17;
const PX_BASE = 114;

document.addEventListener("DOMContentLoaded", function () {
  console.log("load");
  document
    .getElementById("note-form")
    .addEventListener("submit", handleFormSubmit);
  //

  generateNote();
  render();
});

/**
 * @param {SubmitEvent} e
 */
function handleFormSubmit(e) {
  e.preventDefault();

  const noteInput = document.getElementById("noteInput");
  const noteValue = noteInput.value;
  const isRight = noteValue === note;
  const message = isRight ? "Correct!" : "Wrong!";
  const outputMessageEl = document.getElementById("output-message");
  debugger;
  outputMessageEl.innerText = message;
  outputMessageEl.classList.remove("lose");
  if (!isRight) {
    outputMessageEl.classList.add("lose");
  }

  outputMessageEl.innerText = message;
  outputMessageEl.classList.add("show");

  setTimeout(() => {
    outputMessageEl.classList.remove("show");
  }, 1000);
}

function generateNote() {
  note = notes[Math.floor(Math.random() * notes.length)];
}

function render() {
  const displayLine = note === "C";
  document.getElementById("note-line").classList.remove("show");

  if (displayLine) {
    document.getElementById("note-line").classList.add("show");
  }
  const px = PX_BASE - notes.indexOf(note) * PX_HEIGHT;
  //   const px = PX_BASE;
  console.log(px);
  document.getElementById("note").style.top = `${px}px`;
}
