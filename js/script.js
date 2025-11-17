document.addEventListener("DOMContentLoaded", () => {
  const addNewWorker = document.getElementById("addNewWorker");
  const closeForm = document.getElementById("closeForm");
  const addWorkerForm = document.getElementById("addWorkerForm");
  const saveProfile = document.getElementById("saveProfile");
  const saveExp = document.getElementById("saveExp");
  const expDisplay = document.getElementById("expDisplay");
  // const side_bar = document.getElementById("side_bar");
  const pushStaff = document.getElementById("pushStaff");

  closeForm.addEventListener("click", (e) => {
    e.preventDefault()
    addWorkerForm.classList.add("hidden");
  });

  addNewWorker.addEventListener("click", (e) => {
    e.preventDefault()
    addWorkerForm.classList.remove("hidden");
  });

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

  const inputsToCheck = document.querySelectorAll("input[id]");

  inputsToCheck.forEach((input) => {
    const fieldName = input.id;
    if (validationRules[fieldName]) {
      input.addEventListener("blur", () => {
        const rule = validationRules[fieldName];
        const ok = rule.regex.test(input.value.trim());
        showError(fieldName, ok, rule.error);
      });
    }
  });

  let saveExperiences = [];

  saveExp.addEventListener("click", (e) => {
    e.preventDefault();
    const experiences = document.getElementById("experiences").value.trim();
    if (!experiences) return;
    saveExperiences.push(experiences);

    const expUnit = document.createElement("div");
    expUnit.innerHTML += `<span
                class="text-sm px-2 py-1 bg-blue-200 border-l-2 border-blue-500 rounded"
                >${experiences}</span
              >`;
    expDisplay.appendChild(expUnit);
  });

  saveProfile.addEventListener("click", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("full_name").value.trim();
    const role = document.getElementById("role").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    if (!fullName || !email || !phone || !role) return;

    const newWorker = {
      fullName,
      role,
      email,
      phone,
      exp: [...saveExperiences],
    };

    let allWorkers = JSON.parse(localStorage.getItem("allWorkers")) || [];
    allWorkers.push(newWorker);
    localStorage.setItem("allWorkers", JSON.stringify(allWorkers));

    const staffView = document.createElement("div");
    staffView.innerHTML = `<div
    class="border border-gray-400 w-full text-center flex px-4 py-3 gap-2 items-center relative rounded-xl my-2"
>
    <img
        src="assets/1.png"
        alt="img"
        class="rounded-full  border-2 border-blue-500 overflow-hidden h-13 w-13"
    />
    <div class="text-left">
        <h4 class="text-gray-900 text-xl font-semibold">${fullName}</h4>
        <p class="text-gray-900">${role}</p>
    </div>
    <button
        class="text-xs rounded absolute right-5 px-2 py-1 border border-amber-400 hover:bg-amber-400 hover:border-0 text-gray-900"
    >
        Edit
    </button>
</div>`;

    pushStaff.appendChild(staffView);
    saveExperiences = [];
  });
});
