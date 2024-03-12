import { render, screen } from "@testing-library/react";
import App from "./App";

test("loads app", async () => {
    render(<App />);
    const containerElement = screen.getByTestId("container");
    expect(containerElement).toBeInTheDocument();
});
