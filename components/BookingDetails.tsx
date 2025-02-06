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
import { usePDF } from "react-to-pdf";

interface BookingDetails {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  sessionType: string;
  paymentStatus: "paid" | "halfPaid" | "notPaid" | "downPayment";
  totalAmount: number;
  paidAmount: number;
}

const BookingDetails = ({ bookingId }: { bookingId: string }) => {
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const router = useRouter();
  const { toPDF, targetRef } = usePDF({ filename: "booking-invoice.pdf" });

  useEffect(() => {
    // Simulating an API call to fetch booking details
    const fetchBookingDetails = async () => {
      // Replace this with an actual API call in a real application
      const mockBooking: BookingDetails = {
        id: bookingId,
        customerName: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        date: "2023-06-15",
        time: "14:00",
        sessionType: "Portrait",
        paymentStatus: "halfPaid",
        totalAmount: 200,
        paidAmount: 100,
      };
      setBooking(mockBooking);
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-500";
      case "halfPaid":
        return "bg-yellow-500";
      case "notPaid":
        return "bg-red-500";
      case "downPayment":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div ref={targetRef}>
        <CardHeader>
          <CardTitle>Booking #{booking.id}</CardTitle>
          <CardDescription>
            Booking details and payment information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Customer Information</h3>
            <p>Name: {booking.customerName}</p>
            <p>Email: {booking.email}</p>
            <p>Phone: {booking.phone}</p>
          </div>
          <div>
            <h3 className="font-semibold">Session Details</h3>
            <p>Date: {booking.date}</p>
            <p>Time: {booking.time}</p>
            <p>Type: {booking.sessionType}</p>
          </div>
          <div>
            <h3 className="font-semibold">Payment Information</h3>
            <p>Total Amount: ${booking.totalAmount}</p>
            <p>Paid Amount: ${booking.paidAmount}</p>
            <p>
              Remaining Balance: ${booking.totalAmount - booking.paidAmount}
            </p>
            <Badge className={`mt-2 ${getStatusColor(booking.paymentStatus)}`}>
              {booking.paymentStatus}
            </Badge>
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
        <Button onClick={() => toPDF()}>Download Invoice</Button>
      </CardFooter>
    </Card>
  );
};

export default BookingDetails;
