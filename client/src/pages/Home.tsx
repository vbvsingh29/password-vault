import { useEffect, useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import Vault from "../components/vault";

export interface VaultItem {
  website: string;
  username: string;
  password: string;
}
const Home = () => {
  const [step, setStep] = useState<"login" | "register" | "vault">("login");
  const [vault, setVault] = useState<VaultItem[]>([]);
  const [vaultKey, setVaultKey] = useState("");

  useEffect(() => {
    const vault = window.sessionStorage.getItem("vault");
    const vaultKey = window.sessionStorage.getItem("vk");

    if (vault && vault !== undefined) {
      console.log(vault);
      setVault(JSON.parse(vault));
    }
    if (vaultKey) {
      setVaultKey(vaultKey);
    }
  }, []);

  return (
    <div>
      <main className="main">
        {step === "register" && (
          <Register setStep={setStep} setVaultKey={setVaultKey} />
        )}
        {step === "login" && (
          <Login
            setVault={setVault}
            setStep={setStep}
            setVaultKey={setVaultKey}
          />
        )}
        {step === "vault" && <Vault vault={vault} vaultKey={vaultKey} />}
      </main>
    </div>
  );
};

export default Home;
