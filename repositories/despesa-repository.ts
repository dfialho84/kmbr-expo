import { Despesa, DespesaFormData } from "@/types/despesa";

export interface IDespesaRepository {
    getAll(): Promise<Despesa[]>;
    save(input: DespesaFormData): Promise<Despesa>;
    delete(id: string): Promise<void>;
}
