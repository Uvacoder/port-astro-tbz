import { useStore } from "@nanostores/preact";
import { searchAtom } from "../stores/search";
import { useState } from "preact/hooks";
import type { PropertiesSchema, SearchResult } from "@lyrasearch/lyra";
import useDb from "../hooks/use-db";

const Search = () => {
  const $search = useStore(searchAtom);

  const { db, search } = useDb();

  const [searchResult, setSearchResult] =
    useState<SearchResult<PropertiesSchema>>();

  return (
    <div className="relative w-full max-w-xl">
      <input
        value={$search}
        onInput={async (e) => {
          searchAtom.set(e.currentTarget.value);

          if (!db) return;

          const result = await search(db, {
            term: e.currentTarget.value,
          });

          setSearchResult(result);
        }}
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full"
      />
      <div
        className={`absolute bg-base-200 max-h-96 overflow-y-scroll mt-2 rounded-xl w-full ${
          searchResult && searchResult?.count > 0 ? null : "hidden"
        }`}
      >
        {searchResult?.hits.slice(0, 4).map((hit) => (
          <a key={hit.id} href={`${hit.document.id}`}>
            <div className="hover:bg-primary hover:text-primary-content rounded-xl p-2 flex items-center gap-4">
              <img
                className="rounded-md"
                height={90}
                width={160}
                src={hit.document.thumbnail as string}
                alt={hit.document.title as string}
              />
              <h3>{hit.document.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Search;
