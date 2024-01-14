import { useState } from "react";

import { Videos } from "../types/Types";
import { getYouTubeVideos } from "../functions/youtubeParser";

function Carousel({
  videos,
  current,
  setCurrent,
}: {
  videos: Videos;
  current: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [videoIndex, setVideoIndex] = useState(current);
  const [hoveredVideo, setHoveredVideo] = useState<string|null>(null)
  const handleNext = () => setVideoIndex((videoIndex + 1) % videos.length);
  const handlePrev = () =>
    setVideoIndex((videos.length + videoIndex - 1) % videos.length);

  const getVideoPreviews = () => {
    const result:Videos = [];
    for (let i = 0; i < Math.min(5, videos.length); i++) {
      const index = (videoIndex + i) % videos.length;
      result.push(videos[index]);
    }
    return result;
  };

  const updateVideos = (selectedIndex: number) => {
    // Swap current video with selected
    setCurrent(selectedIndex);
  };
  // left arrow, right arrow, array of videos, if length < 5 do not show arrows
  return (
    <div>
      {videos.length > 5 && (
        <button type="button" onClick={handlePrev}>
          Prev
        </button>
      )}
      <ul>
        {getVideoPreviews().map((video, i) => (
          <li key={video!.id}>
            {/* change button shape to circle, clip image */}
            <button
              type="button"
              onClick={() => updateVideos((videoIndex + i) % videos.length)}
              onMouseEnter={()=>setHoveredVideo(video!.title)}
              onMouseLeave={()=>setHoveredVideo(null)}
              disabled={(videoIndex + i) % videos.length === current}
            >
              <img src={video.smallImg}></img>
            </button>
          </li>
        ))}
      </ul>
      <h3>On Deck: {hoveredVideo}</h3>
      {videos.length > 5 && (
        <button type="button" onClick={handleNext}>
          Next
        </button>
      )}
    </div>
  );
}

export function Highlights() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videos = getYouTubeVideos()
  return (
    <div>
      <h1>Highlights</h1>
      {videos?(
        <>
        <iframe style={{border:0}} title={videos[currentIndex]!.title} src={`https://www.youtube.com/embed/${videos[currentIndex]!.id}`} loading="lazy"></iframe>
        <h3>{videos[currentIndex].title}</h3>
        </>
      ):(
        <h3>No videos to display</h3>
      )}
      
      {videos.length > 1 && (
        <Carousel
          videos={videos}
          current={currentIndex}
          setCurrent={setCurrentIndex}
        />
      )}
    </div>
  );
}
