import { Despesa, DespesaFormData, TipoDespesa } from "@/types/despesa";
import * as Crypto from "expo-crypto";
import * as SQLite from "expo-sqlite";
import { IDespesaRepository } from "./despesa-repository";

const db = SQLite.openDatabaseSync("kmbr.db");

db.execSync(`
    CREATE TABLE IF NOT EXISTS despesas (
        id TEXT PRIMARY KEY NOT NULL,
        data TEXT NOT NULL,
        tipo TEXT NOT NULL,
        valor REAL NOT NULL,
        descricao TEXT,
        criadaEm TEXT NOT NULL
    );
`);

// migração para bancos existentes sem a coluna descricao
try {
    db.execSync(`ALTER TABLE despesas ADD COLUMN descricao TEXT;`);
} catch {
    // coluna já existe
}

type DespesaRow = {
    id: string;
    data: string;
    tipo: TipoDespesa;
    valor: number;
    descricao: string | null;
    criadaEm: string;
};

function rowToDespesa(row: DespesaRow): Despesa {
    return {
        id: row.id,
        data: new Date(row.data),
        tipo: row.tipo,
        valor: row.valor,
        descricao: row.descricao ?? undefined,
        criadaEm: new Date(row.criadaEm),
    };
}

const sqliteDespesaRepository: IDespesaRepository = {
    async getAll(): Promise<Despesa[]> {
        const rows = db.getAllSync<DespesaRow>(
            "SELECT * FROM despesas ORDER BY data DESC, criadaEm DESC;"
        );
        return rows.map(rowToDespesa);
    },

    async save(input: DespesaFormData): Promise<Despesa> {
        const id = Crypto.randomUUID();
        const criadaEm = new Date();

        db.runSync(
            `INSERT INTO despesas (id, data, tipo, valor, descricao, criadaEm)
             VALUES (?, ?, ?, ?, ?, ?);`,
            id,
            input.data.toISOString(),
            input.tipo,
            input.valor,
            input.descricao ?? null,
            criadaEm.toISOString()
        );

        return { ...input, id, criadaEm };
    },

    async delete(id: string): Promise<void> {
        db.runSync("DELETE FROM despesas WHERE id = ?;", id);
    },
};

export default sqliteDespesaRepository;
