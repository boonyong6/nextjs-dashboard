import pg, { QueryResultRow, Client } from "pg";
const { Pool } = pg;

const pool = new Pool();

export function sql<Type extends QueryResultRow>(
  sqlStrings: TemplateStringsArray,
  ...values: unknown[]
) {
  const sql = _formatSql(sqlStrings, ...values);
  return pool.query<Type>(sql);
}

export class ClientWrapper {
  _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  public connect() {
    return this._client.connect();
  }

  public end() {
    return this._client.end();
  }

  public sql(sqlStrings: TemplateStringsArray, ...values: unknown[]) {
    const sql = _formatSql(sqlStrings, ...values);
    return this._client.query(sql);
  }
}

function _formatSql(sqlStrings: TemplateStringsArray, ...values: unknown[]) {
  let sql = "";
  sqlStrings.forEach((s, i) => {
    let value = "";
    if (values[i] != undefined) {
      value = `'${values[i]}'`;
    }

    sql += s + value;
  });

  // console.log(sql);

  return sql;
}
