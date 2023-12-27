import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "../src/App";

describe("app", () => {
  it("has a header", () => {
    render(<App />);
    const header = screen.getByRole("heading");
    expect(header).toBeVisible();
  });
  it("renders Hello World", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Hello World",
    );
  });
});
