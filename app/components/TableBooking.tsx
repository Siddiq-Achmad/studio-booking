"use client";

import { useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BookingStatusFilter from "./BookingStatusFilter";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const validStatuses = ["PAID", "HALFPAID", "UNPAID", "CANCELED"] as const;

export default function TableBooking() {
  const [status, setStatus] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (status !== "ALL") params.append("status", status);

      const res = await fetch(`/api/bookings?${params.toString()}`);
      const data = await res.json();
      setBookings(data);
    };

    fetchBookings();
  }, [search, status]);

  const columns: ColumnDef<Booking>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "bookingDate", header: "Booking Date" },
    { accessorKey: "sessionType", header: "Session Type" },
    { accessorKey: "referralCode", header: "Referral Code" },
    { accessorKey: "status", header: "Status" },
  ];

  const table = useReactTable({
    data: bookings,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Booking List</h1>
      <div className="p-4 space-y-4 ">
        {/* Filter Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search by Name, Email, Phone, Referral Code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-2/3"
          />

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-1/3">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Payment Status</SelectLabel>
                <SelectItem value="ALL">ALL</SelectItem>
                {validStatuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
