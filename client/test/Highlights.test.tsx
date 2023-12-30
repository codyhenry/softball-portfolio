import "@testing-library/jest-dom/vitest";
import { render, screen, within, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Highlights } from "../src/features/Highlights";

describe("Highlights", () => {
  const videos = [
    "green",
    "yellow",
    "purple",
    "black",
    "white",
    "orange",
    "cyan",
    "pink",
  ];

  const videoList = () =>
    within(screen.getByRole("list")).getAllByRole("listitem");
  const buttonList = () =>
    within(screen.getByRole("list")).getAllByRole("button");

  it("renders 'Highlights' as the header", () => {
    render(<Highlights />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Highlights"
    );
  });
  it("displays the first video in main section", () => {
    render(<Highlights videos={videos} />);
    expect(screen.getByTestId("main-video")).toHaveTextContent("green");
  });
  it("does not have a carousel if there is only one video", () => {
    render(<Highlights videos={videos.slice(0, 1)} />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
  it("displays a list of videos if there is more than one", () => {
    render(<Highlights videos={videos} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
  it("renders a button for each video", () => {
    render(<Highlights videos={videos} />);
    expect(buttonList()).toHaveLength(5);
  });
  it("displays max 5 videos in carousel", () => {
    render(<Highlights videos={videos} />);
    expect(videoList()).toHaveLength(5);
  });
  it("displays all videos if there are less than 5", () => {
    render(<Highlights videos={videos.slice(0, 3)} />);
    expect(videoList()).toHaveLength(3);
  });
  it("does not have arrow buttons if there are less than 6 videos", () => {
    render(<Highlights videos={videos.slice(0, 5)} />);
    expect(
      screen.queryByRole("button", { name: "Prev" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Next" })
    ).not.toBeInTheDocument();
  });
  it("will switch the main video if another video is clicked", () => {
    render(<Highlights videos={videos} />);
    const mainVideo = screen.getByTestId("main-video");
    expect(mainVideo).toHaveTextContent("green");
    const purpleButton = within(screen.getByRole("list")).getByRole("button", {
      name: "purple",
    });
    fireEvent.click(purpleButton);
    expect(mainVideo).toHaveTextContent("purple");
  });
  it("will show the 6th video in line if the 'next' button is clicked and there are more than 5 videos", () => {
    render(<Highlights videos={videos} />);
    const nextButton = screen.getByRole("button", { name: "Next" });
    fireEvent.click(nextButton);
    expect(videoList()[4]).toHaveTextContent("orange");
  });
  it("will wrap to the first video in line if the 'next' button is clicked on the last video", () => {
    render(<Highlights videos={videos.slice(0, 6)} />);
    const nextButton = screen.getByRole("button", { name: "Next" });
    for (let i = 0; i < 6; i++) {
      fireEvent.click(nextButton);
    }
    expect(videoList()[0]).toHaveTextContent("green");
  });
  it("will wrap to the last video in line if the 'prev' button is clicked on the first video", () => {
    render(<Highlights videos={videos} />);
    const nextButton = screen.getByRole("button", { name: "Prev" });
    fireEvent.click(nextButton);
    expect(videoList()[0]).toHaveTextContent("pink");
  });
  it("will disable the button of the currently main video", () => {
    render(<Highlights videos={videos} />);
    expect(buttonList()[0]).toBeDisabled();
  });
});
