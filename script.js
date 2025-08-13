let currentLesson = 0;
const lessonContent = document.getElementById("lesson-content");
const dialogueContent = document.getElementById("dialogue-content");
const userResponse = document.getElementById("user-response");
const feedback = document.getElementById("feedback");

function loadLesson(index) {
  const lesson = lessons[index];
  lessonContent.innerHTML = `
    <strong>Level:</strong> ${lesson.level}<br>
    <strong>Grammar:</strong> ${lesson.grammar}<br>
    <strong>Words:</strong> ${lesson.words.join(", ")}
  `;
  dialogueContent.innerHTML = lesson.dialogue[0].q;
  feedback.textContent = "";
  userResponse.value = "";
}

document.getElementById("next-lesson").addEventListener("click", () => {
  currentLesson = (currentLesson + 1) % lessons.length;
  loadLesson(currentLesson);
});

document.getElementById("check-response").addEventListener("click", () => {
  const lesson = lessons[currentLesson];
  const correctAnswer = lesson.dialogue[0].a.toLowerCase();
  if (userResponse.value.toLowerCase().trim() === correctAnswer) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = `❌ Wrong. Correct answer: "${lesson.dialogue[0].a}"`;
    feedback.style.color = "red";
  }
});

window.addEventListener("load", () => {
  loadLesson(currentLesson);
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
  }
});

