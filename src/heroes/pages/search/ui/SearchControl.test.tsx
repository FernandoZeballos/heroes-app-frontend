import { fireEvent, render, screen } from "@testing-library/react";
import { SearchControl } from "./SearchControl";
import { MemoryRouter, useSearchParams } from "react-router";

if (typeof window.ResizeObserver === "undefined") {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserver;
}

const TestComponent = () => {
  const [searchParams] = useSearchParams();
  return (
    <>
      <SearchControl />
      <div data-testid="search-params">{searchParams.toString()}</div>
    </>
  );
};

const renderWithRouter = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <TestComponent />
    </MemoryRouter>,
  );
};

describe("SearchControl", () => {
  test("should renders SearchControl with default values", () => {
    const { container } = renderWithRouter();

    expect(container).toMatchSnapshot();
  });

  test("should set input value when search param name is set", () => {
    renderWithRouter(["/?name=superman"]);

    const input = screen.getByPlaceholderText(
      "Search heroes, villains, powers, teams...",
    );
    expect(input.getAttribute("value")).toBe("superman");
  });

  test("should change params when input is changed and enter is pressed", () => {
    renderWithRouter(["/?name=superman"]);

    const input = screen.getByPlaceholderText(
      "Search heroes, villains, powers, teams...",
    );
    expect(input.getAttribute("value")).toBe("superman");

    fireEvent.change(input, { target: { value: "Batman" } });
    fireEvent.keyDown(input, { key: "Enter" });

    // The component updates the URL params, which triggers a re-render.
    // We check the helper component which displays the params.
    expect(screen.getByTestId("search-params").textContent).toContain(
      "name=Batman",
    );
  });

  test("should change params strength when slider is changed", () => {
    renderWithRouter(["/?name=Superman&active-accordion=advanced-filters"]);

    const slider = screen.getByRole("slider");
    expect(slider.getAttribute("aria-valuenow")).toBe("0");
    fireEvent.keyDown(slider, { key: "ArrowRight" });

    expect(slider.getAttribute("aria-valuenow")).toBe("1");
  });

  test("should accordion be open when active-accordion param is set", () => {
    renderWithRouter(["/?name=superman&active-accordion=advanced-filters"]);

    const accordion = screen.getByTestId("accordion");
    const accordionItem = accordion.querySelector("div");
    expect(accordionItem?.getAttribute("data-state")).toBe("open");
  });

  test("should accordion be close when active-accordion param is not set", () => {
    renderWithRouter(["/?name=superman"]);

    const accordion = screen.getByTestId("accordion");
    const accordionItem = accordion.querySelector("div");
    expect(accordionItem?.getAttribute("data-state")).not.toBe("open");
  });
});
