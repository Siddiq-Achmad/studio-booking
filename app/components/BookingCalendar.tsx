"use client";

import { useState, useEffect } from "react";
import moment from "moment";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Badge } from "@/components/ui/badge";

interface BookingEvent {
  event: any;
  id: string;
  name: string;
  bookingDate: string; // Format ISO (YYYY-MM-DD)
  bookingTime: string; // Format HH:mm:ss
  status: string;
  sessionType: string;
  className?: string;
}

const BookingCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<BookingEvent | null>(null);
  const [bookings, setBookings] = useState<BookingEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings");
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError("Error fetching bookings. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

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

  const events = bookings.map((booking) => ({
    id: booking.id,
    title: booking.name,

    start: `${
      booking.bookingDate
        ? moment(booking.bookingDate).format("YYYY-MM-DD HH:mm:ss")
        : ""
    }`, // Gabungkan tanggal dan waktu
    className: getStatusColor(booking.status),
    extendedProps: {
      status: booking.status,
      sessionType: booking.sessionType,
      className: getStatusColor(booking.status),
    },
  }));

  const handleSelectEvent = (eventInfo: any) => {
    setSelectedEvent(eventInfo);
    console.log(selectedEvent);
  };

  const handleViewDetails = () => {
    if (selectedEvent) {
      router.push(`/bookings/${selectedEvent.event.id}`);
    }
  };

  if (isLoading)
    return (
      <div className=" p-8 w-full h-[80vh] mx-auto text-center flex justify-center items-center">
        <h1 className="text-4xl font-bold p-6">Loading ... </h1>
        <p className="text-2xl font-light">| Fetching data </p>
      </div>
    );

  if (error) {
    return (
      <div className=" p-8 w-full h-[80vh] mx-auto text-center flex justify-center items-center">
        <h1 className="text-4xl font-bold p-6">Error </h1>
        <p className="text-2xl font-light">| {error}</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div className="md:w-3/4 p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          eventClick={(events) => handleSelectEvent(events)}
        />
      </div>
      <div className="md:w-1/4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedEvent && selectedEvent.event ? (
              <div className="flex flex-col gap-2">
                <div>
                  <strong>Name:</strong> {selectedEvent.event.title}
                </div>
                <div>
                  <strong>Booking Time:</strong>{" "}
                  <span>
                    {moment(selectedEvent.event.start).format("HH:mm")} WIB
                  </span>
                </div>
                <div>
                  <strong>Booking Date:</strong>{" "}
                  <span>
                    {moment(selectedEvent.event.start).format("MMMM D, YYYY")}
                  </span>
                </div>
                <div>
                  <strong>Payment Status:</strong>{" "}
                  <Badge
                    className={selectedEvent.event.extendedProps.className}
                  >
                    {selectedEvent.event.extendedProps.status}
                  </Badge>
                </div>
                <Button
                  onClick={handleViewDetails}
                  className="mt-4"
                  disabled={btnLoading}
                >
                  {btnLoading ? "Loading..." : "View Details"}
                </Button>
              </div>
            ) : (
              <p>Select an event to view details</p>
            )}
          </CardContent>
        </Card>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 mr-2"></div>
                <span>Paid</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 mr-2"></div>
                <span>Half Paid</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 mr-2"></div>
                <span>Not Paid</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-500 mr-2"></div>
                <span>Canceled</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingCalendar;
