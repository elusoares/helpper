export class ClientModel {
  nome: string;
  email: string;
  cpfOuCnpj: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  constructor(
    nome: string,
    email: string,
    cpfOuCnpj: string,
    telefone: string,
    cep: string,
    logradouro: string,
    numero: number,
    bairro: string,
    cidade: string,
    estado: string
  ) {
    this.nome = nome;
    this.email = email;
    this.cpfOuCnpj = cpfOuCnpj;
    this.telefone = telefone;
    this.cep = cep;
    this.logradouro = logradouro;
    this.numero = numero;
    this.bairro = bairro;
    this.cidade = cidade;
    this.estado = estado;
  }
}
