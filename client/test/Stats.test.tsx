import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Stats } from "../src/features/Stats";

describe("Stats", () => {
  it("renders 'Player Statistics' as a header", () => {});
  it("renders a table for batting", () => {});
  it("renders a table for fielding", () => {});
  it("renders a table for base running", () => {});
  it("indicates team leader in a particular stat");
  it("renders as a slide for mobile devices");
  it("shows one stat table at a time for mobile devices");
  it("transitions between tables with a swipe on mobile devices");
  it("transitions between tables with a button on mobile devices");
  it("shows all three stat tables for desktop devices");
  it("displays full stat name on hover");
});
