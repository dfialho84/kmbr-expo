import { Corrida, CorridaFormData } from "@/types/corrida";

export interface ICorridaRepository {
    getAll(): Promise<Corrida[]>;
    save(input: CorridaFormData): Promise<Corrida>;
    delete(id: string): Promise<void>;
}
