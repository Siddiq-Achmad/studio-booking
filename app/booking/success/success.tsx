"use client";

import Invoice from "@/components/Invoice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const SuccessContent = () => {
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
          <p>Account Name: Achmad Siddiq Maulidi</p>
          <p>Account Number: 1234567890</p>
          <p>Bank: BSI </p>
          <p className="mt-4">
            After making the payment, please confirm by sending a image of the
            payment to: <br />
            WhatsApp / SMS :{" "}
            <Link
              href="https://wa.me/628990001664"
              target="_blank"
              className="text-primary text-2xl font-bold"
            >
              <Button variant="ghost">+62 899 0001 664</Button>
            </Link>
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => window.print()}>
              Print Instructions
            </Button>
            <Link href={`/booking/${bookingId}`}>
              <Button variant="outline">View Details</Button>
            </Link>
          </div>
          <Invoice bookingId={bookingId || ""} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default SuccessContent;
