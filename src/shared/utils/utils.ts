export function removeMask(value: string): string {
  return value.replace(new RegExp(/([./_() -])+/g), "");
}
export function requiredMessage(label: string) {
  return `O campo ${label} não deve ser vazio`;
}
