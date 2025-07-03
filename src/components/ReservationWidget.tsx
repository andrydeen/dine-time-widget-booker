import React, { useState } from 'react';
import { VenueSelection } from './reservation/VenueSelection';
import { BookingDetails } from './reservation/BookingDetails';
import { MenuSelection } from './reservation/MenuSelection';
import { BookingSummary } from './reservation/BookingSummary';
import { Card } from './ui/card';

export interface Venue {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface BookingData {
  venue?: Venue;
  guests: number;
  date?: Date;
  time?: string;
  duration?: string;
  menuOption?: string;
  contactInfo?: {
    phone?: string;
    email?: string;
  };
}

const ReservationWidget = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    guests: 2,
  });

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <VenueSelection
            selectedVenue={bookingData.venue}
            onSelectVenue={(venue) => updateBookingData({ venue })}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <BookingDetails
            bookingData={bookingData}
            onUpdateData={updateBookingData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <MenuSelection
            selectedOption={bookingData.menuOption}
            onSelectOption={(menuOption) => updateBookingData({ menuOption })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <BookingSummary
            bookingData={bookingData}
            onUpdateData={updateBookingData}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-[600px]">
      <Card className="overflow-hidden shadow-card bg-gradient-card border-warm-orange/20">
        {/* Progress indicator */}
        <div className="bg-gradient-warm p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-primary-foreground">
              Reserve Your Table
            </h2>
            <span className="text-sm text-primary-foreground/80">
              Step {currentStep} of 4
            </span>
          </div>
          <div className="w-full bg-primary-foreground/20 rounded-full h-2">
            <div
              className="bg-primary-foreground h-2 rounded-full transition-smooth"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="p-6 animate-fade-in">
          {renderStep()}
        </div>
      </Card>
    </div>
  );
};

export default ReservationWidget;