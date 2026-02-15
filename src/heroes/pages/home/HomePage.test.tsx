import { fireEvent, render, screen } from "@testing-library/react";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavoriteHeroProvider } from "@/heroes/context/FavoriteHeroContext";

vi.mock("../../hooks/usePaginatedHero");

const mockUsePaginatedHero = vi.mocked(usePaginatedHero);

mockUsePaginatedHero.mockReturnValue({
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: true,
} as unknown as ReturnType<typeof usePaginatedHero>);

const queryClient = new QueryClient();

const renderHomePage = (initialEntries: string[] = ["/"]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <FavoriteHeroProvider>
        <QueryClientProvider client={queryClient}>
          <HomePage />
        </QueryClientProvider>
      </FavoriteHeroProvider>
    </MemoryRouter>,
  );
};

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render HomePage with default values", () => {
    const { container } = renderHomePage();
    expect(container).toMatchSnapshot();
  });

  test("should call usePaginatedHero with default values", () => {
    renderHomePage();

    expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 6, "all");
  });

  test("should call usePaginatedHero with custom query params", () => {
    renderHomePage(["/?page=2&limit=10&category=hero"]);

    expect(mockUsePaginatedHero).toHaveBeenCalledWith(2, 10, "hero");
  });

  test("should called usePaginatedHero with default page and same limit on tab clicked", () => {
    renderHomePage(["/?tab=favorites&page=2&limit=10"]);

    const [, , heroesTab] = screen.getAllByRole("tab");
    fireEvent.click(heroesTab);
    expect(mockUsePaginatedHero).toHaveBeenCalledWith(1, 10, "hero");
  });
});
