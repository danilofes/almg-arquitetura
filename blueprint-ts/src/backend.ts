

export const eventos = {
  busca: () => {
    return delayed<MeusEventosDto>({
      eventos: [
        { codigo: 1, nome: "Audiência pública da comissão de Saúde" },
        { codigo: 2, nome: "A vaquinha LeLê" }
      ]
    });
  },

  obtem: (codigo: number) => {
    return delayed<EventoDto>({ codigo: 1, nome: "Audiência pública da comissão de Saúde" });
  }
};

export interface MeusEventosDto {
  eventos: EventoDto[];
}

export interface EventoDto {
  codigo: number,
  nome: string
}

function delayed<T>(valor: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(valor), 1000));
}