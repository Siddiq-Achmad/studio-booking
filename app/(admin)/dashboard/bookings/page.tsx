import TableBooking from "@/app/components/TableBooking";
import React from "react";

export default function DashboardBooking() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Booking List</h1>
      <TableBooking />
    </div>
  );
}
