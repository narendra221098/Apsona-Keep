import { useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import MoonLoader from "react-spinners/MoonLoader";

//
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
//
import fetchCall from "../utils/fetchCall";

const ProtectedRoute = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [token, setToken] = useState(null);
  const [isUserDetailsLoading, setIsUserDetailsLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [activeTab, setActiveTab] = useState("note");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  // on change search
  const handleChangeSearchText = (e) => {
    setSearchText(e.target.value);
  };
  // add new note :done
  const handleAddNewNote = async (note) => {
    const url = "/notes";
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
    const url = `/notes/archive/${id}`;
    const options = {
      method: "PUT",
      headers: { Authorization: "Bearer " + token },
    };
    const res = await fetchCall(url, options);
    if (res.status) {
      setNotes(
        notes.map((note) => {
          if (note._id === id) {
            return res.data;
          }
          return note;
        })
      );
    }
  };
  // delete :done
  const handleDelete = async (id) => {
    const url = `/notes/${id}`;
    const options = {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    };
    const res = await fetchCall(url, options);
    if (res.status) {
      // modify as dlt is true
      setNotes(notes.filter((note) => note._id !== id));
    }
  };

  // restore : done
  const handleRestore = async (id) => {
    const url = `/notes/restore/${id}`;
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
    const url = `/notes/delete/${id}`;
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
    const url = `/notes/trash`;
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

  // Search : title , description
  const searchNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.description.toLowerCase().includes(searchText.toLowerCase())
  );

  // retrieve notes from database
  useEffect(() => {
    if (!userDetails) return;
    (async () => {
      const endpoint = "/notes";
      const options = {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      };
      const res = await fetchCall(endpoint, options);
      if (res.status) {
        setNotes(res.data);
      }
    })();
    //...
  }, [userDetails, activeTab]);

  // retrieve token
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/logout");
      return;
    }
    setToken(JSON.parse(token));
  }, []);
  // retrieve user details from db
  useEffect(() => {
    if (!token) return;

    (async () => {
      try {
        const endpoint = "/users";
        const options = {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        };
        const res = await fetchCall(endpoint, options);
        if (res.status) {
          setUserDetails(res.data);
        } else {
          navigate("/logout");
        }
      } catch (error) {
        navigate("/logout");
        console.log(error.message);
      } finally {
        setIsUserDetailsLoading(false);
      }
    })();
  }, [token]);

  // loading
  if (isUserDetailsLoading)
    return (
      <div className="page-loader">
        <MoonLoader color="blue" size={24} />
      </div>
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
