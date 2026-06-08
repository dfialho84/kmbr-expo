export const FILTROS = [
    "Hoje",
    "Esta semana",
    "Este mês",
    "Este ano",
    "Todas",
] as const;

export type Filtro = (typeof FILTROS)[number];

export const AGRUPAMENTOS = ["Dia", "Semana", "Mês", "Ano"] as const;

export type AgrupamentoPeriodo = (typeof AGRUPAMENTOS)[number];
