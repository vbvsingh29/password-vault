import { useState } from "react";

const Home = () => {
  const [step, setStep] = useState<"login" | "register" | "vault">("login");
};

export default Home;
