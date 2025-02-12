"use client";

import Invoice from "@/components/Invoice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    <div id="instruction" className="container mx-auto px-4 py-8">
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

          <Accordion type="single" collapsible className="w-full mb-8">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold uppercase">
                Bank Aceh
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Account Name:
                  <span> Achmad Siddiq Maulidi</span>
                </p>
                <p>
                  Account Number: <strong>01002202111987</strong>
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-bold uppercase">
                Bank BSI
              </AccordionTrigger>
              <AccordionContent>
                <p>Account Name: Achmad Siddiq Maulidi</p>
                <p>
                  Account Number: <strong>7141713633</strong>
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-bold uppercase">
                Bank Mandiri
              </AccordionTrigger>
              <AccordionContent>
                <p>Account Name: Achmad Siddiq Maulidi</p>
                <p>
                  Acoount Number: <strong>1050018691679</strong>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <p className="mt-4 text-sm">
            After making the payment, please confirm by sending a image of the
            payment to: <br />
            WhatsApp / SMS :{" "}
            <Link
              href="https://wa.me/628990001664"
              target="_blank"
              className="text-primary text-2xl"
            >
              <Button variant="outline">+62 899 0001 664</Button>
            </Link>{" "}
            (Admin LUXIMA)
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => window.print()}>
              Print
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
