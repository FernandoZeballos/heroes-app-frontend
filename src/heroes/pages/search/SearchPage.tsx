import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControl } from "./ui/SearchControl";
import { CustomBreadcrum } from "@/components/custom/CustomBreadcrum";
import { useQuery } from "@tanstack/react-query";
import { searchHerosAction } from "@/heroes/actions/search-heros.action";
import { useSearchParams } from "react-router";
import { HeroGrid } from "@/heroes/components/HeroGrid";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name") ?? undefined;
  const strength = Number(searchParams.get("strength")) || undefined;

  const { data: heroes = [] } = useQuery({
    queryKey: ["search", { name, strength }],
    queryFn: () => searchHerosAction({ name, strength }),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <>
      <CustomJumbotron
        title={"Busca tu Héroe"}
        description="Encuentra a tu héroe favorito"
      />

      <CustomBreadcrum
        currentPage="Buscador de heroes"
        // breadcrumbs={[
        //   { label: "home1", to: "/" },
        //   { label: "home2", to: "/search" },
        //   { label: "home3", to: "/" },
        // ]}
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Controls */}
      <SearchControl />

      <HeroGrid heroes={heroes} />
    </>
  );
};

export default SearchPage;
