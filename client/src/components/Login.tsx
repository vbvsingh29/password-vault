import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import FormWrapper from "./FormWrapper";
import { useForm } from "react-hook-form";
import { decryptVault, generateVaultKey, hashPassword } from "../crypto";
import { useMutation } from "react-query";
import { loginUser } from "../api";
import { Dispatch, SetStateAction, useState } from "react";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

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
      setLoading(false);
    },
    onError: (error: any) => {
      setError(error?.response.data.message);
      setLoading(false);
    },
  });

  return (
    <FormWrapper
      onSubmit={handleSubmit(() => {
        setLoading(true);
        const email = getValues("email");
        const password = getValues("password");
        const hashedPassword = hashPassword(password);
        setValue("hashedPassword", hashedPassword);
        mutation.mutate({ email, hashedPassword });
      })}
    >
      <Heading>Login</Heading>
      {error && (
        <Alert status="error" mt="4">
          <AlertIcon />
          {error}
        </Alert>
      )}
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
        <InputGroup>
          <Input
            id="password"
            type={show ? "text" : "password"}
            placeholder="Password..."
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must conatin at leasts 6 character",
              },
            })}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit" isLoading={loading} loadingText="logging" top="4">
        Login
      </Button>
    </FormWrapper>
  );
};

export default Login;
