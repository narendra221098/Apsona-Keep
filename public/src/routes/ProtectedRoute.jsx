import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/SideBar";

const base = "http://localhost:4000/api";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWJkMDdiNmE2OWRlMzdhNDlkN2Q4YSIsImlhdCI6MTcyMTY2ODk0NSwiZXhwIjoxNzIyNTMyOTQ1fQ.MQibApC8snA1P5ZrV3uPjNHtqUyaCUrx7NVvMavY-fs";
const fetchCall = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await res.json();
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

const ProtectedRoute = () => {
  const [notes, setNotes] = useState([]);
  const [activeTab, setActiveTab] = useState("note");
  const [searchText, setSearchText] = useState("");

  // on change search
  const handleChangeSearchText = (e) => {
    setSearchText(e.target.value);
  };
  // add new note :done
  const handleAddNewNote = async (note) => {
    const url = base + "/notes";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(note),
    };
    const res = await fetchCall(url, options);
    if (res.status) {
      setNotes([...notes, res.data]);
    }
  };
  // Archive :done
  const handleArchive = async (id) => {
    const url = `${base}/notes/archive/${id}`;
    const options = {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const res = await fetchCall(url, options);
    if (res.status) {
      const x = notes.map((note) => {
        if (note._id === id) {
          return res.data;
        }
        return note;
      });
      setNotes(x);
    }
  };
  // delete :done
  const handleDelete = async (id) => {
    const url = `${base}/notes/${id}`;
    const options = {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    };
    const res = await fetchCall(url, options);
    if (res.status) {
      const x = notes.filter((note) => note._id !== id);
      setNotes(x);
    }
  };

  // restore : done
  const handleRestore = async (id) => {
    const url = `${base}/notes/restore/${id}`;
    const options = {
      method: "PUT",
      headers: { Authorization: "Bearer " + token },
    };
    const res = await fetchCall(url, options);
    if (res.status) {
      setNotes(
        notes.map((note) => {
          if (note._id === id) return res.data;
          return note;
        })
      );
    }
  };
  // dlt permanent :done
  const handleDeletePermanent = async (id) => {
    const url = `${base}/notes/delete/${id}`;
    const options = {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    };
    const res = await fetchCall(url, options);
    if (res.status) {
      setNotes(notes.filter((note) => note._id !== id));
    }
  };

  // clear trash : done
  const handleClearTrash = async (ids) => {
    const url = `${base}/notes/trash`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ ids }),
    };
    const res = await fetchCall(url, options);
    if (res.status) {
      setNotes(notes.filter((note) => !ids.includes(note._id)));
    }
  };

  // reminder
  const handleReminder = (status) => {};
  // change bg
  const handleChangeBg = (color) => {};

  // retrieve notes from database
  useEffect(() => {
    (async () => {
      const url = base + "/notes";
      const options = {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      };
      const res = await fetchCall(url, options);
      console.log(res);
      if (res.status) {
        setNotes(res.data);
      }
    })();
    //...
  }, [activeTab]);

  // Search : title , description
  const searchNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <main>
      <Header
        searchText={searchText}
        handleChangeSearchText={handleChangeSearchText}
      />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Outlet
        context={{
          activeTab,
          setActiveTab,
          notes: searchNotes,
          handleAddNewNote,
          handleArchive,
          handleReminder,
          handleChangeBg,
          handleRestore,
          handleDelete,
          handleDeletePermanent,
          handleClearTrash,
        }}
      />
    </main>
  );
};

export default ProtectedRoute;

// reminder
// change bg
