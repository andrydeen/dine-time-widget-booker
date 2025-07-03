import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { CheckCircle, Utensils, Star, Leaf } from 'lucide-react';

interface MenuSelectionProps {
  selectedOption?: string;
  onSelectOption: (option: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const menuOptions = [
  {
    id: 'standard',
    name: 'Standard Booking',
    description: 'Book a table with full access to our regular menu',
    icon: Utensils,
    price: 'No additional cost',
    features: ['Full à la carte menu', 'Regular seating', 'Standard service'],
  },
  {
    id: 'seasonal',
    name: 'Seasonal Menu',
    description: 'Chef\'s special seasonal tasting menu with wine pairing',
    icon: Leaf,
    price: '$85 per person',
    features: ['5-course tasting menu', 'Wine pairing included', 'Seasonal ingredients'],
  },
  {
    id: 'special',
    name: 'Premium Experience',
    description: 'Exclusive chef\'s table with personalized service',
    icon: Star,
    price: '$125 per person',
    features: ['Chef\'s table seating', '7-course premium menu', 'Complimentary champagne'],
  },
];

export const MenuSelection: React.FC<MenuSelectionProps> = ({
  selectedOption,
  onSelectOption,
  onNext,
  onPrev,
}) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Choose Your Experience
        </h3>
        <p className="text-muted-foreground">
          Select from our curated dining options
        </p>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {menuOptions.map((option) => {
          const IconComponent = option.icon;
          const isSelected = selectedOption === option.id;
          
          return (
            <Card
              key={option.id}
              className={`cursor-pointer transition-bounce border-2 relative ${
                isSelected
                  ? 'border-warm-orange shadow-warm bg-accent/30'
                  : 'border-border hover:border-warm-orange/50 hover:shadow-card'
              }`}
              onClick={() => onSelectOption(option.id)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-warm-orange text-primary-foreground' : 'bg-accent'}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {option.name}
                      </h4>
                      <p className="text-sm text-warm-orange font-medium">
                        {option.price}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <CheckCircle className="text-warm-orange w-5 h-5" />
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {option.description}
                </p>

                <div className="space-y-1">
                  {option.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1 h-1 bg-warm-orange rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button
          variant="restaurant"
          onClick={onNext}
          disabled={!selectedOption}
          className="flex-1"
        >
          Continue to Summary
        </Button>
      </div>
    </div>
  );
};