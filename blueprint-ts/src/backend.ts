
const dadosEventos = [
  { codigo: 1, nome: "Audiência pública da comissão de Saúde", finalizado: false },
  { codigo: 2, nome: "A vaquinha LeLê", finalizado: false },
  { codigo: 3, nome: "Reunião ordinária", finalizado: true }
];

export interface FiltrosEventos {
  exibirFinalizados: boolean
}

export const eventos = {
  busca: (filtros: FiltrosEventos = {exibirFinalizados: false}) => {
    return delayed<DtoMeusEventos>({
      eventos: dadosEventos.filter(e => !e.finalizado || filtros.exibirFinalizados)
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