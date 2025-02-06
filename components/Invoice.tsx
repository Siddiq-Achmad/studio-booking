"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePDF } from "react-to-pdf";

interface InvoiceProps {
  bookingId: string;
}

const Invoice: React.FC<InvoiceProps> = ({ bookingId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toPDF, targetRef } = usePDF({ filename: `invoice-${bookingId}.pdf` });

  // In a real application, you would fetch this data from your backend
  const invoiceData = {
    id: bookingId,
    date: new Date().toLocaleDateString(),
    customerName: "John Doe",
    sessionType: "Portrait",
    amount: 200,
  };

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
          <div ref={targetRef} className="p-6">
            <h2 className="text-2xl font-bold mb-4">LUXIMA Studio</h2>
            <div className="mb-4">
              <p>Invoice #: {invoiceData.id}</p>
              <p>Date: {invoiceData.date}</p>
            </div>
            <div className="mb-4">
              <p>Customer: {invoiceData.customerName}</p>
              <p>Session Type: {invoiceData.sessionType}</p>
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
                  <td>{invoiceData.sessionType} Session</td>
                  <td className="text-right">
                    ${invoiceData.amount.toFixed(2)}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td className="font-bold">Total</td>
                  <td className="text-right font-bold">
                    ${invoiceData.amount.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
            <p className="text-sm">Thank you for your business!</p>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button onClick={() => toPDF()}>Download PDF</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Invoice;
