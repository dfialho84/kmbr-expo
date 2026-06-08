import { z } from "zod";

export const TIPOS_DESPESA = ["Abastecimento", "Manutenção", "Outros"] as const;

export type TipoDespesa = (typeof TIPOS_DESPESA)[number];

export const despesaSchema = z.object({
    data: z.date(),
    tipo: z.enum(TIPOS_DESPESA),
    valor: z.number().min(0, "Valor deve ser maior que zero"),
    descricao: z.string().optional(),
});

export type DespesaFormData = z.infer<typeof despesaSchema>;

export interface Despesa extends DespesaFormData {
    id: string;
    criadaEm: Date;
}
