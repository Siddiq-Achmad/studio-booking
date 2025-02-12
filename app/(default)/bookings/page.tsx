import BookingCalendar from "../../components/BookingCalendar";

export default function BookingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Booking Calendar</h1>
      <BookingCalendar />
    </div>
  );
}
