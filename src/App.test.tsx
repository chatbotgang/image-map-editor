import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders two panes", () => {
    render(<App />);
    const imagePreviewPaneElement = screen.getByText(/Upload Image/i);
    expect(imagePreviewPaneElement).toBeInTheDocument();

    const dataPreviewPaneElement = screen.getByText(/\[\]/i);
    expect(dataPreviewPaneElement).toBeInTheDocument();
});
