import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import { Alert, AlertTitle, Link } from "@mui/material";
import RenderErrors from "./RenderErrors";
import ResponsavelForm from "./ResponsavelForm";
import Box from "@mui/material/Box";
import { responsavelTemplate } from "../templates/templates";
import ButtonAdd from "./ButtonAdd";
import { ConnectForm } from "./ConnectForm";
import { UseFieldArrayReturn } from "react-hook-form/dist/types/fieldArray";
import { Responsavel } from "../../typings/entities";

function ResponsavelListForm({
  methods,
}: {
  methods: UseFieldArrayReturn<Responsavel>;
}) {
  return (
    <ConnectForm>
      {({ register, control, setValue, getValues, formState, clearErrors }) => (
        <>
          {methods.fields.map((field, index) => {
            const title =
              index === 0 ? `Responsável Principal` : `Responsável ${index}`;
            return (
              <Fragment key={field.id}>
                <Typography sx={{ mt: 3 }} variant={"subtitle1"}>
                  {title}
                </Typography>

                {formState.errors.responsaveis && (
                  <Alert severity="error" sx={{ mt: 3 }}>
                    <AlertTitle> {title} inválido </AlertTitle>
                    {formState.errors.responsaveis[index] && (
                      <>
                        {RenderErrors(formState.errors.responsaveis[index])}
                        {RenderErrors(
                          formState.errors.responsaveis[index].endereco
                        )}
                      </>
                    )}
                  </Alert>
                )}

                <ResponsavelForm key={field.id} index={index} />
                {index > 0 && (
                  <Link
                    variant={"subtitle2"}
                    color={"error"}
                    sx={{ mt: 4 }}
                    onClick={() => methods.remove(index)}
                  >
                    Remover
                  </Link>
                )}
              </Fragment>
            );
          })}
          <Box sx={{ display: "flex", alignItems: "center", mt: 6 }}>
            <ButtonAdd
              style={{ marginRight: "1em" }}
              data-testid="add-button"
              onClick={() => {
                methods.insert(methods.fields.length, {
                  ...responsavelTemplate,
                });
                clearErrors(`responsaveis`);
              }}
            />
            <Typography variant="subtitle1">Adicionar responsável</Typography>
          </Box>
        </>
      )}
    </ConnectForm>
  );
}

export default ResponsavelListForm;
