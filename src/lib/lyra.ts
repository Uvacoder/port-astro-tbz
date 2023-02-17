import type { Data, Lyra, PropertiesSchema } from "@lyrasearch/lyra";
import { create as createLyraDB, load as loadLyraDB } from "@lyrasearch/lyra";

export async function getLyraDB(
  mode?: string
): Promise<Lyra<PropertiesSchema>> {
  const db = await createLyraDB({ schema: { _: "string" }, edge: true });

  let path = "/assets/db.js";

  if (mode === "development") {
    path = "/dev-data/db.js";
  }

  const dbResponse = await fetch(path);
  const dbData = (await dbResponse.json()) as Data<{ _: "string" }>;

  await loadLyraDB(db, dbData);

  return db;
}

export { search } from "@lyrasearch/lyra";
