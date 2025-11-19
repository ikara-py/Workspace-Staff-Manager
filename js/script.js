document.addEventListener("DOMContentLoaded", () => {
  const addNewWorker = document.getElementById("addNewWorker");
  const closeForm = document.getElementById("closeForm");
  const addWorkerForm = document.getElementById("addWorkerForm");
  const saveProfile = document.getElementById("saveProfile");
  const saveExp = document.getElementById("saveExp");
  const expDisplay = document.getElementById("expDisplay");
  const pushStaff = document.getElementById("pushStaff");
  const editWorkerForm = document.getElementById("editWorkerForm");
  const closeEditForm = document.getElementById("closeEditForm");
  const updateProfile = document.getElementById("updateProfile");
  const deleteProfile = document.getElementById("deleteProfile");
  const showWorkersModal = document.getElementById("showWorkersModal");
  const closeShowWorkers = document.getElementById("closeShowWorkers");
  const showWorkersContent = document.getElementById("showWorkersContent");

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
    const company = document.getElementById("company").value.trim();
    const role = document.getElementById("role").value.trim();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const experiences = document.getElementById("experiences").value.trim();
    if (!company || !role || !startDate || !endDate || !experiences) return;
    saveExperiences.push({
      company,
      role,
      startDate,
      endDate,
      experience: experiences,
    });

    const expUnit = document.createElement("div");
    expUnit.innerHTML += `<p class="w-60 text-sm px-2 py-1 bg-blue-200 border-l-2 border-blue-500 rounded">
            From: ${startDate} To: ${endDate} <br> ${company} - ${role} <br> ${experiences}
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
    const photo_upload = document.getElementById("photo_upload").value.trim();

    if (!fullName || !email || !phone || !role) return;

    workerIdCounter += 1;

    const newWorker = {
      id: workerIdCounter,
      photo_upload,
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

    expDisplay.innerHTML = "";
    document.getElementById("full_name").value = "";
    document.getElementById("role").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("photo_upload").value = "";
    document.getElementById("company").value = "";
    document.getElementById("experiences").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    addWorkerForm.classList.add("hidden");
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
                    <img src="${worker.photo_upload}" alt="img" class="rounded-full border-2 border-blue-500 h-13 w-13" />
                    <div class="text-left">
                        <h4 class="text-gray-900 text-sm font-semibold">${worker.fullName}</h4>
                        <p class="text-sm text-gray-900">${worker.role}</p>
                    </div>
                    <button class="editBtn text-xs rounded absolute right-5 px-2 py-1 border border-amber-400 hover:bg-amber-400 hover:border-0 text-gray-900" data-id="${worker.id}">
                        Edit
                    </button>
                </div>
            `;
      pushStaff.appendChild(staffView);
    });
    attachEditListeners();
  }

  function attachEditListeners() {
    document.querySelectorAll(".editBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const id = Number(e.target.closest(".editBtn").dataset.id);
        openEditForm(id);
      });
    });
  }

  closeEditForm.addEventListener("click", (e) => {
    e.preventDefault();
    editWorkerForm.classList.add("hidden");
  });

  let currentEditId = null;

  function openEditForm(id) {
    const workers = getWorkers();
    const worker = workers.find((w) => w.id === id);
    if (!worker) return;
    currentEditId = id;
    document.getElementById("edit_id").value = id;
    document.getElementById("edit_full_name").value = worker.fullName;
    document.getElementById("edit_role").value = worker.role;
    document.getElementById("edit_email").value = worker.email;
    document.getElementById("edit_phone").value = worker.phone;
    editWorkerForm.classList.remove("hidden");
  }

  updateProfile.addEventListener("click", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("edit_full_name").value.trim();
    const role = document.getElementById("edit_role").value.trim();
    const email = document.getElementById("edit_email").value.trim();
    const phone = document.getElementById("edit_phone").value.trim();
    if (!fullName || !email || !phone || !role) return;
    const workers = getWorkers();
    const index = workers.findIndex((w) => w.id === currentEditId);
    if (index === -1) return;
    workers[index] = {
      id: currentEditId,
      fullName,
      role,
      email,
      phone,
      exp: workers[index].exp,
    };
    localStorage.setItem("allWorkers", JSON.stringify(workers));
    renderWorkersFromStorage();
    editWorkerForm.classList.add("hidden");
  });

  deleteProfile.addEventListener("click", () => {
    let workers = getWorkers();
    workers = workers.filter((w) => w.id !== currentEditId);
    localStorage.setItem("allWorkers", JSON.stringify(workers));
    renderWorkersFromStorage();
    editWorkerForm.classList.add("hidden");
  });

  function renderAvailableWorkers(roomFilter = null) {
    showWorkersContent.innerHTML = "";
    let workers = getWorkers();

    if (roomFilter) {
      workers = workers.filter((w) => {
        if (w.role === "Manager") return true;
        if (roomFilter === "Receptionists" && w.role === "Receptionists")
          return true;
        if (roomFilter === "IT Technicians" && w.role === "IT Technicians")
          return true;
        if (roomFilter === "Security Agents" && w.role === "Security Agents")
          return true;
        if (roomFilter === "Cleaning" && w.role === "Cleaning") return true;
        if (roomFilter === "Other roles" && w.role === "Other roles")
          return true;
        return false;
      });
    }

    workers.forEach((worker) => {
      const div = document.createElement("div");
      div.className =
        "border border-gray-300 rounded-lg p-4 flex items-center gap-4";
      div.innerHTML = `
      <img src="${worker.photo_upload}" alt="img" class="rounded-full border-2 border-blue-500 h-13 w-13" />
      <div class="text-left">
        <h4 class="text-gray-900 text-sm font-semibold">${worker.fullName}</h4>
        <p class="text-sm text-gray-700">${worker.role}</p>
      </div>
      <button class="text-xs rounded absolute right-8 px-2 py-1 border border-blue-400 hover:bg-blue-400 hover:border-0 text-gray-900" data-id="${worker.id}">
        Assign
      </button>
    `;
      showWorkersContent.appendChild(div);
    });
  }

  const roomMap = {
    conferenceBtn: "Manager",
    receptionBtn: "Receptionists",
    serverBtn: "IT Technicians",
    securityBtn: "Security Agents",
    staffBtn: "Other roles",
    vaultBtn: "Cleaning",
  };

  Object.keys(roomMap).forEach((id) => {
    document.getElementById(id).addEventListener("click", () => {
      renderAvailableWorkers(roomMap[id]);
      showWorkersModal.classList.remove("hidden");
    });
  });

  closeShowWorkers.addEventListener("click", () => {
    showWorkersModal.classList.add("hidden");
  });

  const rooms = [
    "vault_room",
    "security_room",
    "server_room",
    "reception_room",
  ];

  rooms.forEach((room) => {
    const room_check = document.getElementById(room);
    const red_room = ["bg-red-500/50", "rounded", "border-2", "border-red-800"];

    if (room_check.childElementCount <= 2) {
      room_check.classList.add(...red_room);
    } else {
      room_check.classList.remove(...red_room);
    }
  });
  renderWorkersFromStorage();
});
