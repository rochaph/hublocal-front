import * as yup from "yup";
import { requiredMessage } from "../shared/utils/utils";
import { enderecoValidation } from "./Endereco.validation";
import { mask } from "./Local.validation";

export function ResponsavelValidation() {
  return yup
    .object({
      nome: yup.string().required(requiredMessage("nome")),
      telefone: yup
        .string()
        .required(requiredMessage("telefone"))
        .ensure()
        .test({
          name: "telefone_length",
          message: "Telefone inválido",
          test: (v: string) => {
            const value = v.replace(mask, "");
            return value.length === 11;
          },
        }),
      endereco: enderecoValidation(),
    })
    .required();
}
