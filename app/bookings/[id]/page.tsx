import BookingDetails from "@/components/BookingDetails";

interface BookingPageProps {
  params: {
    id: string;
  };
}
export default function BookingDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Booking Details</h1>
      <BookingDetails bookingId={params.id} />
    </div>
  );
}
