import { useEffect, useState } from "preact/hooks";
import useDb from "../hooks/use-db";
import type { Video } from "../lib/types";

interface Props {
  video: Video;
}

const Sidebar = ({ video }: Props) => {
  const { db, search } = useDb();

  const [videos, setVideos] = useState<
    {
      id: string;
      title: string;
      thumbnail: string;
    }[]
  >();

  useEffect(() => {
    if (!db) return;

    search(db, {
      term: video.categories,
      properties: ["categories"],
      offset: 1,
      tolerance: 10,
    }).then((result) => {
      setVideos(
        result.hits
          .map((hit) => {
            return {
              id: hit.document.id as string,
              title: hit.document.title as string,
              thumbnail: hit.document.thumbnail as string,
            };
          })
          .slice(0, 10)
      );
    });
  }, [db, video]);

  return (
    <div className="w-full p-2 lg:w-1/3">
      <div className="text-2xl font-bold pl-2 mb-2">Similar videos</div>
      {videos?.map((video) => (
        <a key={video.id} href={`/${video.id}`}>
          <div className="hover:bg-primary hover:text-primary-content rounded-xl p-2 flex items-center gap-4">
            <img
              className="rounded-md"
              height={90}
              width={160}
              src={video.thumbnail}
              alt={video.title}
            />
            <h3>{video.title}</h3>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Sidebar;
