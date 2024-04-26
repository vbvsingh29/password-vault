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

export async function saveVault({
  encryptedVault,
}: {
  encryptedVault: string;
}) {
  return axios.put(vaultBase, { encryptedVault }).then((res) => res.data);
}
