import { useState } from "react";

import { Videos } from "../types/Types";

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
  const handleNext = () => setVideoIndex((videoIndex + 1) % videos.length);
  const handlePrev = () =>
    setVideoIndex((videos.length + videoIndex - 1) % videos.length);

  const getVideoPreviews = () => {
    const result = [];
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
          <li key={video}>
            <button
              type="button"
              onClick={() => updateVideos((videoIndex + i) % videos.length)}
              disabled={(videoIndex + i) % videos.length === current}
            >
              {/* make this an img */}
              {video}
            </button>
          </li>
        ))}
      </ul>
      {videos.length > 5 && (
        <button type="button" onClick={handleNext}>
          Next
        </button>
      )}
    </div>
  );
}

export function Highlights({
  videos = ["red", "blue", "green", "yellow", "purple", "black", "white"],
}: {
  videos?: Videos;
}) {
  // get videos from Youtube (up 20 most recent)
  // show up to 5 mini videos at a time
  const [currentIndex, setCurrentIndex] = useState(0);

  // check to see if there is more than 1 video available
  return (
    <div>
      <h1>Highlights</h1>
      <div id="main-video" data-testid="main-video">
        {videos[currentIndex]}
      </div>
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
