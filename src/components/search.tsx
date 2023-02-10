import { useStore } from "@nanostores/preact";
import { searchAtom } from "../stores/search";
import { useEffect, useState } from "preact/hooks";
import type { SearchResult } from "@lyrasearch/lyra";

const Search = () => {
  const $search = useStore(searchAtom);

  const [searchResult, setSearchResult] =
    useState<SearchResult<typeof window.db.schema>>();

  return (
    <div className="relative">
      <input
        value={$search}
        onInput={async (e) => {
          searchAtom.set(e.currentTarget.value);

          const result = await window.search(window.db, {
            term: e.currentTarget.value,
          });

          console.log(result);

          setSearchResult(result);
        }}
        type="text"
        placeholder="Type here"
        class="input input-bordered w-96 max-w-2xl"
      />
      <div
        className={`absolute bg-base-300 mt-2 rounded-xl w-full ${
          searchResult && searchResult?.count > 0 ? null : "hidden"
        }`}
      >
        {searchResult?.hits.slice(0, 5).map((hit) => (
          <a href={`${hit.document.id}`}>
            <div
              className="hover:bg-primary hover:text-primary-content rounded-xl p-2"
              key={hit.id}
            >
              <h3>{hit.document.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Search;
