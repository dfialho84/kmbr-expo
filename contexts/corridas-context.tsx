import sqliteCorridaRepository from "@/repositories/sqlite-corrida-repository";
import { Corrida, CorridaFormData } from "@/types/corrida";
import { Filtro } from "@/types/filtro";
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

interface CorridasContextValue {
    corridas: Corrida[];
    corridasFiltradas: Corrida[];
    loading: boolean;
    filtro: Filtro;
    setFiltro: (filtro: Filtro) => void;
    addCorrida: (data: CorridaFormData) => Promise<void>;
    removeCorrida: (id: string) => Promise<void>;
}

const CorridasContext = createContext<CorridasContextValue | null>(null);

function filtrarPorPeriodo(corridas: Corrida[], filtro: Filtro): Corrida[] {
    if (filtro === "Todas") return corridas;

    const hoje = new Date();

    return corridas.filter((c) => {
        const data = c.data;

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

export function CorridasProvider({ children }: { children: React.ReactNode }) {
    const [corridas, setCorridas] = useState<Corrida[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState<Filtro>("Hoje");

    useEffect(() => {
        sqliteCorridaRepository.getAll().then((data) => {
            setCorridas(data);
            setLoading(false);
        });
    }, []);

    const corridasFiltradas = useMemo(
        () => filtrarPorPeriodo(corridas, filtro),
        [corridas, filtro]
    );

    async function addCorrida(input: CorridaFormData): Promise<void> {
        const nova = await sqliteCorridaRepository.save(input);
        setCorridas((prev) =>
            [...prev, nova].sort((a, b) => {
                const diff = b.data.getTime() - a.data.getTime();
                return diff !== 0 ? diff : b.criadoEm.getTime() - a.criadoEm.getTime();
            })
        );
    }

    async function removeCorrida(id: string): Promise<void> {
        await sqliteCorridaRepository.delete(id);
        setCorridas((prev) => prev.filter((c) => c.id !== id));
    }

    return (
        <CorridasContext.Provider
            value={{
                corridas,
                corridasFiltradas,
                loading,
                filtro,
                setFiltro,
                addCorrida,
                removeCorrida,
            }}
        >
            {children}
        </CorridasContext.Provider>
    );
}

export function useCorridasContext(): CorridasContextValue {
    const ctx = useContext(CorridasContext);
    if (!ctx)
        throw new Error(
            "useCorridasContext deve ser usado dentro de CorridasProvider"
        );
    return ctx;
}
