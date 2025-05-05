import { fireEvent, render, screen } from '@testing-library/react';
import Counter from '../Counter';

describe("Counter components tets cases", () => {

    test("Snapshot for counter", () => {
        const { asFragment } = render(<Counter />);
        expect(asFragment()).toMatchSnapshot();
    });

    test("Intial State Check", () => {
        // Action.
        render(<Counter />);

        // Arrange for assertions.
        const counterText = screen.getByText("Count: 0");
        const plusText = screen.getByText("+");
        const minusText = screen.getByText("-");

        // Assertions.
        expect(counterText).toBeInTheDocument();
        expect(plusText).toBeInTheDocument();
        expect(minusText).toBeInTheDocument();
    });

    test("Increment state check", () => {
        // Action
        render(<Counter />);

        // Arrange for assertions.
        const plusText = screen.getByText("+");

        // Emulate one + click.
        fireEvent.click(plusText);

        // Assertions.
        const isOnePresent = screen.getByText("Count: 1");
        expect(isOnePresent).toBeInTheDocument();

        // Emulate one + click.
        fireEvent.click(plusText);

        // Assertions.
        const isTwoPresent = screen.getByText("Count: 2");
        expect(isTwoPresent).toBeInTheDocument();
    });

    test("Decrement state check", () => {
        // Action
        render(<Counter />);

        // Arrange for assertions.
        const minusText = screen.getByText("-");

        // Emulate one + click.
        fireEvent.click(minusText);

        // Assertions.
        const isMinusOnePresent = screen.getByText("Count: -1");
        expect(isMinusOnePresent).toBeInTheDocument();

        // Emulate one + click.
        fireEvent.click(minusText);

        // Assertions.
        const isMinusTwoPresent = screen.getByText("Count: -2");
        expect(isMinusTwoPresent).toBeInTheDocument();
    });
});