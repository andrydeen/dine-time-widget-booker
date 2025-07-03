import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Label } from '../ui/label';
import { CalendarIcon, Minus, Plus, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';
import { BookingData } from '../ReservationWidget';

interface BookingDetailsProps {
  bookingData: BookingData;
  onUpdateData: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const timeSlots = [
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
];

const durations = [
  { value: '1', label: '1 hour' },
  { value: '1.5', label: '1.5 hours' },
  { value: '2', label: '2 hours' },
  { value: '2.5', label: '2.5 hours' },
];

export const BookingDetails: React.FC<BookingDetailsProps> = ({
  bookingData,
  onUpdateData,
  onNext,
  onPrev,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const updateGuests = (increment: boolean) => {
    const newGuests = increment 
      ? Math.min(bookingData.guests + 1, 12)
      : Math.max(bookingData.guests - 1, 1);
    onUpdateData({ guests: newGuests });
  };

  const isFormValid = bookingData.date && bookingData.time && bookingData.duration;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Booking Details
        </h3>
        <p className="text-muted-foreground">
          {bookingData.venue?.name}
        </p>
      </div>

      {/* Number of Guests */}
      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Users className="w-4 h-4" />
          Number of Guests
        </Label>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="elegant"
              size="sm"
              onClick={() => updateGuests(false)}
              disabled={bookingData.guests <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-lg font-semibold px-4">
              {bookingData.guests} {bookingData.guests === 1 ? 'Guest' : 'Guests'}
            </span>
            <Button
              variant="elegant"
              size="sm"
              onClick={() => updateGuests(true)}
              disabled={bookingData.guests >= 12}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Date Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" />
          Select Date
        </Label>
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="elegant"
              className={cn(
                "w-full justify-start text-left font-normal",
                !bookingData.date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {bookingData.date ? format(bookingData.date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={bookingData.date}
              onSelect={(date) => {
                onUpdateData({ date });
                setIsCalendarOpen(false);
              }}
              disabled={(date) => date < new Date()}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Select Time
        </Label>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((time) => (
            <Button
              key={time}
              variant={bookingData.time === time ? "restaurant" : "elegant"}
              size="sm"
              onClick={() => onUpdateData({ time })}
              className="text-xs"
            >
              {time}
            </Button>
          ))}
        </div>
      </div>

      {/* Duration Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Duration</Label>
        <div className="grid grid-cols-2 gap-2">
          {durations.map((duration) => (
            <Button
              key={duration.value}
              variant={bookingData.duration === duration.value ? "restaurant" : "elegant"}
              size="sm"
              onClick={() => onUpdateData({ duration: duration.value })}
            >
              {duration.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          Back
        </Button>
        <Button
          variant="restaurant"
          onClick={onNext}
          disabled={!isFormValid}
          className="flex-1"
        >
          Continue to Menu
        </Button>
      </div>
    </div>
  );
};