import { use } from "react";
import { describe, test, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  FavoriteHeroContext,
  FavoriteHeroProvider,
} from "./FavoriteHeroContext";
import type { Hero } from "../types/hero.interface";

const mockHero = {
  id: "1",
  name: "superman",
} as Hero;

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

const TestComponent = () => {
  const { favoriteCount, favorites, isFavorite, toggleFavorite } =
    use(FavoriteHeroContext);

  return (
    <div>
      <div data-testid="favorite-count">{favoriteCount}</div>

      <div data-testid="favorite-list">
        {favorites.map((hero) => (
          <div key={hero.id} data-testid={`hero-${hero.id}`}>
            {hero.name}
          </div>
        ))}
      </div>

      <button
        data-testid="toggle-favorite"
        onClick={() => toggleFavorite(mockHero)}
      >
        Toggle Favorite
      </button>
      <div data-testid="is-favorite">{isFavorite(mockHero).toString()}</div>
    </div>
  );
};

const renderContextTest = () => {
  return render(
    <FavoriteHeroProvider>
      <TestComponent />
    </FavoriteHeroProvider>,
  );
};

describe("FavoriteHeroContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should initialize with default values", () => {
    renderContextTest();

    expect(screen.getByTestId("favorite-count").textContent).toBe("0");
    expect(screen.getByTestId("favorite-list").children.length).toBe(0);
  });

  test("should add a hero to favorites when toggleFavorite is called with a new hero", async () => {
    renderContextTest();
    const button = screen.getByTestId("toggle-favorite");

    fireEvent.click(button);

    expect(screen.getByTestId("favorite-count").textContent).toBe("1");
    expect(screen.getByTestId("is-favorite").textContent).toBe("true");
    expect(screen.getByTestId("hero-1").textContent).toBe("superman");
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "favorites",
      '[{"id":"1","name":"superman"}]',
    );
  });

  test("should remove a hero from favorites when toggleFavorite is called", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([mockHero]));

    renderContextTest();
    expect(screen.getByTestId("favorite-count").textContent).toBe("1");
    expect(screen.getByTestId("is-favorite").textContent).toBe("true");
    expect(screen.getByTestId("hero-1").textContent).toBe("superman");

    const button = screen.getByTestId("toggle-favorite");
    fireEvent.click(button);

    expect(screen.getByTestId("favorite-count").textContent).toBe("0");
    expect(screen.getByTestId("is-favorite").textContent).toBe("false");
    expect(screen.queryByTestId("hero-1")).toBeNull();

    expect(localStorageMock.setItem).toHaveBeenCalled();
    expect(localStorageMock.setItem).toHaveBeenCalledWith("favorites", "[]");
  });
});
