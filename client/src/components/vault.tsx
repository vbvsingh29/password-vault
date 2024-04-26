import { useFieldArray, useForm } from "react-hook-form";
import { VaultItem } from "../pages/Home";
import FormWrapper from "./FormWrapper";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { encryptVault } from "../crypto";
import { useMutation } from "react-query";
import { saveVault } from "../api";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Vault = ({
  vault = [],
  vaultKey = "",
}: {
  vault: VaultItem[];
  vaultKey: string;
}) => {
  const token = useSelector((state: RootState) => state.token.token);
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      vault,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "vault",
  });

  const mutation = useMutation(saveVault);
  return (
    <FormWrapper
      onSubmit={handleSubmit(({ vault }) => {
        console.log({ vault });

        const encryptedVault = encryptVault({
          vault: JSON.stringify(vault),
          vaultKey,
        });
        window.sessionStorage.setItem("vault", JSON.stringify(vault));
        mutation.mutate({ encryptedVault, token });
      })}
    >
      {fields.map((field, index) => {
        return (
          <Box
            key={field.id}
            alignItems="flex-end"
            mt="4"
            mb="4"
            display="flex"
          >
            <FormControl ml="2">
              <FormLabel htmlFor="website">Website</FormLabel>
              <Input
                type="url"
                id="website"
                placeholder="Website"
                {...register(`vault[${index}].website`, {
                  required: "Website is required",
                })}
              />
            </FormControl>
            <FormControl ml="2">
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                placeholder="username"
                {...register(`vault[${index}].username`, {
                  required: "username is required",
                })}
              />
            </FormControl>
            <FormControl ml="2">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="password"
                {...register(`vault[${index}].password`, {
                  required: "password is required",
                })}
              />
            </FormControl>
            <Button
              type="button"
              bg="red.500"
              color="white"
              fontSize="2xl"
              ml="2"
              onClick={() => {
                remove(index);
              }}
            >
              -
            </Button>
          </Box>
        );
      })}
      <Button
        onClick={() => append({ website: "", username: "", password: "" })}
      >
        Add
      </Button>
      <Button type="submit" color="teal" ml="8">
        Save vault
      </Button>
    </FormWrapper>
  );
};

export default Vault;
