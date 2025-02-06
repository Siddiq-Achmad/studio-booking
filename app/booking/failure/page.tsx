import Link from "next/link";
import { Button } from "@/components/ui/button";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function BookingFailure() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Alert className="max-w-2xl mx-auto mb-8" variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="text-lg font-semibold">
          Booking Failed
        </AlertTitle>
        <AlertDescription>
          {`We're sorry, but we couldn't process your booking at this time.`}
          <p>This could be due to the following reasons:</p>
          <ul className="list-disc list-inside mt-2">
            <li>The selected time slot is no longer available</li>
            <li>There was an issue with our booking system</li>
            <li>The studio is fully booked for the selected date</li>
          </ul>
          <p className="mt-4">
            Please try booking again or contact our support team for assistance.
          </p>
          <div className="flex justify-end mt-4">
            <Button asChild>
              <Link href="/booking">Try Again</Link>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
      <Alert className="max-w-2xl mx-auto mb-8" variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="text-lg font-semibold">Booking Gagal</AlertTitle>
        <AlertDescription>
          Mohon maaf, booking anda tidak dapat diproses saat ini.
          <p>Hal ini mungkin disebabkan oleh alasan berikut:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Slot waktu yang dipilih tidak lagi tersedia</li>
            <li>Ada masalah dengan sistem pemesanan kami</li>
            <li>Studio sudah penuh dipesan untuk tanggal yang dipilih</li>
          </ul>
          <p className="mt-4">
            Silakan coba memesan lagi atau hubungi tim dukungan kami untuk
            mendapatkan bantuan.
          </p>
          <div className="flex justify-end mt-4">
            <Button asChild>
              <Link href="/booking">Silahkan Coba Lagi</Link>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
