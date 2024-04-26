import { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import Vault from "../components/vault";

export interface VaultItem {
  website: string;
  username: string;
  password: string;
}
const Home = () => {
  const [step, setStep] = useState<"login" | "register" | "vault">("vault");
  const [vault, setVault] = useState<VaultItem[]>([]);
  const [vaultKey, setVaultKey] = useState("");

  return (
    <div>
      <main className="main">
        {step === "register" && (
          <Register setStep={setStep} setVaultKey={setVaultKey} />
        )}
        {step === "login" && <Login />}
        {step === "vault" && <Vault vault={vault} vaultKey={vaultKey} />}
      </main>
    </div>
  );
};

export default Home;
