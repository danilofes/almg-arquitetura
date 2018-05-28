
const dadosEventos = [
  { codigo: 1, nome: "Audiência pública da comissão de Saúde" },
  { codigo: 2, nome: "A vaquinha LeLê" }
];

export const eventos = {
  busca: () => {
    return delayed<DtoMeusEventos>({
      eventos: dadosEventos
    });
  },

  obtem: (codigo: number) => {
    return delayed<DtoEvento>(dadosEventos[codigo - 1]);
  }
};

export interface DtoMeusEventos {
  eventos: DtoEvento[];
}

export interface DtoEvento {
  codigo: number,
  nome: string
}

function delayed<T>(valor: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(valor), 500));
}