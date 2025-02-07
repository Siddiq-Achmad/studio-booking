import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AnimatedHero from "./components/AnimatedHero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-12">
      <AnimatedHero />
      <section className="text-center mb-12 h-[20vh] flex flex-col justify-center my-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Welcome to LUXIMA Studio
        </h1>
        <p className="text-xl text-muted-foreground">
          Capture your moments in stunning elegance
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div className="relative h-96">
          <Image
            src="https://luxima.id/images/SQA03332.jpg"
            alt="Studio sample"
            fill
            className="object-cover rounded-lg shadow-lg w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Experience Professional Photography
          </h2>
          <p className="text-muted-foreground mb-6">
            At LUXIMA Studio, we bring your vision to life with state-of-the-art
            equipment and expert photographers.
          </p>
          <Button asChild>
            <Link href="/booking">Book Your Session</Link>
          </Button>
        </div>
      </section>

      <section className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-foreground mb-4">
          Why Choose LUXIMA?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[
            {
              title: "Professional Equipment",
              description:
                "Top-of-the-line cameras and lighting for the best results",
            },
            {
              title: "Expert Photographers",
              description:
                "Skilled professionals to guide you through your session",
            },
            {
              title: "Beautiful Studio Space",
              description:
                "Versatile and elegant settings for any type of shoot",
            },
          ].map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-semibold text-foreground mb-4">
          Ready to Capture Your Moments?
        </h2>
        <Button asChild>
          <Link href="/booking">Start Your Journey</Link>
        </Button>
      </section>
    </div>
  );
}
