import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const bookingStatus = ["PAID", "HALFPAID", "UNPAID", "CANCELED"] as const;

type BookingStatusFilterProps = {
  status: string | null;
  onChange: (value: string | null) => void;
};

export default function BookingStatusFilter({
  status,
  onChange,
}: BookingStatusFilterProps) {
  return (
    <Select
      value={status || ""}
      onValueChange={(value) => onChange(value || null)}
    >
      <SelectTrigger className="w-full md:w-1/4">
        <SelectValue placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">All Status</SelectItem>
        {""}
        {/* Pilihan Semua Status */}
        {bookingStatus.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
