"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Invoice from "@/components/Invoice";

export default function BookingSuccess() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Booking Successful!</CardTitle>
          <CardDescription>
            Your booking has been confirmed. Booking ID: {bookingId}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Payment Instructions</h2>
          <p className="mb-2">
            Please make your payment to the following account:
          </p>
          <p>Account Name: LUXIMA Studio</p>
          <p>Account Number: 1234567890</p>
          <p>Bank: Example Bank</p>
          <p className="mt-4">
            After making the payment, please confirm by sending a screenshot of
            the payment to:
          </p>
          <p>WhatsApp: +1234567890</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.print()}>
            Print Instructions
          </Button>
          <Invoice bookingId={bookingId || ""} />
        </CardFooter>
      </Card>
    </div>
  );
}
