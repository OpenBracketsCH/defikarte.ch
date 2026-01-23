import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

// currently failing tests, due to a lot of external dependencies in App.tsx
describe("App", () => {
    it("renders app", () => {
        render(<App />);
    });
    describe("App", () => {
        it("renders app", () => {
            render(<App />);
        });

        it("renders the Navbar by default", () => {
            render(<App />);
            expect(screen.getByRole("navigation")).toBeInTheDocument();
        });

        it("renders the Footer by default", () => {
            render(<App />);
            expect(screen.getByTestId("footer")).toBeInTheDocument();
        });

        it("renders NotFound page for unknown route", () => {
            window.history.pushState({}, "Test page", "/unknown-route");
            render(<App />);
            expect(screen.getByText(/not found/i)).toBeInTheDocument();
        });
    });
});