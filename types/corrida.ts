import { z } from "zod";

export const corridaSchema = z
    .object({
        data: z.date(),
        descricao: z.string().min(1, "Descrição é obrigatória"),
        kmInicial: z
            .number()
            .int("Km inicial deve ser um número inteiro")
            .min(0, "Km inicial deve ser maior que zero"),
        kmFinal: z
            .number()
            .int("Km final deve ser um número inteiro")
            .min(0, "Km final deve ser maior que zero"),
        valor: z.number().min(0, "Valor deve ser maior que zero"),
    })
    .refine((data) => data.kmFinal >= data.kmInicial, {
        message: "Km final deve ser maior ou igual ao Km inicial",
        path: ["kmFinal"],
    });

export type CorridaFormData = z.infer<typeof corridaSchema>;

export interface Corrida extends CorridaFormData {
    id: string;
    criadoEm: Date;
}
