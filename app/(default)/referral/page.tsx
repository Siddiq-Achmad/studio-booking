import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ReferralSystem from "../../components/ReferralSystem";
import { Gift, Users, Coins, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Gift,
    title: "Give $50, Get 12%",
    description:
      "When your friend books their first studio session, they get $50 off. After their session, you'll receive $50 in StudioSpot credits.",
  },
  {
    icon: Users,
    title: "Unlimited Referrals",
    description:
      "There's no limit to how many friends you can refer. The more friends you bring, the more rewards you earn.",
  },
  {
    icon: Coins,
    title: "Easy Redemption",
    description:
      "Credits are automatically added to your account and can be used for any future studio bookings.",
  },
];

const faqs = [
  {
    question: "What is the refund policy for studio sessions?",
    answer:
      "Studio sessions are non-refundable and cannot be canceled or refunded.",
  },
  {
    question: "Can I cancel or reschedule my studio session?",
    answer:
      "Yes, you can cancel or reschedule your studio session up to 24 hours before the session starts.",
  },
  {
    question: "Are there any additional fees for studio sessions?",
    answer:
      "There are no additional fees for studio sessions. You can book as many sessions as you like.",
  },
  {
    question: "Can I use my StudioSpot credits for studio sessions?",
    answer:
      "Yes, you can use your StudioSpot credits for studio sessions. Credits are automatically added to your account and can be used for any future studio bookings.",
  },
];

export default function Referral() {
  return (
    <div className="container mx-auto max-w-4xl px-6 py-12 text-center">
      <h1 className="text-4xl font-bold text-foreground mb-8 ">
        Referral Program
      </h1>

      <h4 className="text-xl font-bold mb-4">Share the Love, Earn Rewards</h4>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Refer your photographer friends to StudioSpot and earn rewards for every
        successful booking.
      </p>
      <div className="my-4 mb-12">
        <ReferralSystem />
      </div>

      {/* How It Works */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          How the Referral Program Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-card border transition-colors hover:border-primary"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary/5 rounded-lg p-8 mb-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">$250K+</div>
            <div className="text-muted-foreground">Rewards Earned</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
            <div className="text-muted-foreground">Successful Referrals</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground">Satisfied Users</div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 text-left">
          <Accordion
            type="single"
            collapsible
            className="mx-auto w-full lg:max-w-3xl"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                  <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                    {faq.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="sm:mb-1 lg:mb-2">
                  <div className="text-muted-foreground">{faq.answer}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto flex max-w-4xl flex-col items-center rounded-lg bg-accent p-4 text-center md:rounded-xl md:p-6 lg:p-8">
        <div className="relative">
          <Avatar className="absolute mb-4 size-16 origin-bottom -translate-x-[60%] scale-[80%] border md:mb-5">
            <AvatarImage src="https://shadcnblocks.com/images/block/avatar-2.webp" />
            <AvatarFallback>SU</AvatarFallback>
          </Avatar>
          <Avatar className="absolute mb-4 size-16 origin-bottom translate-x-[60%] scale-[80%] border md:mb-5">
            <AvatarImage src="https://shadcnblocks.com/images/block/avatar-3.webp" />
            <AvatarFallback>SU</AvatarFallback>
          </Avatar>
          <Avatar className="mb-4 size-16 border md:mb-5">
            <AvatarImage src="https://shadcnblocks.com/images/block/avatar-1.webp" />
            <AvatarFallback>SU</AvatarFallback>
          </Avatar>
        </div>
        <h3 className="mb-2 max-w-3xl font-semibold lg:text-lg">
          Need more support?
        </h3>
        <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
          Our dedicated support team is here to help you with any questions or
          concerns. Get in touch with us for personalized assistance.
        </p>
        <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
          <Button className="w-full sm:w-auto" asChild>
            <Link href="https://wa.me/message/RKONP4YR4YJTE1" target="_blank">
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
