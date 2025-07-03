import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { CheckCircle } from 'lucide-react';
import { Venue } from '../ReservationWidget';
import restaurant1 from '../../assets/restaurant-1.jpg';
import restaurant2 from '../../assets/restaurant-2.jpg';
import restaurant3 from '../../assets/restaurant-3.jpg';

interface VenueSelectionProps {
  selectedVenue?: Venue;
  onSelectVenue: (venue: Venue) => void;
  onNext: () => void;
}

const venues: Venue[] = [
  {
    id: '1',
    name: 'The Grand Bistro',
    description: 'Elegant fine dining with modern European cuisine and an extensive wine selection.',
    image: restaurant1,
  },
  {
    id: '2',
    name: 'Garden Terrace',
    description: 'Romantic outdoor dining with fresh seasonal dishes and artisanal cocktails.',
    image: restaurant2,
  },
  {
    id: '3',
    name: 'Rustic Table',
    description: 'Cozy family restaurant featuring traditional comfort food and warm hospitality.',
    image: restaurant3,
  },
];

export const VenueSelection: React.FC<VenueSelectionProps> = ({
  selectedVenue,
  onSelectVenue,
  onNext,
}) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Choose Your Restaurant
        </h3>
        <p className="text-muted-foreground">
          Select from our collection of premium dining venues
        </p>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {venues.map((venue) => (
          <Card
            key={venue.id}
            className={`cursor-pointer transition-bounce border-2 relative overflow-hidden ${
              selectedVenue?.id === venue.id
                ? 'border-warm-orange shadow-warm'
                : 'border-border hover:border-warm-orange/50 hover:shadow-card'
            }`}
            onClick={() => onSelectVenue(venue)}
          >
            <div className="flex items-center space-x-3 p-3">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                {selectedVenue?.id === venue.id && (
                  <div className="absolute inset-0 bg-warm-orange/80 flex items-center justify-center">
                    <CheckCircle className="text-primary-foreground w-6 h-6" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground truncate">
                  {venue.name}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {venue.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button
        variant="restaurant"
        className="w-full mt-6"
        onClick={onNext}
        disabled={!selectedVenue}
      >
        Continue to Booking Details
      </Button>
    </div>
  );
};