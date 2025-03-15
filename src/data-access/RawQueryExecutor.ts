import sequelize from "../config/db";

export class RawQueryExecutor {
  static async executeQuery(query: string, replacements: any[] = []) {
    const [results] = await sequelize.query(query, { replacements });
    return results;
  }
}
