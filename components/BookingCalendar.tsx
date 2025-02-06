"use client"

import { useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const localizer = momentLocalizer(moment)

interface BookingEvent {
  id: number
  title: string
  start: Date
  end: Date
  paymentStatus: "paid" | "halfPaid" | "notPaid" | "downPayment"
}

const sampleBookings: BookingEvent[] = [
  {
    id: 1,
    title: "Portrait Session",
    start: new Date(2023, 5, 1, 10, 0),
    end: new Date(2023, 5, 1, 12, 0),
    paymentStatus: "paid",
  },
  {
    id: 2,
    title: "Wedding Shoot",
    start: new Date(2023, 5, 3, 14, 0),
    end: new Date(2023, 5, 3, 18, 0),
    paymentStatus: "halfPaid",
  },
  {
    id: 3,
    title: "Family Photo Session",
    start: new Date(2023, 5, 5, 11, 0),
    end: new Date(2023, 5, 5, 13, 0),
    paymentStatus: "notPaid",
  },
  {
    id: 4,
    title: "Product Photography",
    start: new Date(2023, 5, 7, 9, 0),
    end: new Date(2023, 5, 7, 11, 0),
    paymentStatus: "downPayment",
  },
]

const BookingCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<BookingEvent | null>(null)
  const router = useRouter()

  const eventStyleGetter = (event: BookingEvent) => {
    let backgroundColor = ""
    switch (event.paymentStatus) {
      case "paid":
        backgroundColor = "hsl(var(--success))" // Green
        break
      case "halfPaid":
        backgroundColor = "hsl(var(--warning))" // Amber
        break
      case "notPaid":
        backgroundColor = "hsl(var(--destructive))" // Red
        break
      case "downPayment":
        backgroundColor = "hsl(var(--primary))" // Blue
        break
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    }
  }

  const handleSelectEvent = (event: BookingEvent) => {
    setSelectedEvent(event)
  }

  const handleViewDetails = () => {
    if (selectedEvent) {
      router.push(`/bookings/${selectedEvent.id}`)
    }
  }

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div className="md:w-3/4 p-4">
        <Calendar
          localizer={localizer}
          events={sampleBookings}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
        />
      </div>
      <div className="md:w-1/4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedEvent ? (
              <div>
                <p>
                  <strong>Title:</strong> {selectedEvent.title}
                </p>
                <p>
                  <strong>Start:</strong> {moment(selectedEvent.start).format("MMMM D, YYYY h:mm A")}
                </p>
                <p>
                  <strong>End:</strong> {moment(selectedEvent.end).format("MMMM D, YYYY h:mm A")}
                </p>
                <p>
                  <strong>Payment Status:</strong> {selectedEvent.paymentStatus}
                </p>
                <Button onClick={handleViewDetails} className="mt-4">
                  View Full Details
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
                <div className="w-4 h-4 bg-success mr-2"></div>
                <span>Paid</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-warning mr-2"></div>
                <span>Half Paid</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-destructive mr-2"></div>
                <span>Not Paid</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-primary mr-2"></div>
                <span>Down Payment</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BookingCalendar

