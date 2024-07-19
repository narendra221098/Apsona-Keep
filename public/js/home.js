const myForm = document.getElementById("form"); // for searching
const searchEl = document.getElementById("search"); // search input
const titleEl = document.getElementById("title"); // title input
const descriptionEl = document.getElementById("description"); // desc input
const actionIcons = document.getElementsByClassName(
  "action-icons-container"
)[0];
const notesListContainer = document.getElementById("notes-list-container");

let token = Cookies.get("token");
if (!token) {
  window.location.href = "/login";
}
token = JSON.parse(token);

const tab1 = document.getElementById("tab-1");
const tab2 = document.getElementById("tab-2");
const tab3 = document.getElementById("tab-3");
const tab4 = document.getElementById("tab-4");
const tab5 = document.getElementById("tab-5");

// titleEl
titleEl.style.display = "none";
titleEl.style.fontWeight = "500";
actionIcons.style.display = "none";

// show title input element
descriptionEl.addEventListener("focus", () => {
  titleEl.style.display = "inline";
  actionIcons.style.display = "flex";
});

// search form
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = searchEl.value;
  notesListContainer.innerHTML = "";
  getNotes(search);
});

// title and action icons hide after add note
function handleClose() {
  titleEl.style.display = "none";
  actionIcons.style.display = "none";
  titleEl.value = "";
  descriptionEl.value = "";
}

function emptyNoteList(el, msg) {
  // div
  const emptyDiv = document.createElement("div");
  emptyDiv.setAttribute("class", "empty-note-list");
  el.appendChild(emptyDiv);
  // icons
  const icon = document.createElement("i");
  icon.setAttribute("class", "fa-regular fa-lightbulb icon");
  emptyDiv.appendChild(icon);
  //
  const text = document.createElement("p");
  text.textContent = msg;
  emptyDiv.appendChild(text);
}

// render list of notes
function handleCreateList(note, element) {
  //
  const noteElement = document.createElement("div");
  noteElement.setAttribute("id", note._id);
  noteElement.setAttribute("class", "note-container");
  element.appendChild(noteElement);

  // title
  const noteTitle = document.createElement("p");
  noteTitle.setAttribute("class", "note-title");
  noteTitle.textContent = note.title;
  noteElement.appendChild(noteTitle);

  // description
  const noteDesc = document.createElement("p");
  noteDesc.setAttribute("class", "note-desc");
  noteDesc.textContent = note.description;
  noteElement.appendChild(noteDesc);

  // action icons container
  const actionIconsContainer = document.createElement("div");
  actionIconsContainer.setAttribute("class", "action-icons-container");
  noteElement.appendChild(actionIconsContainer);

  // icons
  // pin
  const pinIcon = document.createElement("i");
  pinIcon.setAttribute("class", "fa-regular fa-bell icon");
  actionIconsContainer.appendChild(pinIcon);

  // theme pad
  const themePad = document.createElement("i");
  themePad.setAttribute("class", "fa-solid fa-palette icon");
  actionIconsContainer.appendChild(themePad);
  // archive
  const archive = document.createElement("i");
  archive.setAttribute("class", "fa-solid fa-file-arrow-down icon");
  archive.onclick = () => {
    handleArchive(note, element);
  };
  actionIconsContainer.appendChild(archive);

  // dlt
  const dlt = document.createElement("i");
  dlt.setAttribute("class", "fa-solid fa-trash icon");
  dlt.onclick = () => {
    handleDelete(note._id, element);
  };
  actionIconsContainer.appendChild(dlt);
  // dots
  const dots = document.createElement("i");
  dots.setAttribute("class", "fa-solid fa-ellipsis-vertical icon");
  actionIconsContainer.appendChild(dots);
}

// handle add api call
async function handleSave() {
  const data = {
    title: titleEl.value,
    description: descriptionEl.value,
    isPinned: false,
    isArchived: false,
  };
  const res = await fetch(`/api/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!result.status) {
    alert("error ", result.msg);
    return;
  }
  handleCreateList(result.data, notesListContainer);
  handleClose();
}

// handle archived api call
async function handleArchive(data, element) {
  const res = await fetch(`/api/notes/${data._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...data, isArchived: !data.isArchived }),
  });
  const result = await res.json();
  if (!result.status) {
    alert("error ", result.msg);
    return;
  }
  const x = document.getElementById(data._id);
  element.removeChild(x);
  if (data.isArchived) {
    handleCreateList(result.data, notesListContainer);
  } else {
    handleCreateList(result.data, tab4);
  }
}

// handle dlt api call
async function handleDelete(id, element) {
  const res = await fetch(`/api/notes/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await res.json();
  if (!result.status) {
    alert("error ", result.msg);
    return;
  }
  const x = document.getElementById(id);
  element.removeChild(x);
  handleCreateList(result.data, tab5);
}

// get notes list
async function getNotes(query = "") {
  const res = await fetch(`/api/notes?search_q=${query}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await res.json();
  if (!result.status) {
    alert("error ", result.msg);
    return;
  }
  if (result.data.length == 0) {
    // emptyNoteList(tab1, "Notes you add appear here");
  }
  for (let i = 0; i < result.data.length; i++) {
    const note = result.data[i];
    handleCreateList(note, notesListContainer);
  }
}
getNotes();
// get archived notes list
async function getArchivedData() {
  const res = await fetch("/api/notes/archived-notes", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await res.json();
  if (!result.status) {
    alert("error ", result.msg);
    return;
  }
  if (result.data.length === 0) {
    // emptyNoteList(tab4, "Your archived notes appear here");
  }
  for (let i = 0; i < result.data.length; i++) {
    const note = result.data[i];
    handleCreateList(note, tab4);
  }
}
getArchivedData();

// get deleted notes list
async function getDeleteData() {
  const res = await fetch("/api/notes/deleted-notes", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await res.json();
  if (!result.status) {
    alert("error ", result.msg);
    return;
  }
  if (result.data.length === 0) {
    // emptyNoteList(tab5, "No notes in Trash");
  }
  for (let i = 0; i < result.data.length; i++) {
    const note = result.data[i];
    handleCreateList(note, tab5);
  }
}
getDeleteData();

// change tabs and render relative to tab
function handleChangeTab(id) {
  for (let i = 1; i <= 5; i++) {
    // main el
    const el = document.getElementById(`tab-${i}`);
    if (i === id) el.style.display = "flex";
    else el.style.display = "none";
  }
  // change active tab
  for (let i = 1; i <= 5; i++) {
    const element = document.getElementById(i);
    const preStyle = element.getAttribute("class");
    if (i === id) {
      element.setAttribute("class", preStyle + " active-icon");
    } else {
      element.setAttribute("class", preStyle.replace(" active-icon", ""));
    }
  }

  handleApiCall();
}

// api call when tab is changed
function handleApiCall() {
  // getNotes();
  // getArchivedData();
  // getDeleteData();
}
