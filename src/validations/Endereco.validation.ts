import * as yup from "yup";
import { requiredMessage } from "../shared/utils/utils";
import { mask } from "./Empresa.validation";

export function enderecoValidation() {
  return yup
    .object({
      cep: yup
        .string()
        .required(requiredMessage("CEP"))
        .ensure()
        .test({
          name: "cep_length",
          message: "CEP inválido",
          test: (v: string) => {
            const value = v.replace(new RegExp(mask), "");
            return value.length === 8;
          },
        }),
      rua: yup.string().required(requiredMessage("rua")),
      bairro: yup.string().required(requiredMessage("bairro")),
      numero: yup
        .number()
        .typeError("Você deve especificar um número")
        .required(requiredMessage("número"))
        .moreThan(0, "O campo Número não deve ser igual ou menor a zero"),
      cidade: yup.string().required(requiredMessage("cidade")),
      uf: yup.string().required(requiredMessage("UF")),
    })
    .required();
}
