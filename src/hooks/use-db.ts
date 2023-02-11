import { Lyra, PropertiesSchema, search } from "@lyrasearch/lyra";
import { useEffect, useState } from "preact/hooks";
import { getLyraDB } from "../lib/lyra";

const mode = import.meta.env.MODE;

const useDb = () => {
  const [db, setDb] = useState<Lyra<PropertiesSchema>>();

  useEffect(() => {
    getLyraDB(mode).then((db) => {
      setDb(db);
    });
  }, []);

  return { db, search };
};

export default useDb;
