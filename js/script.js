document.addEventListener("DOMContentLoaded", () => {
  const addNewWorker = document.getElementById("addNewWorker");
  const closeForm = document.getElementById("closeForm");
  const addWorkerForm = document.getElementById("addWorkerForm");
  const saveProfile = document.getElementById("saveProfile");
  const saveExp = document.getElementById("saveExp");
  const expDisplay = document.getElementById("expDisplay");
  const pushStaff = document.getElementById("pushStaff");

  closeForm.addEventListener("click", (e) => {
    e.preventDefault();
    addWorkerForm.classList.add("hidden");
  });

  addNewWorker.addEventListener("click", (e) => {
    e.preventDefault();
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
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    if (!experiences || !startDate || !endDate) return;
    saveExperiences.push({
      startDate,
      endDate,
      experience: experiences,
    });

    const expUnit = document.createElement("div");
    expUnit.innerHTML += `<p class="w-60 text-sm px-2 py-1 bg-blue-200 border-l-2 border-blue-500 rounded">
            From: ${startDate} To: ${endDate} <br> ${experiences}
          </p>`;
    expDisplay.appendChild(expUnit);
  });

  let workerIdCounter = 0;

  saveProfile.addEventListener("click", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("full_name").value.trim();
    const role = document.getElementById("role").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!fullName || !email || !phone || !role) return;

    workerIdCounter += 1;

    const newWorker = {
      id: workerIdCounter,
      fullName,
      role,
      email,
      phone,
      exp: [...saveExperiences],
    };

    const allWorkers = getWorkers();
    allWorkers.push(newWorker);
    localStorage.setItem("allWorkers", JSON.stringify(allWorkers));

    renderWorkersFromStorage();

    saveExperiences = [];
  });

  function getWorkers() {
    const stored = localStorage.getItem("allWorkers");
    if (!stored) return [];
    return JSON.parse(stored);
  }

  document.getElementById("saveExp").addEventListener("click", () => {
    const from = document.getElementById("startDate").value;
    const to = document.getElementById("endDate").value;
    const description = document.getElementById("experiences").value.trim();

    if (!from || !to || !description) return;

    const experience = { from, to, description };
    saveExperiences.push(experience);
  });

  function renderWorkersFromStorage() {
    pushStaff.innerHTML = "";

    const allWorkers = getWorkers();

    allWorkers.forEach((worker) => {
      const staffView = document.createElement("div");
      staffView.innerHTML = `
                <div 
                    class="border border-gray-400 w-65 text-center flex px-4 py-3 gap-2 items-center relative rounded-xl my-2"
                    data-worker-id="${worker.id}"
                >
                    <img src="assets/1.png" alt="img" class="rounded-full border-2 border-blue-500 h-13 w-13" />
                    <div class="text-left">
                        <h4 class="text-gray-900 text-sm font-semibold">${worker.fullName}</h4>
                        <p class="text-sm text-gray-900">${worker.role}</p>
                    </div>
                    <button class="text-xs rounded absolute right-5 px-2 py-1 border border-amber-400 hover:bg-amber-400 hover:border-0 text-gray-900">
                        Edit
                    </button>
                </div>
            `;
      pushStaff.appendChild(staffView);
    });
  }

  renderWorkersFromStorage();
});
