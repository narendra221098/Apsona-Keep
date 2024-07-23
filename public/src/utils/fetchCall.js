const base = "http://localhost:4000/api";
// const base = "/api";
const fetchCall = async (endpoint, options) => {
  try {
    const url = base + endpoint;
    const res = await fetch(url, options);
    return await res.json();
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

export default fetchCall;
