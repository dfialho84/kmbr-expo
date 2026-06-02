import sqliteCorridaRepository from "@/repositories/sqlite-corrida-repository";
import { Corrida, CorridaFormData } from "@/types/corrida";
import { useEffect, useState } from "react";

export function useCorridas() {
    const [corridas, setCorridas] = useState<Corrida[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        sqliteCorridaRepository.getAll().then((data) => {
            setCorridas(data);
            setLoading(false);
        });
    }, []);

    async function addCorrida(input: CorridaFormData): Promise<void> {
        const nova = await sqliteCorridaRepository.save(input);
        setCorridas((prev) => [nova, ...prev]);
    }

    async function removeCorrida(id: string): Promise<void> {
        await sqliteCorridaRepository.delete(id);
        setCorridas((prev) => prev.filter((c) => c.id !== id));
    }

    return { corridas, loading, addCorrida, removeCorrida };
}
