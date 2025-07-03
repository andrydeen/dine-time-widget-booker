import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Calendar, Clock, Users, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { BookingData } from '../ReservationWidget';

interface BookingSummaryProps {
  bookingData: BookingData;
  onUpdateData: (data: Partial<BookingData>) => void;
  onPrev: () => void;
}

const menuOptionNames = {
  standard: 'Standard Booking',
  seasonal: 'Seasonal Menu',
  special: 'Premium Experience',
};

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  bookingData,
  onUpdateData,
  onPrev,
}) => {
  const [contactMethod, setContactMethod] = useState<'phone' | 'email'>('phone');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleContactInfoChange = (field: 'phone' | 'email', value: string) => {
    onUpdateData({
      contactInfo: {
        ...bookingData.contactInfo,
        [field]: value,
      },
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsComplete(true);
  };

  const isFormValid = contactMethod === 'phone' 
    ? bookingData.contactInfo?.phone 
    : bookingData.contactInfo?.email;

  if (isComplete) {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="w-16 h-16 bg-gradient-warm rounded-full mx-auto flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Booking Confirmed!
          </h3>
          <p className="text-muted-foreground">
            Your reservation has been successfully submitted. We'll send you a confirmation shortly.
          </p>
        </div>
        <Button
          variant="restaurant"
          onClick={() => window.location.reload()}
          className="w-full"
        >
          Make Another Reservation
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Booking Summary
        </h3>
        <p className="text-muted-foreground">
          Review your details and complete your reservation
        </p>
      </div>

      {/* Booking Details */}
      <Card className="p-4 bg-accent/30">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-warm-orange" />
            <span className="font-medium">{bookingData.venue?.name}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-warm-orange" />
            <span>{bookingData.date ? format(bookingData.date, 'EEEE, MMMM do, yyyy') : ''}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-warm-orange" />
            <span>{bookingData.time} ({bookingData.duration} {parseFloat(bookingData.duration || '1') === 1 ? 'hour' : 'hours'})</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-warm-orange" />
            <span>{bookingData.guests} {bookingData.guests === 1 ? 'Guest' : 'Guests'}</span>
          </div>

          <Separator />
          
          <div className="font-medium">
            {menuOptionNames[bookingData.menuOption as keyof typeof menuOptionNames]}
          </div>
        </div>
      </Card>

      {/* Contact Information */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Contact Information</Label>
        
        <RadioGroup
          value={contactMethod}
          onValueChange={(value) => setContactMethod(value as 'phone' | 'email')}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="phone" />
            <Label htmlFor="phone" className="flex items-center gap-2 cursor-pointer">
              <Phone className="w-4 h-4" />
              Phone
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email" />
            <Label htmlFor="email" className="flex items-center gap-2 cursor-pointer">
              <Mail className="w-4 h-4" />
              Email
            </Label>
          </div>
        </RadioGroup>

        {contactMethod === 'phone' ? (
          <div className="space-y-2">
            <Label htmlFor="phone-input">Phone Number</Label>
            <Input
              id="phone-input"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={bookingData.contactInfo?.phone || ''}
              onChange={(e) => handleContactInfoChange('phone', e.target.value)}
            />
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="email-input">Email Address</Label>
            <Input
              id="email-input"
              type="email"
              placeholder="your@email.com"
              value={bookingData.contactInfo?.email || ''}
              onChange={(e) => handleContactInfoChange('email', e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button
          variant="restaurant"
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? 'Processing...' : 'Complete Booking'}
        </Button>
      </div>
    </div>
  );
};