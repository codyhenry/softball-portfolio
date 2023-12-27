import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Bio } from "../src/features/Bio";

describe("bio", () => {
  it("has a header", () => {
    render(<Bio />);
    const header = screen.getByRole("heading");
    expect(header).toBeVisible();
  });
  it("renders Christina D'Agostino as the header", () => {
    render(<Bio />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Christina D'Agostino",
    );
  });
  it.skip("renders an image", () => {
    render(<Bio />);
    expect(
      screen.getByAltText("headshot", { exact: false }),
    ).toBeInTheDocument();
  });
  it.skip("renders a table", () => {
    render(<Bio />);
    expect(screen.getAllByRole("table")).toBeInTheDocument();
  });
  it.skip("displays a list of schools", () => {
    const schools = [
      { team: "St. Thomas Aquinas Raiders", position: "SS", number: 10 },
      { team: "Coral Springs Tigers", position: "P", number: 10 },
    ];
  });
});
