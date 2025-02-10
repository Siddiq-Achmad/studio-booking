"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import moment from "moment";

interface InvoiceProps {
  bookingId: string;
}

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

const Invoice: React.FC<InvoiceProps> = ({ bookingId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const response = await fetch(`/api/booking/${bookingId}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setBooking(data);
      } catch (error) {
        console.error("Error fetching booking:", error);
      } finally {
        setLoading(false);
      }
    }

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

  if (loading) return <p>Loading invoice...</p>;
  if (!booking) return <p>Booking not found.</p>;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>View Invoice</Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Invoice</DialogTitle>
            <DialogDescription>
              Invoice for booking {bookingId}
            </DialogDescription>
          </DialogHeader>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">LUXIMA Studio</h2>
            <div className="mb-4">
              <p>Invoice #: {booking.id}</p>
              <p>Date: {moment(new Date()).format("DD MMMM YYYY")}</p>
            </div>
            <div className="mb-4">
              <p>Customer: {booking.name}</p>
              <p>Session Type: {booking.sessionType}</p>
            </div>
            <table className="w-full mb-4">
              <thead>
                <tr>
                  <th className="text-left">Description</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{booking.sessionType} Session</td>
                  <td className="text-right">Rp. 300.000</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td className="font-bold">Total</td>
                  <td className="text-right font-bold">Rp. 300.000</td>
                </tr>
              </tfoot>
            </table>
            <p className="text-sm">Thank you for your business!</p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button onClick={handleDownloadPDF}>Download PDF</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Invoice;
