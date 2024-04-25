import axios from "axios";

const userBase = `${process.env.REACT_APP_API_ENDPOINT}/api/users`;
export async function registerUser(payload: {
  hashedPassword: string;
  email: string;
}) {
  return axios
    .post<{ salt: string; vault: string }>(userBase, payload, {
      withCredentials: true,
    })
    .then((res) => res.data);
}
