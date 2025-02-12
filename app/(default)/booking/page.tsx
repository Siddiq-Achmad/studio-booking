import BookingForm from "../../components/BookingForm";

export default function Booking() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
        Book Your Session
      </h1>
      <BookingForm />
    </div>
  );
}
