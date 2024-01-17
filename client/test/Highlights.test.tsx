import "@testing-library/jest-dom/vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { afterEach, describe, expect, it, vi, Mock } from "vitest";

import { Highlights } from "../src/features/Highlights";
import { getYouTubeVideos } from "../src/functions/youtubeParser";

vi.mock("../src/functions/youtubeParser");
describe("Highlights", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const getYouTubeVideosMock = getYouTubeVideos as Mock;

  const videos = [
    {
      id: "DGE_QRkqBPg",
      title: "Video 1",
      smallImg: "https://i.ytimg.com/vi/DGE_QRkqBPg/default.jpg",
      largeImg: "https://i.ytimg.com/vi/DGE_QRkqBPg/mqdefault.jpg",
    },
    {
      id: "MwQ0VkGn9GI",
      title: "Video 2",
      smallImg: "https://i.ytimg.com/vi/MwQ0VkGn9GI/default.jpg",
      largeImg: "https://i.ytimg.com/vi/MwQ0VkGn9GI/mqdefault.jpg",
    },
    {
      id: "PHa2cXT_m-Y",
      title: "Video 3",
      smallImg: "https://i.ytimg.com/vi/PHa2cXT_m-Y/default.jpg",
      largeImg: "https://i.ytimg.com/vi/PHa2cXT_m-Y/mqdefault.jpg",
    },
    {
      id: "uP4r8an4fAc",
      title: "Video 4",
      smallImg: "https://i.ytimg.com/vi/uP4r8an4fAc/default.jpg",
      largeImg: "https://i.ytimg.com/vi/uP4r8an4fAc/mqdefault.jpg",
    },
    {
      id: "C7jLXo-5tFA",
      title: "Video 5",
      smallImg: "https://i.ytimg.com/vi/C7jLXo-5tFA/default.jpg",
      largeImg: "https://i.ytimg.com/vi/C7jLXo-5tFA/mqdefault.jpg",
    },
    {
      id: "9rZ9KCMWGP8",
      title: "Video 6",
      smallImg: "https://i.ytimg.com/vi/9rZ9KCMWGP8/default.jpg",
      largeImg: "https://i.ytimg.com/vi/9rZ9KCMWGP8/mqdefault.jpg",
    },
  ];

  const videoList = () => screen.getByRole("list");
  const videoListItems = () => within(videoList()).getAllByRole("listitem");
  const buttonList = () => within(videoList()).getAllByRole("button");
  const mainVideo = (videoTitle: string) => screen.queryByTitle(videoTitle);
  const carouselVideoButton = (videoTitle: string) =>
    within(videoList()).getByAltText(videoTitle);
  const carouselImage = (carouselIndex: number) =>
    within(videoListItems()[carouselIndex]).getByRole("img");

  it("renders 'Highlights' as the header", () => {
    getYouTubeVideosMock.mockReturnValue(videos);
    render(<Highlights />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Highlights"
    );
  });
  it("displays the first video in main section", () => {
    getYouTubeVideosMock.mockReturnValue(videos);
    render(<Highlights />);
    expect(mainVideo("Video 1")).toBeInTheDocument();
  });
  it("displays 'No videos to display' if there are no videos", () => {
    getYouTubeVideosMock.mockReturnValue([]);
    render(<Highlights />);
    expect(mainVideo("Video 1")).not.toBeInTheDocument();
    const videoWarning = screen.getAllByRole("heading", { level: 3 })[0];
    expect(videoWarning).toHaveTextContent("No videos to display");
  });
  it("does not have a carousel if there is only one video", () => {
    getYouTubeVideosMock.mockReturnValue(videos.slice(0, 1));
    render(<Highlights />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
  it("displays a list of videos if there is more than one", () => {
    getYouTubeVideosMock.mockReturnValue(videos);
    render(<Highlights />);
    expect(videoList()).toBeInTheDocument();
  });
  it("renders a button for each video", () => {
    getYouTubeVideosMock.mockReturnValue(videos.slice(0, 6));
    render(<Highlights />);
    expect(buttonList()).toHaveLength(5);
  });
  it("displays max 5 videos in carousel", () => {
    getYouTubeVideosMock.mockReturnValue(videos);
    render(<Highlights />);
    expect(videoListItems()).toHaveLength(5);
  });
  it("will display the name of the video being hovered in the carousel", () => {
    getYouTubeVideosMock.mockReturnValue(videos);
    render(<Highlights />);
    const onDeck = screen.getAllByRole("heading", { level: 3 })[1];
    expect(onDeck).toHaveTextContent(/On Deck:/);
    fireEvent.mouseEnter(carouselVideoButton("Video 2"));
    expect(onDeck).toHaveTextContent(/On Deck: Video 2/);
  });
  it("displays all videos if there are less than 5", () => {
    getYouTubeVideosMock.mockReturnValue(videos.slice(0, 3));
    render(<Highlights />);
    expect(videoListItems()).toHaveLength(3);
  });
  it("does not have arrow buttons if there are less than 6 videos", () => {
    getYouTubeVideosMock.mockReturnValue(videos.slice(0, 5));
    render(<Highlights />);
    expect(
      screen.queryByRole("button", { name: "Prev" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Next" })
    ).not.toBeInTheDocument();
  });
  it("will switch the main video if another video is clicked", () => {
    getYouTubeVideosMock.mockReturnValue(videos);
    render(<Highlights />);
    expect(mainVideo("Video 1")).toBeInTheDocument();
    fireEvent.click(carouselVideoButton("Video 2"));
    expect(screen.queryByTitle("Video 1")).not.toBeInTheDocument();
    expect(mainVideo("Video 2")).toBeInTheDocument();
  });
  it("will display the name of the video that is currently selected", () => {
    getYouTubeVideosMock.mockReturnValue(videos);
    render(<Highlights />);
    const titleHeader = screen.getAllByRole("heading", { level: 3 })[0];
    expect(titleHeader).toHaveTextContent("Video 1");
  });
  it("will show the 6th video in line if the 'next' button is clicked and there are more than 5 videos", () => {
    getYouTubeVideosMock.mockReturnValue(videos);
    render(<Highlights />);
    const nextButton = screen.getByRole("button", { name: "Next" });
    fireEvent.click(nextButton);
    expect(carouselImage(4)).toHaveAccessibleName("Video 6");
  });
  it("will wrap to the first video in line if the 'next' button is clicked on the last video", () => {
    getYouTubeVideosMock.mockReturnValue(videos);
    render(<Highlights />);
    const nextButton = screen.getByRole("button", { name: "Next" });
    for (let i = 0; i < 6; i++) {
      fireEvent.click(nextButton);
    }
    expect(carouselImage(0)).toHaveAccessibleName("Video 1");
  });
  it("will wrap to the last video in line if the 'prev' button is clicked on the first video", () => {
    getYouTubeVideosMock.mockReturnValue(videos);
    render(<Highlights />);
    const nextButton = screen.getByRole("button", { name: "Prev" });
    fireEvent.click(nextButton);
    expect(carouselImage(0)).toHaveAccessibleName("Video 6");
  });
  it("will disable the button of the currently main video", () => {
    getYouTubeVideosMock.mockReturnValue(videos);
    render(<Highlights />);
    expect(buttonList()[0]).toBeDisabled();
  });
});
