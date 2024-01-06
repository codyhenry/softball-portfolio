import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Stats } from "../src/features/Stats";

describe("Stats", () => {
  const initMobile = () => {
    window.innerWidth = 700;
    fireEvent(window, new Event("resize"));
  };
  it("renders 'Player Statistics' as a header", () => {
    render(<Stats />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Player Statistics"
    );
  });
  it("renders all 3 tables at a time for screens larger than 990px", () => {
    render(<Stats />);
    window.innerWidth = 1000;
    fireEvent(window, new Event("resize"));
    expect(screen.getAllByRole("table")).toHaveLength(3);
  });
  it("renders a header for each table", () => {
    render(<Stats />);
    const categories = screen.getAllByRole("heading", { level: 2 });
    expect(categories.map((category) => category.textContent)).toEqual([
      "Batting",
      "Baserunning",
      "Fielding",
    ]);
  });
  it("shows one stat table at a time for screens smaller than 990px", () => {
    render(<Stats />);
    initMobile();
    expect(screen.getAllByRole("table")).toHaveLength(1);
  });
  it("transitions between tables with a button on mobile devices", () => {
    render(<Stats />);
    initMobile();
    const nextButton = screen.getByRole("button", { name: "Next" });
    fireEvent.click(nextButton);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Baserunning"
    );
  });

  it("transitions between tables with a swipe on mobile devices");
  it("indicates team leader in a particular stat");
  it("displays full stat name tooltip on hover");
});
