import { CalendarDays } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card py-8">
      <div className="container flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
          <CalendarDays className="h-5 w-5 text-accent" />
          IOMBookings
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} IOMBookings. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
