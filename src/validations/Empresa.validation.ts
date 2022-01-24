import * as yup from "yup";
import { requiredMessage } from "../shared/utils/utils";
import { enderecoValidation } from "./Endereco.validation";
import { ResponsavelValidation } from "./Responsavel.validation";

export const mask = new RegExp(/([./_() -])+/g);

export const CreateEmpresaValidation = yup
  .object({
    nome: yup.string().required(requiredMessage("nome")),
    cnpj: yup
      .string()
      .required(requiredMessage("CNPJ"))
      .ensure()
      .test({
        name: "cnpj_length",
        message: "CNPJ inválido",
        test: (v: string) => {
          const value = v.replace(new RegExp(mask), "");
          return value.length === 14;
        },
      }),
    descricao: yup.string().required(requiredMessage("descrição")),
    local: yup
      .object({
        nome: yup.string().required(requiredMessage("nome")),
        endereco: enderecoValidation(),
      })
      .required(),
    responsaveis: yup.array().of(ResponsavelValidation()),
  })
  .required();

export const UpdateEmpresaValidation = yup
  .object({
    nome: yup.string().required(requiredMessage("mome")),
    cnpj: yup
      .string()
      .required(requiredMessage("CNPJ"))
      .ensure()
      .test({
        name: "cnpj_length",
        message: "CNPJ inválido",
        test: (v: string) => {
          const value = v.replace(new RegExp(mask), "");
          return value.length === 14;
        },
      }),
    descricao: yup.string().required(requiredMessage("descrição")),
    responsavelId: yup.string().required(requiredMessage("responsável")),
  })
  .required();
