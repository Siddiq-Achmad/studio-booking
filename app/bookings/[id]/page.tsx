import BookingDetails from "@/components/BookingDetails";

type Props = {
  params: Promise<{ id: string }>;
};
export default async function BookingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const bookingId = (await params).id;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Booking Details</h1>
      <BookingDetails bookingId={bookingId} />
    </div>
  );
}
