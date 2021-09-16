import axios from "axios";

export default () => async (data) =>
  await axios
    .post("http://localhost:3000/api/", { catch: data })
    .then((res) => ({
      error: false,
      response: res.data,
    }))
    .catch((error) => ({
      error,
      users: null,
    }));
