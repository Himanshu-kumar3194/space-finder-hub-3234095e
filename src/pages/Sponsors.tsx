import { useState, useMemo } from 'react';
import { Sponsor, SponsorFormData } from '@/types/sponsor';
import { initialSponsors } from '@/data/sponsors';
import { Header } from '@/components/Header';
import { SponsorCard } from '@/components/sponsors/SponsorCard';
import { SponsorForm } from '@/components/sponsors/SponsorForm';
import { SponsorFilters } from '@/components/sponsors/SponsorFilters';
import { SponsorStats } from '@/components/sponsors/SponsorStats';
import { DeleteConfirmDialog } from '@/components/sponsors/DeleteConfirmDialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus, Sparkles } from 'lucide-react';

const Sponsors = () => {
  const { toast } = useToast();
  const [sponsors, setSponsors] = useState<Sponsor[]>(initialSponsors);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sponsorToDelete, setSponsorToDelete] = useState<Sponsor | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [selectedTier, setSelectedTier] = useState('all');

  const filteredSponsors = useMemo(() => {
    return sponsors.filter(sponsor => {
      const matchesSearch = sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sponsor.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = selectedCity === 'All Cities' || sponsor.city === selectedCity;
      const matchesArea = selectedArea === 'All Areas' || sponsor.area === selectedArea;
      const matchesTier = selectedTier === 'all' || sponsor.tier === selectedTier;

      return matchesSearch && matchesCity && matchesArea && matchesTier;
    });
  }, [sponsors, searchQuery, selectedCity, selectedArea, selectedTier]);

  const handleAddSponsor = () => {
    setEditingSponsor(null);
    setIsFormOpen(true);
  };

  const handleEditSponsor = (sponsor: Sponsor) => {
    setEditingSponsor(sponsor);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    const sponsor = sponsors.find(s => s.id === id);
    if (sponsor) {
      setSponsorToDelete(sponsor);
      setDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (sponsorToDelete) {
      setSponsors(prev => prev.filter(s => s.id !== sponsorToDelete.id));
      toast({
        title: "Sponsor Deleted",
        description: `${sponsorToDelete.name} has been removed successfully.`,
        variant: "destructive"
      });
      setSponsorToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleSaveSponsor = (formData: SponsorFormData, isActive: boolean, id?: string) => {
    if (id) {
      // Update existing sponsor
      setSponsors(prev => prev.map(s => 
        s.id === id 
          ? { ...s, ...formData, isActive }
          : s
      ));
      toast({
        title: "Sponsor Updated",
        description: `${formData.name} has been updated successfully.`,
      });
    } else {
      // Add new sponsor
      const newSponsor: Sponsor = {
        ...formData,
        id: Date.now().toString(),
        isActive,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setSponsors(prev => [newSponsor, ...prev]);
      toast({
        title: "Sponsor Added",
        description: `${formData.name} has been added successfully.`,
      });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('All Cities');
    setSelectedArea('All Areas');
    setSelectedTier('all');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Sponsor Management</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Manage Your</span>
              <br />
              <span className="text-foreground">Hackathon Sponsors</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Add, edit, and organize sponsors by city, area, and tier. 
              Keep track of contributions and maintain sponsor relationships.
            </p>
            
            <Button variant="glow" size="lg" onClick={handleAddSponsor} className="gap-2">
              <Plus className="w-5 h-5" />
              Add New Sponsor
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 pb-8">
        <div className="container mx-auto">
          <SponsorStats sponsors={sponsors} />
        </div>
      </section>

      {/* Filters Section */}
      <section className="px-4 pb-8">
        <div className="container mx-auto">
          <SponsorFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
            selectedArea={selectedArea}
            onAreaChange={setSelectedArea}
            selectedTier={selectedTier}
            onTierChange={setSelectedTier}
            onReset={handleResetFilters}
          />
        </div>
      </section>

      {/* Sponsors Grid */}
      <section className="px-4 pb-16">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              {filteredSponsors.length} Sponsor{filteredSponsors.length !== 1 ? 's' : ''} Found
            </h2>
          </div>

          {filteredSponsors.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSponsors.map(sponsor => (
                <SponsorCard
                  key={sponsor.id}
                  sponsor={sponsor}
                  onEdit={handleEditSponsor}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No sponsors found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or add a new sponsor.
              </p>
              <Button variant="outline" onClick={handleAddSponsor} className="gap-2">
                <Plus className="w-4 h-4" />
                Add First Sponsor
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Form Modal */}
      <SponsorForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveSponsor}
        editingSponsor={editingSponsor}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        sponsorName={sponsorToDelete?.name || ''}
      />
    </div>
  );
};

export default Sponsors;
