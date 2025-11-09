import { sql } from "bun";
export const isItSlop = async (url: string): Promise<boolean> => {
  const response = await fetch(url);
  const text = await response.text();
  const isSlop = text.includes("data-start");

  const [urlRow] = await sql`
    INSERT INTO urls (url)
    VALUES (${url})
    ON CONFLICT (url) DO UPDATE SET url = EXCLUDED.url
    RETURNING id
  `;

  await sql`
    INSERT INTO slop (url_id, is_slop)
    VALUES (${urlRow.id}, ${isSlop});
  `;

  return isSlop;
};
