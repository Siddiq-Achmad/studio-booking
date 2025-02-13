type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  bookingDate: string;
  bookingTime: string;
  sessionType: string;
  referralCode?: string;
  status: "UNPAID" | "PAID" | "HALFPAID" | "CANCELED";
};
