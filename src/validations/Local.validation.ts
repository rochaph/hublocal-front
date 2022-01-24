import * as yup from "yup";
import { requiredMessage } from "../shared/utils/utils";
import { enderecoValidation } from "./Endereco.validation";
import { ResponsavelValidation } from "./Responsavel.validation";

export const mask = new RegExp(/([./_() -])+/g);

export const CreateLocalValidation = yup
  .object({
    nome: yup.string().required(requiredMessage("nome")),
    endereco: enderecoValidation(),
    responsaveis: yup.array().of(ResponsavelValidation()).required(),
    empresaId: yup
      .number()
      .typeError("Você deve especificar uma empresa")
      .required(requiredMessage("empresa")),
  })
  .required();

export const UpdateLocalValidation = yup
  .object({
    nome: yup.string().required(requiredMessage("nome")),
    endereco: enderecoValidation(),
    responsavelId: yup.string().required(requiredMessage("responsável")),
  })
  .required();
