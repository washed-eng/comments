import { sql } from "bun"

export const getUrl= async (url: string): Promise<number | null> => {
  const hasItBeenTested = await sql`select * from urls where url = ${url}`.values();
  if(hasItBeenTested.length > 0) {
    return hasItBeenTested[0][0];
  }
  return null;
}
