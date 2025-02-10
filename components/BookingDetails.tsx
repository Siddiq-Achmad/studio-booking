"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  bookingDate: string;
  bookingTime: string;
  sessionType: string;
  referralCode?: string;
  status: string;
}

const BookingDetails = ({ bookingId }: { bookingId: string }) => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulating an API call to fetch booking details
    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/booking/${bookingId}`);
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Failed to fetch booking.");
          return;
        }

        setBooking(data);
      } catch (error) {
        console.error("Error fetching booking:", error);
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handleDownloadPDF = async () => {
    const response = await fetch(`/api/booking/${bookingId}/pdf`);
    if (!response.ok) {
      console.error("Failed to download PDF");
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice-${bookingId}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading)
    return (
      <div className=" p-8 w-full mx-auto text-center flex justify-center items-center">
        <h1 className="text-4xl font-bold p-6">Loading ... </h1>
        <p className="text-2xl font-light">| Fetching data </p>
      </div>
    );

  if (!booking)
    return <p className="text-center text-red-500">Booking not found.</p>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-500";
      case "HALFPAID":
        return "bg-yellow-500";
      case "UNPAID":
        return "bg-red-500";
      case "CANCELED":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div>
        <CardHeader>
          <CardTitle>Booking #{booking.id}</CardTitle>
          <CardDescription>
            Booking details and payment information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Customer Information</h3>
            <p>Name: {booking.name}</p>
            <p>Email: {booking.email}</p>
            <p>Phone: {booking.phone}</p>
          </div>
          <div>
            <h3 className="font-semibold">Session Details</h3>
            <p>
              Date:{" "}
              {booking.bookingDate
                ? format(new Date(booking.bookingDate), " E, dd MMMM yyyy")
                : ""}
            </p>
            <p>Time: {booking.bookingTime} WIB</p>
            <p>Session Type: {booking.sessionType}</p>
          </div>
          <div>
            <h3 className="font-semibold">Payment Information</h3>
            <p>Total Amount: Rp. 300.000</p>
            <p>Paid Amount: Rp. 0</p>
            <p>Remaining Balance: Rp. 300.000</p>
            <Badge className={`mt-2 ${getStatusColor(booking.status)}`}>
              {booking.status}
            </Badge>
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
        <Button onClick={handleDownloadPDF}>Download Invoice</Button>
      </CardFooter>
    </Card>
  );
};

export default BookingDetails;
