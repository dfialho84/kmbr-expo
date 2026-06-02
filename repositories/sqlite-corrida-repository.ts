import { Corrida, CorridaFormData } from "@/types/corrida";
import * as SQLite from "expo-sqlite";
import { ICorridaRepository } from "./corrida-repository";

const db = SQLite.openDatabaseSync("kmbr.db");

db.execSync(`
    CREATE TABLE IF NOT EXISTS corridas (
        id TEXT PRIMARY KEY NOT NULL,
        data TEXT NOT NULL,
        descricao TEXT NOT NULL,
        kmInicial INTEGER NOT NULL,
        kmFinal INTEGER NOT NULL,
        valor REAL NOT NULL,
        criadoEm TEXT NOT NULL
    );
`);

type CorridaRow = {
    id: string;
    data: string;
    descricao: string;
    kmInicial: number;
    kmFinal: number;
    valor: number;
    criadoEm: string;
};

function rowToCorrida(row: CorridaRow): Corrida {
    return {
        id: row.id,
        data: new Date(row.data),
        descricao: row.descricao,
        kmInicial: row.kmInicial,
        kmFinal: row.kmFinal,
        valor: row.valor,
        criadoEm: new Date(row.criadoEm),
    };
}

const sqliteCorridaRepository: ICorridaRepository = {
    async getAll(): Promise<Corrida[]> {
        const rows = db.getAllSync<CorridaRow>(
            "SELECT * FROM corridas ORDER BY data DESC;"
        );
        return rows.map(rowToCorrida);
    },

    async save(input: CorridaFormData): Promise<Corrida> {
        const id = crypto.randomUUID();
        const criadoEm = new Date();

        db.runSync(
            `INSERT INTO corridas (id, data, descricao, kmInicial, kmFinal, valor, criadoEm)
             VALUES (?, ?, ?, ?, ?, ?, ?);`,
            id,
            input.data.toISOString(),
            input.descricao,
            input.kmInicial,
            input.kmFinal,
            input.valor,
            criadoEm.toISOString()
        );

        return { ...input, id, criadoEm };
    },

    async delete(id: string): Promise<void> {
        db.runSync("DELETE FROM corridas WHERE id = ?;", id);
    },
};

export default sqliteCorridaRepository;
