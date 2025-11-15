document.addEventListener("DOMContentLoaded", () => {
  const validationRules = {
    photo_upload: {
      regex: /^https?:\/\/.+\..+/i,
      error: "Must be a full URL (https://…).",
    },
    full_name: {
      regex: /^[\w\s\-]{2,60}$/i,
      error: "2-60 letters/spaces/dashes only.",
    },
    role: {
      regex: /^[\w\s\-]{2,60}$/i,
      error: "2-60 letters/spaces/dashes only.",
    },
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
      error: "Please enter a valid email address.",
    },
    phone: {
      regex: /^(06|07|05)\d{8}$/,
      error: "Phone number must be 10 digits and start with 05, 06, or 07.",
    },
    experiences: {
      regex: /^.{0,500}$/,
      error: "Max 500 characters.",
    },
  };

  function showError(inputId, ok, msg) {
    const errSpan = document.getElementById("err_" + inputId);
    if (ok) {
      errSpan.textContent = "";
      errSpan.classList.add("hidden");
    } else {
      errSpan.textContent = msg;
      errSpan.classList.remove("hidden");
    }
  }

  const inputsToCheck = document.querySelectorAll("input[name]");

  inputsToCheck.forEach((input) => {
    const fieldName = input.name;
    if (validationRules[fieldName]) {
      input.addEventListener("blur", () => {
        const rule = validationRules[fieldName];
        const ok = rule.regex.test(input.value.trim());
        showError(fieldName, ok, rule.error);
      });
    }
  });

  
});
