import ReservationWidget from '../components/ReservationWidget';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8">
        {/* Hero Section */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Reserve Your Perfect
            <span className="block text-warm-orange">Dining Experience</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Book tables at premium restaurants with our seamless reservation system. 
            Choose your venue, select your preferences, and secure your perfect dining experience.
          </p>
          <div className="hidden lg:block">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warm-orange rounded-full"></div>
                Instant confirmation
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warm-orange rounded-full"></div>
                Premium venues
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-warm-orange rounded-full"></div>
                Special menus
              </div>
            </div>
          </div>
        </div>

        {/* Widget Section */}
        <div className="flex-shrink-0 w-full lg:w-auto">
          <ReservationWidget />
        </div>
      </div>
    </div>
  );
};

export default Index;
