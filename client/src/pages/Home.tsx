import { useEffect, useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import Vault from "../components/vault";
import { Spinner } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { healthcheck } from "../api";

export interface VaultItem {
  website: string;
  username: string;
  password: string;
}

const Home = () => {
  const [step, setStep] = useState<"login" | "register" | "vault">("login");
  const [vault, setVault] = useState<VaultItem[]>([]);
  const [vaultKey, setVaultKey] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const vault = window.sessionStorage.getItem("vault");
    const vaultKey = window.sessionStorage.getItem("vk");

    if (vault && vault !== undefined) {
      setVault(JSON.parse(vault));
    }
    if (vaultKey) {
      setVaultKey(vaultKey);
    }
  }, []);

  const { mutate } = useMutation(healthcheck, {
    onSuccess: (msg) => {
      setLoading(false);
    },
    onError: () => setLoading(false),
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <div>
      <main className="main">
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <>
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
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
