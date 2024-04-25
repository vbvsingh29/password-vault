import { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import Vault from "../components/vault";

export interface VaultKey {
  website: string;
  username: string;
  password: string;
}
const Home = () => {
  const [step, setStep] = useState<"login" | "register" | "vault">("register");
  const [vault, setVault] = useState<VaultKey[]>([]);
  const [vaultKey, setVaultKey] = useState("");

  return (
    <div>
      <main className="main">
        {step === "register" && (
          <Register setStep={setStep} setVaultKey={setVaultKey} />
        )}
        {step === "login" && <Login />}
        {step === "vault" && <Vault />}
      </main>
    </div>
  );
};

export default Home;
