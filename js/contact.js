const form = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");

function setError(id, message) {
  const el = document.getElementById(id);
  if (el) el.textContent = message;
}

function clearErrors() {
  ["nameError", "emailError", "topicError", "messageError", "agreeError"].forEach(id => setError(id, ""));
  feedback.textContent = "";
  feedback.classList.remove("success", "fail");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const topic = document.getElementById("topic").value;
    const message = document.getElementById("message").value.trim();
    const agree = document.getElementById("agree").checked;

    let hasError = false;

    if (fullName.length < 3) {
      setError("nameError", "Please enter your full name (at least 3 characters).");
      hasError = true;
    }

    if (!isValidEmail(email)) {
      setError("emailError", "Please enter a valid email address (e.g., name@example.com).");
      hasError = true;
    }

    if (!topic) {
      setError("topicError", "Please select a topic.");
      hasError = true;
    }

    if (message.length < 10) {
      setError("messageError", "Message must be at least 10 characters.");
      hasError = true;
    }

    if (!agree) {
      setError("agreeError", "Please confirm the checkbox to proceed.");
      hasError = true;
    }

    if (hasError) {
      feedback.textContent = "Form submission failed. Please correct the highlighted fields.";
      feedback.classList.add("fail");
      return;
    }

    feedback.textContent = "Success! Your message has been submitted (prototype). We will contact you soon.";
    feedback.classList.add("success");
    form.reset();
  });

  form.addEventListener("reset", () => {
    setTimeout(clearErrors, 0);
  });
}
