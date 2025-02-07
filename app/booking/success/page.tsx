import { Suspense } from "react";

import SuccessContent from "./success";

export default function BookingSuccess() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SuccessContent />
    </Suspense>
  );
}
