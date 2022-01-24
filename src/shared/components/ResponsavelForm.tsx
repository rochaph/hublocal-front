import React, { useCallback } from "react";
import { debounce, Input } from "@mui/material";
import { EnderecoService } from "../../services/endereco/endereco.service";
import { ConnectForm } from "./ConnectForm";
import { Controller } from "react-hook-form";
import StyledLabel from "../styleds/StyledLabel";
import InputMask from "./InputMask";
import UfSelector from "./UfSelector";
import { UseFormSetValue } from "react-hook-form/dist/types/form";
import { Endereco } from "../../typings/entities";

function ResponsavelForm({ index }: { index: number }) {
  const enderecoService = new EnderecoService();

  const callEndereco = useCallback(
    debounce(
      (cep: string, values: Endereco, setValue: UseFormSetValue<any>) => {
        enderecoService
          .getEnderecoByCep(cep.replace("-", ""))
          .then(({ data }) => {
            setValue(
              `responsaveis.${index}.endereco`,
              {
                ...values,
                rua: data.logradouro,
                bairro: data.bairro,
                uf: data.uf,
                cidade: data.localidade,
              },
              { shouldDirty: true, shouldTouch: true }
            );
          });
      },
      1000
    ),
    []
  );

  return (
    <ConnectForm>
      {({ register, control, setValue, getValues }) => (
        <>
          <StyledLabel>Nome</StyledLabel>
          <Input {...register(`responsaveis.${index}.nome`)} />
          <StyledLabel>Telefone</StyledLabel>
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputMask
                value={value}
                onChange={onChange}
                mask={"(99) 99999-9999"}
              />
            )}
            name={`responsaveis.${index}.telefone`}
          />
          <StyledLabel>CEP</StyledLabel>
          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputMask
                value={value}
                onChange={(event) => {
                  onChange(event);
                  callEndereco(
                    event.target.value,
                    getValues(`responsaveis.${index}.endereco`),
                    setValue
                  );
                }}
                mask={"99999-999"}
              />
            )}
            name={`responsaveis.${index}.endereco.cep`}
          />
          <StyledLabel>Rua</StyledLabel>
          <Input {...register(`responsaveis.${index}.endereco.rua`)} />
          <StyledLabel>Bairro</StyledLabel>
          <Input {...register(`responsaveis.${index}.endereco.bairro`)} />
          <StyledLabel>Número</StyledLabel>
          <Input
            type="number"
            {...register(`responsaveis.${index}.endereco.numero`)}
          />
          <StyledLabel>Cidade</StyledLabel>
          <Input {...register(`responsaveis.${index}.endereco.cidade`)} />
          <StyledLabel>UF</StyledLabel>
          <Controller
            render={({ field: { value, onChange } }) => (
              <UfSelector value={value} onChange={onChange} />
            )}
            name={`responsaveis.${index}.endereco.uf`}
            defaultValue={""}
          />
        </>
      )}
    </ConnectForm>
  );
}

export default ResponsavelForm;
