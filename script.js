const form = document.getElementById("marksForm");
const result = document.getElementById("result");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const marks = [1, 2, 3, 4, 5].map((number) =>
    Number(document.getElementById(`subject${number}`).value)
  );

  if (!name) {
    showError("Please enter the student's name.");
    return;
  }

  if (marks.some((mark) => !Number.isFinite(mark) || mark < 0 || mark > 100)) {
    showError("Please enter marks between 0 and 100 for every subject.");
    return;
  }

  const total = marks.reduce((sum, mark) => sum + mark, 0);
  const percentage = total / 5;
  const passed = marks.every((mark) => mark >= 35);
  let grade = "F";

  if (passed) {
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else if (percentage >= 50) grade = "D";
    else grade = "E";
  }

  result.hidden = false;
  result.innerHTML = `
    <h2>Result for ${escapeHtml(name)}</h2>
    <div><strong>Total marks:</strong> ${total} / 500</div>
    <div><strong>Percentage:</strong> ${percentage.toFixed(2)}%</div>
    <div><strong>Grade:</strong> ${grade}</div>
    <div><strong>Status:</strong> ${passed ? "Pass" : "Needs improvement"}</div>
  `;
});

form.addEventListener("reset", function () {
  result.hidden = true;
  result.textContent = "";
});

function showError(message) {
  result.hidden = false;
  result.textContent = message;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}
