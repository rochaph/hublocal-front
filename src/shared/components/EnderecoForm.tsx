import StyledLabel from "../styleds/StyledLabel";
import { Input } from "@mui/material";
import { Controller } from "react-hook-form";
import InputMask from "./InputMask";
import UfSelector from "./UfSelector";
import React, { useCallback } from "react";
import { ConnectForm } from "./ConnectForm";
import { debounce } from "lodash";
import {
  EnderecoAPI,
  EnderecoService,
} from "../../services/endereco/endereco.service";
import { UseFormSetValue } from "react-hook-form/dist/types/form";

function EnderecoForm({
  afterCallEndereco,
  prefix,
  setValue,
}: {
  afterCallEndereco: (data: EnderecoAPI) => Promise<void> | void;
  prefix?: string;
  setValue?: UseFormSetValue<any>;
}) {
  const enderecoService = new EnderecoService();
  const prefixField = prefix ? `${prefix}.` : "";

  const callEndereco = useCallback(
    debounce((cep: string) => {
      enderecoService
        .getEnderecoByCep(cep.replace("-", ""))
        .then(({ data }) => afterCallEndereco(data));
    }, 1000),
    []
  );

  return (
    <ConnectForm>
      {({ register, control }) => (
        <>
          <StyledLabel>CEP</StyledLabel>
          <Controller
            render={({ field: { value, onChange } }) => (
              <InputMask
                value={value}
                onChange={(event) => {
                  onChange(event);
                  callEndereco(event.target.value);
                }}
                mask="99999-999"
              />
            )}
            defaultValue=""
            name={`${prefixField}endereco.cep`}
          />
          <StyledLabel>Rua</StyledLabel>
          <Input type="text" {...register(`${prefixField}endereco.rua`)} />
          <StyledLabel>Bairro</StyledLabel>
          <Input type="text" {...register(`${prefixField}endereco.bairro`)} />
          <StyledLabel>Número</StyledLabel>
          <Input type="number" {...register(`${prefixField}endereco.numero`)} />
          <StyledLabel>Cidade</StyledLabel>
          <Input type="text" {...register(`${prefixField}endereco.cidade`)} />
          <StyledLabel>UF</StyledLabel>
          <Controller
            render={({ field: { value, onChange } }) => (
              <UfSelector value={value} onChange={onChange} />
            )}
            name={`${prefixField}endereco.uf`}
            defaultValue=""
          />
        </>
      )}
    </ConnectForm>
  );
}

export default EnderecoForm;
