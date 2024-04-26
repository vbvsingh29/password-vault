import axios from "axios";

const userBase = `${process.env.REACT_APP_API_ENDPOINT}/api/users`;
const vaultBase = `${process.env.REACT_APP_API_ENDPOINT}/api/vault`;

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

export async function loginUser(payload: {
  hashedPassword: string;
  email: string;
}) {
  return axios
    .post<{ salt: string; vault: string; accessToken: string }>(
      `${userBase}/login`,
      payload,
      {
        withCredentials: true,
      }
    )
    .then((res) => res.data);
}

export async function saveVault({
  encryptedVault,
  token,
}: {
  encryptedVault: string;
  token: string;
}) {

  return axios
    .put(
      vaultBase,
      { encryptedVault },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => res.data);
}
