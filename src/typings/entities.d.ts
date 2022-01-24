export type Empresa = {
  nome: string;
  cnpj: string;
  descricao: string;
  locais?: Local[];
  responsaveis?: Responsavel[];
  responsavelId?: number | string;
  id?: number | string;
};

export type Endereco = {
  cep: string;
  rua: string;
  bairro: string;
  numero: number;
  cidade: string;
  uf: string;
};

export type Responsavel = {
  nome: string;
  telefone: string;
  endereco: Endereco;
  principal?: boolean;
  principalLocal?: boolean;
  id?: number | string;
};

export type Local = {
  nome: string;
  endereco: Endereco;
  empresaId?: number | string;
  responsaveis?: Responsavel[];
  responsavelId?: number | string;
  id?: number | string;
};
