import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Highlights } from "../src/features/Highlights";

describe("Highlights", () => {
  it("has a header", () => {
    render(<Highlights />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
  it("renders 'Highlights' as the header", () => {
    render(<Highlights />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Highlights"
    );
  });
});
