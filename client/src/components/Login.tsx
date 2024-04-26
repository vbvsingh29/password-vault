import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import FormWrapper from "./FormWrapper";
import { useForm } from "react-hook-form";
import { decryptVault, generateVaultKey, hashPassword } from "../crypto";
import { useMutation } from "react-query";
import { loginUser } from "../api";
import { Dispatch, SetStateAction } from "react";
import { VaultItem } from "../pages/Home";
import { setToken } from "../store/tokenSlice";
import { useDispatch } from "react-redux";

const Login = ({
  setVault,
  setVaultKey,
  setStep,
}: {
  setVault: Dispatch<SetStateAction<VaultItem[]>>;
  setVaultKey: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<"login" | "register" | "vault">>;
}) => {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string; hashedPassword: string }>();
  const dispatch = useDispatch();

  const mutation = useMutation(loginUser, {
    onSuccess: ({ accessToken, salt, vault }) => {
      const hashedPassword = getValues("hashedPassword");
      const email = getValues("email");
      const vaultKey = generateVaultKey({ email, hashedPassword, salt });
      const decryptedVault = decryptVault({ vault, vaultKey });

      dispatch(setToken(accessToken));
      window.sessionStorage.setItem("vk", vaultKey);
      setVaultKey(vaultKey);
      setVault(decryptedVault);
      window.sessionStorage.setItem("vault", JSON.stringify(decryptedVault));
      setStep("vault");
    },
  });

  return (
    <FormWrapper
      onSubmit={handleSubmit(() => {
        const email = getValues("email");
        const password = getValues("password");
        const hashedPassword = hashPassword(password);
        setValue("hashedPassword", hashedPassword);
        mutation.mutate({ email, hashedPassword });
      })}
    >
      <Heading>Login</Heading>
      <FormControl mt="4">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input
          id="email"
          placeholder="Email..."
          {...register("email", {
            required: "Email is required",
          })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl mt="4">
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          id="password"
          placeholder="Password..."
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must conatin at leasts 6 character",
            },
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit">Login</Button>
    </FormWrapper>
  );
};

export default Login;
