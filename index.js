
    // User prompt for initial message
    let input = window.prompt("⚠️ WARNING: This website is AWESOME! Type 'yes' if you agree");

  if (input && input.trim().toLowerCase() === "secret") {
    window.location.href = "Page4.html"; // change to your actual secret page name
  } else if (input && input.trim().toLowerCase() === "yes") {
    alert("Glad you agree 😎");
  } else {
    alert("Hmm, okay...");
  }
