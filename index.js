
    // User prompt for initial message
    let input = window.prompt("⚠️ WARNING: This website is AWESOME! Type 'yes' if you agree");

  if (input && input.trim().toLowerCase() === "secret") {
    window.location.href = "Page4.html";
  } else if (input && input.trim().toLowerCase() === "yes") {
    alert("Glad you agree 😎");
  } else if (input && input.trim().toLowerCase() === "henguinz") {
    window.location.href = "henguinz.html";
  } else {
    alert("Hmm, okay...");
  }