"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import moment from "moment";
import { formatDateTime } from "@/lib/time";

const BookingForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const [referralCode, setReferralCode] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("ref");
    setReferralCode(code);
  }, [searchParams]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    instagram: "",
    bookingDate: new Date() as Date | undefined,
    bookingTime: "",
    sessionType: "",
    referralCode: referralCode ?? "-",
  });

  // Handler untuk update bookingTime & sinkronisasi dengan bookingDate
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = e.target.value; // Ambil waktu "HH:mm"

    if (formData.bookingDate) {
      const [hours, minutes] = time.split(":").map(Number);
      const updatedDate = new Date(formData.bookingDate);
      updatedDate.setHours(hours);
      updatedDate.setMinutes(minutes);

      setFormData({
        ...formData,
        bookingTime: time,
        bookingDate: updatedDate, // Update bookingDate dengan jam baru
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Validasi Date & Time
    if (!formData.bookingDate) {
      toast.error("Please select a booking date.");
      setLoading(false);
      return;
    }

    const selectedDate = new Date(
      `${format(formData.bookingDate, "yyyy-MM-dd")}T${formData.bookingTime}`
    );
    const now = new Date();
    if (selectedDate <= now) {
      toast.error("Please select a future date and time for your booking.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Booking successful!");
        router.push(`/booking/success?id=${data.booking.id}`);
        console.log(data);
      } else {
        toast.error(data.error || "Booking failed.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between mb-4">
            Book Your Session{" "}
            {referralCode && <span>Ref. {referralCode} </span>}
          </CardTitle>
          <CardDescription>
            Fill out the form below to schedule your photography session
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@luxima.id"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="08123456789"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp (optional)</Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                value={formData.whatsapp}
                placeholder="08123456789"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram (optional)</Label>
              <Input
                id="instagram"
                name="instagram"
                value={formData.instagram}
                placeholder="@john_doe"
                onChange={handleChange}
              />
            </div>

            {/* Booking Date Picker */}
            <div className="space-y-2">
              <Label htmlFor="bookingDate">Booking Date</Label>
              <div className="flex justify-start items-center space-x-2 w-full">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-lg justify-start text-left font-normal",
                        !formData.bookingDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.bookingDate ? (
                        format(formData.bookingDate, "PPP")
                      ) : (
                        <span className="text-sm">Select Date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      id="bookingDate"
                      mode="single"
                      selected={formData.bookingDate as Date}
                      onSelect={(date) =>
                        setFormData((prev) => ({
                          ...prev,
                          bookingDate: date,
                        }))
                      }
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Booking Time Picker */}
            <div className="space-y-2">
              <Label htmlFor="bookingTime">Booking Time</Label>
              <div className="flex justify-start items-center space-x-2 w-full">
                <Input
                  id="bookingTime"
                  name="bookingTime"
                  type="time"
                  value={formData.bookingTime}
                  onChange={handleTimeChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionType">Session Type</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("sessionType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a session type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="graduation">Graduation</SelectItem>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-full mt-4"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary"></div>
                  <span className="ml-2">Loading...</span>
                </div>
              ) : (
                "Book Now"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BookingForm;
