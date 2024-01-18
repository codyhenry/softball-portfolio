import payload from "../../data/youtube/youtubeVideos.json";
import { Videos } from "../types/Types";

export const getYouTubeVideos = (): Videos => {
  if (!payload || !payload.items) return [];
  return payload.items
    .filter((upload) => upload.id.kind === "youtube#video")
    .map((upload) => {
      return {
        id: upload.id.videoId,
        title: upload.snippet.title,
        smallImg: upload.snippet.thumbnails.default.url,
        largeImg: upload.snippet.thumbnails.medium.url,
      };
    });
};
