export const FILTROS = [
    "Hoje",
    "Esta semana",
    "Este mês",
    "Este ano",
    "Todas",
] as const;

export type Filtro = (typeof FILTROS)[number];
