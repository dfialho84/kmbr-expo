import sqliteCorridaRepository from "@/repositories/sqlite-corrida-repository";
import sqliteDespesaRepository from "@/repositories/sqlite-despesa-repository";
import { Corrida } from "@/types/corrida";
import { Despesa } from "@/types/despesa";
import { AgrupamentoPeriodo } from "@/types/filtro";
import { useFocusEffect } from "expo-router";
import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

const PAGE_SIZE = 10;

const MESES = [
    "jan", "fev", "mar", "abr", "mai", "jun",
    "jul", "ago", "set", "out", "nov", "dez",
];

export interface PeriodoSummary {
    key: string;
    label: string;
    receitas: number;
    despesas: number;
    saldo: number;
}

interface ResumoContextValue {
    periodos: PeriodoSummary[];
    agrupamento: AgrupamentoPeriodo;
    setAgrupamento: (a: AgrupamentoPeriodo) => void;
    hasMore: boolean;
    loadMore: () => void;
    loading: boolean;
}

const ResumoContext = createContext<ResumoContextValue | null>(null);

function pad(n: number): string {
    return String(n).padStart(2, "0");
}

function getMondayOfWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

function getPeriodoKey(date: Date, agrupamento: AgrupamentoPeriodo): string {
    const y = date.getFullYear();
    const m = pad(date.getMonth() + 1);
    const d = pad(date.getDate());

    if (agrupamento === "Dia") return `${y}-${m}-${d}`;

    if (agrupamento === "Semana") {
        const monday = getMondayOfWeek(date);
        return `${monday.getFullYear()}-${pad(monday.getMonth() + 1)}-${pad(monday.getDate())}`;
    }

    if (agrupamento === "Mês") return `${y}-${m}`;

    return `${y}`;
}

function getPeriodoLabel(key: string, agrupamento: AgrupamentoPeriodo): string {
    if (agrupamento === "Dia") {
        const [y, m, d] = key.split("-");
        return `${d}/${m}/${y}`;
    }

    if (agrupamento === "Semana") {
        const monday = new Date(`${key}T00:00:00`);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        const startDay = pad(monday.getDate());
        const endDay = pad(sunday.getDate());
        const endMonth = MESES[sunday.getMonth()];
        const endYear = sunday.getFullYear();
        if (monday.getMonth() === sunday.getMonth()) {
            return `${startDay}–${endDay} ${endMonth} ${endYear}`;
        }
        const startMonth = MESES[monday.getMonth()];
        return `${startDay} ${startMonth}–${endDay} ${endMonth} ${endYear}`;
    }

    if (agrupamento === "Mês") {
        const [y, m] = key.split("-");
        return `${MESES[parseInt(m) - 1]} ${y}`;
    }

    return key;
}

function agrupar(
    corridas: Corrida[],
    despesas: Despesa[],
    agrupamento: AgrupamentoPeriodo,
): PeriodoSummary[] {
    const map = new Map<string, { receitas: number; despesas: number }>();

    for (const c of corridas) {
        const key = getPeriodoKey(c.data, agrupamento);
        const entry = map.get(key) ?? { receitas: 0, despesas: 0 };
        entry.receitas += c.valor;
        map.set(key, entry);
    }

    for (const d of despesas) {
        const key = getPeriodoKey(d.data, agrupamento);
        const entry = map.get(key) ?? { receitas: 0, despesas: 0 };
        entry.despesas += d.valor;
        map.set(key, entry);
    }

    return Array.from(map.entries())
        .sort((a, b) => b[0].localeCompare(a[0]))
        .map(([key, { receitas, despesas }]) => ({
            key,
            label: getPeriodoLabel(key, agrupamento),
            receitas,
            despesas,
            saldo: receitas - despesas,
        }));
}

export function ResumoProvider({ children }: { children: React.ReactNode }) {
    const [corridas, setCorridas] = useState<Corrida[]>([]);
    const [despesas, setDespesas] = useState<Despesa[]>([]);
    const [loading, setLoading] = useState(true);
    const [agrupamento, setAgrupamento] = useState<AgrupamentoPeriodo>("Mês");
    const [itemsVisible, setItemsVisible] = useState(PAGE_SIZE);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            Promise.all([
                sqliteCorridaRepository.getAll(),
                sqliteDespesaRepository.getAll(),
            ]).then(([c, d]) => {
                setCorridas(c);
                setDespesas(d);
                setLoading(false);
            });
        }, []),
    );

    const allPeriodos = useMemo(
        () => agrupar(corridas, despesas, agrupamento),
        [corridas, despesas, agrupamento],
    );

    const periodos = useMemo(
        () => allPeriodos.slice(0, itemsVisible),
        [allPeriodos, itemsVisible],
    );

    const hasMore = itemsVisible < allPeriodos.length;

    const loadMore = useCallback(() => {
        setItemsVisible((prev) => prev + PAGE_SIZE);
    }, []);

    const handleSetAgrupamento = useCallback((a: AgrupamentoPeriodo) => {
        setAgrupamento(a);
        setItemsVisible(PAGE_SIZE);
    }, []);

    return (
        <ResumoContext.Provider
            value={{
                periodos,
                agrupamento,
                setAgrupamento: handleSetAgrupamento,
                hasMore,
                loadMore,
                loading,
            }}
        >
            {children}
        </ResumoContext.Provider>
    );
}

export function useResumoContext(): ResumoContextValue {
    const ctx = useContext(ResumoContext);
    if (!ctx)
        throw new Error(
            "useResumoContext deve ser usado dentro de ResumoProvider",
        );
    return ctx;
}
