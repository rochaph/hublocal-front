import { useFormContext } from "react-hook-form";
import { UseFormReturn } from "react-hook-form/dist/types/form";

export const ConnectForm = ({
  children,
}: {
  children: (props: UseFormReturn) => JSX.Element;
}) => {
  const methods = useFormContext();
  return children({ ...methods });
};
