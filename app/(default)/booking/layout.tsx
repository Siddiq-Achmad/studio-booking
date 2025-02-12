import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}

function Loading() {
  return (
    <div className=" p-8 w-full h-[80vh] mx-auto text-center flex justify-center items-center">
      <h1 className="text-4xl font-bold p-6">Loading ... </h1>
      <p className="text-2xl font-light">| Please Wait </p>
    </div>
  );
}
