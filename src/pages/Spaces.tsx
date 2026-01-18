import { useState, useMemo } from 'react';
import { SpaceCard } from '@/components/SpaceCard';
import { SpaceFilter } from '@/components/SpaceFilter';
import { AdvancedFilters } from '@/components/AdvancedFilters';
import { SpaceModal } from '@/components/SpaceModal';
import { Header } from '@/components/Header';
import { spacesData, priceRange } from '@/data/spaces';
import { Space, SpaceStatus, AdvancedFilters as FiltersType } from '@/types/space';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

type FilterOption = SpaceStatus | 'all';

export default function Spaces() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<FiltersType>({
    city: 'all',
    area: 'all',
    minBudget: priceRange.min,
    maxBudget: priceRange.max,
  });

  const filteredSpaces = useMemo(() => {
    return spacesData.filter((space) => {
      // Status filter
      const matchesStatus = activeFilter === 'all' || space.status === activeFilter;
      
      // Search filter
      const matchesSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.area.toLowerCase().includes(searchQuery.toLowerCase());
      
      // City filter
      const matchesCity = advancedFilters.city === 'all' || space.city === advancedFilters.city;
      
      // Area filter
      const matchesArea = advancedFilters.area === 'all' || space.area === advancedFilters.area;
      
      // Budget filter
      const matchesBudget = space.priceValue >= advancedFilters.minBudget && 
                           space.priceValue <= advancedFilters.maxBudget;
      
      return matchesStatus && matchesSearch && matchesCity && matchesArea && matchesBudget;
    });
  }, [activeFilter, searchQuery, advancedFilters]);

  const counts = useMemo(() => {
    return {
      all: spacesData.length,
      available: spacesData.filter((s) => s.status === 'available').length,
      unavailable: spacesData.filter((s) => s.status === 'unavailable').length,
      booked: spacesData.filter((s) => s.status === 'booked').length,
      allotted: spacesData.filter((s) => s.status === 'allotted').length,
    };
  }, []);

  const handleSpaceClick = (space: Space) => {
    setSelectedSpace(space);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect{' '}
              <span className="gradient-text">Hackathon Space</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover and book the ideal workspace for your next hackathon. 
              From maker spaces to presentation halls, we have it all.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            <SpaceFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              counts={counts}
            />
            
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search spaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/30 border-border/50 focus:border-primary"
              />
            </div>
          </div>

          {/* Advanced Filters */}
          <AdvancedFilters 
            filters={advancedFilters} 
            onFiltersChange={setAdvancedFilters} 
          />
        </div>
      </section>

      {/* Spaces Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          {/* Results count */}
          <p className="text-muted-foreground mb-4">
            Showing {filteredSpaces.length} of {spacesData.length} spaces
          </p>

          {filteredSpaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSpaces.map((space, index) => (
                <div key={space.id} style={{ animationDelay: `${index * 100}ms` }}>
                  <SpaceCard space={space} onClick={handleSpaceClick} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">No spaces found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Space Modal */}
      <SpaceModal
        space={selectedSpace}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
