import { useState, useEffect } from 'react';
import { Sponsor, SponsorFormData, SponsorTier } from '@/types/sponsor';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cities, areas } from '@/data/sponsors';
import { Save, X } from 'lucide-react';

interface SponsorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: SponsorFormData, isActive: boolean, id?: string) => void;
  editingSponsor?: Sponsor | null;
}

const initialFormData: SponsorFormData = {
  name: '',
  logo: '',
  tier: 'bronze',
  area: '',
  city: '',
  website: '',
  description: '',
  contactEmail: '',
  contactPhone: '',
  contribution: 0
};

export const SponsorForm = ({ isOpen, onClose, onSave, editingSponsor }: SponsorFormProps) => {
  const [formData, setFormData] = useState<SponsorFormData>(initialFormData);
  const [isActive, setIsActive] = useState(true);
  const [availableAreas, setAvailableAreas] = useState<string[]>(['All Areas']);

  useEffect(() => {
    if (editingSponsor) {
      setFormData({
        name: editingSponsor.name,
        logo: editingSponsor.logo,
        tier: editingSponsor.tier,
        area: editingSponsor.area,
        city: editingSponsor.city,
        website: editingSponsor.website,
        description: editingSponsor.description,
        contactEmail: editingSponsor.contactEmail,
        contactPhone: editingSponsor.contactPhone,
        contribution: editingSponsor.contribution
      });
      setIsActive(editingSponsor.isActive);
      setAvailableAreas(areas[editingSponsor.city] || ['All Areas']);
    } else {
      setFormData(initialFormData);
      setIsActive(true);
      setAvailableAreas(['All Areas']);
    }
  }, [editingSponsor, isOpen]);

  const handleCityChange = (city: string) => {
    setFormData(prev => ({ ...prev, city, area: '' }));
    setAvailableAreas(areas[city] || ['All Areas']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, isActive, editingSponsor?.id);
    onClose();
  };

  const handleInputChange = (field: keyof SponsorFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            {editingSponsor ? 'Edit Sponsor' : 'Add New Sponsor'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter company name"
                required
                className="bg-secondary/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL *</Label>
              <Input
                id="logo"
                value={formData.logo}
                onChange={(e) => handleInputChange('logo', e.target.value)}
                placeholder="https://example.com/logo.png"
                required
                className="bg-secondary/30"
              />
            </div>
          </div>

          {/* Tier & Contribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tier">Sponsor Tier *</Label>
              <Select 
                value={formData.tier} 
                onValueChange={(value: SponsorTier) => handleInputChange('tier', value)}
              >
                <SelectTrigger className="bg-secondary/30">
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="platinum">🏆 Platinum</SelectItem>
                  <SelectItem value="gold">🥇 Gold</SelectItem>
                  <SelectItem value="silver">🥈 Silver</SelectItem>
                  <SelectItem value="bronze">🥉 Bronze</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contribution">Contribution Amount (₹) *</Label>
              <Input
                id="contribution"
                type="number"
                value={formData.contribution}
                onChange={(e) => handleInputChange('contribution', Number(e.target.value))}
                placeholder="500000"
                required
                min={0}
                className="bg-secondary/30"
              />
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Select value={formData.city} onValueChange={handleCityChange}>
                <SelectTrigger className="bg-secondary/30">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.filter(c => c !== 'All Cities').map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Area *</Label>
              <Select 
                value={formData.area} 
                onValueChange={(value) => handleInputChange('area', value)}
                disabled={!formData.city}
              >
                <SelectTrigger className="bg-secondary/30">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  {availableAreas.filter(a => a !== 'All Areas').map(area => (
                    <SelectItem key={area} value={area}>{area}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email *</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                placeholder="contact@company.com"
                required
                className="bg-secondary/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone *</Label>
              <Input
                id="contactPhone"
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                placeholder="+91 9876543210"
                required
                className="bg-secondary/30"
              />
            </div>
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://company.com"
              className="bg-secondary/30"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description about the sponsor..."
              rows={3}
              className="bg-secondary/30 resize-none"
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
            <div>
              <Label htmlFor="isActive" className="text-base font-medium">Active Status</Label>
              <p className="text-sm text-muted-foreground">Enable to show sponsor on public pages</p>
            </div>
            <Switch
              id="isActive"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="gap-2">
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button type="submit" variant="glow" className="gap-2">
              <Save className="w-4 h-4" />
              {editingSponsor ? 'Update Sponsor' : 'Add Sponsor'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
