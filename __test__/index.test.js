import Home from "../src/app/page";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";

describe("Todo App", () => {
    it("renders the todo app", () => {
        render(<Home />);

        // expect(screen.getByTestId("todo-input")).toBeInTheDocument();
        // expect(screen.getByTestId("add-todo")).toBeInTheDocument();
    });

});