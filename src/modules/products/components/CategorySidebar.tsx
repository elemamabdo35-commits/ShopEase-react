import { cn } from "@shared/lib/utils";
import { useCategories } from "../hooks/useCategories";
import { Skeleton } from "@shared/components/ui/skeleton";

interface CategorySidebarProps {
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategorySidebar({ selected, onSelect }: CategorySidebarProps) {
  const { data: categories, isLoading } = useCategories();

  return (
    <aside className="w-full shrink-0 lg:w-56">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Categories
      </h2>

      {isLoading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      ) : (
        <ul className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          <li>
            <button
              onClick={() => onSelect(null)}
              className={cn(
                "w-full whitespace-nowrap rounded-md px-3 py-2 text-left text-sm transition-colors",
                selected === null ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              All Products
            </button>
          </li>
          {categories?.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() => onSelect(cat.slug)}
                className={cn(
                  "w-full whitespace-nowrap rounded-md px-3 py-2 text-left text-sm capitalize transition-colors",
                  selected === cat.slug ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
