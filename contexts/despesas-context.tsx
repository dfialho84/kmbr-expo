import sqliteDespesaRepository from "@/repositories/sqlite-despesa-repository";
import { Despesa, DespesaFormData, TipoDespesa } from "@/types/despesa";
import { Filtro } from "@/types/filtro";
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

export const FILTROS_TIPO: (TipoDespesa | "Todos")[] = [
    "Todos",
    "Abastecimento",
    "Manutenção",
    "Outros",
];

export type FiltroTipo = (typeof FILTROS_TIPO)[number];

interface DespesasContextValue {
    despesas: Despesa[];
    despesasFiltradas: Despesa[];
    loading: boolean;
    filtro: Filtro;
    setFiltro: (filtro: Filtro) => void;
    filtroTipo: FiltroTipo;
    setFiltroTipo: (tipo: FiltroTipo) => void;
    addDespesa: (data: DespesaFormData) => Promise<void>;
    removeDespesa: (id: string) => Promise<void>;
}

const DespesasContext = createContext<DespesasContextValue | null>(null);

function filtrarPorPeriodo(despesas: Despesa[], filtro: Filtro): Despesa[] {
    if (filtro === "Todas") return despesas;

    const hoje = new Date();

    return despesas.filter((d) => {
        const data = d.data;

        if (filtro === "Hoje") {
            return (
                data.getFullYear() === hoje.getFullYear() &&
                data.getMonth() === hoje.getMonth() &&
                data.getDate() === hoje.getDate()
            );
        }

        if (filtro === "Esta semana") {
            const inicio = new Date(hoje);
            inicio.setDate(hoje.getDate() - hoje.getDay());
            inicio.setHours(0, 0, 0, 0);
            const fim = new Date(inicio);
            fim.setDate(inicio.getDate() + 6);
            fim.setHours(23, 59, 59, 999);
            return data >= inicio && data <= fim;
        }

        if (filtro === "Este mês") {
            return (
                data.getFullYear() === hoje.getFullYear() &&
                data.getMonth() === hoje.getMonth()
            );
        }

        if (filtro === "Este ano") {
            return data.getFullYear() === hoje.getFullYear();
        }

        return true;
    });
}

export function DespesasProvider({ children }: { children: React.ReactNode }) {
    const [despesas, setDespesas] = useState<Despesa[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState<Filtro>("Hoje");
    const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>("Todos");

    useEffect(() => {
        sqliteDespesaRepository.getAll().then((data) => {
            setDespesas(data);
            setLoading(false);
        });
    }, []);

    const despesasFiltradas = useMemo(() => {
        const porPeriodo = filtrarPorPeriodo(despesas, filtro);
        if (filtroTipo === "Todos") return porPeriodo;
        return porPeriodo.filter((d) => d.tipo === filtroTipo);
    }, [despesas, filtro, filtroTipo]);

    async function addDespesa(input: DespesaFormData): Promise<void> {
        const nova = await sqliteDespesaRepository.save(input);
        setDespesas((prev) =>
            [...prev, nova].sort((a, b) => {
                const diff = b.data.getTime() - a.data.getTime();
                return diff !== 0
                    ? diff
                    : b.criadaEm.getTime() - a.criadaEm.getTime();
            }),
        );
    }

    async function removeDespesa(id: string): Promise<void> {
        await sqliteDespesaRepository.delete(id);
        setDespesas((prev) => prev.filter((d) => d.id !== id));
    }

    return (
        <DespesasContext.Provider
            value={{
                despesas,
                despesasFiltradas,
                loading,
                filtro,
                setFiltro,
                filtroTipo,
                setFiltroTipo,
                addDespesa,
                removeDespesa,
            }}
        >
            {children}
        </DespesasContext.Provider>
    );
}

export function useDespesasContext(): DespesasContextValue {
    const ctx = useContext(DespesasContext);
    if (!ctx)
        throw new Error(
            "useDespesasContext deve ser usado dentro de DespesasProvider",
        );
    return ctx;
}
