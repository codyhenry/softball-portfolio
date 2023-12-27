import "@testing-library/jest-dom/vitest";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Bio } from "../src/features/Bio";

describe("bio", () => {
  it("has a header", () => {
    render(<Bio />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
  it("renders Christina D'Agostino as the header", () => {
    render(<Bio />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Christina D'Agostino"
    );
  });
  it("displays the correct grade level", () => {
    render(<Bio />);
    expect(screen.getByText("Sophomore")).toBeInTheDocument();
  });
  it("renders a table", () => {
    render(<Bio />);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
  it("displays a list of schools", () => {
    const schools = [
      { team: "St. Thomas Aquinas Raiders", position: "SS", number: 10 },
      { team: "Coral Springs Tigers", position: "P", number: 10 },
    ];
    render(<Bio schools={schools} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(3);
    expect(
      within(rows[1]).getByText("St. Thomas Aquinas Raiders")
    ).toBeInTheDocument();
  });
  it.skip("renders an image", () => {
    render(<Bio />);
    expect(
      screen.getByAltText("headshot", { exact: false })
    ).toBeInTheDocument();
  });
});
