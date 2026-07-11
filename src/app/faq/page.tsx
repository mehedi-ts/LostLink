"use client";

import React from "react";
import FAQAccordion from "@/components/features/FAQAccordion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { MessageSquare, ArrowRight } from "lucide-react";

export default function FAQPage() {
  const faqData = [
    {
      id: "faq_1",
      question: "Is LostLink free to use?",
      answer:
        "Yes! LostLink is 100% free. We do not charge fees to create a report, contact other members, search listings, or use the dashboard. Our mission is strictly to help the community reconnect with their belongings.",
    },
    {
      id: "faq_2",
      question: "How do I report a lost or found item?",
      answer:
        "First, create a quick mock account or use the 'Demo Login' button. Once signed in, click 'Report Item' in the top navigation bar. Fill out the form, toggle whether you lost or found the item, specify location details, and press publish. It will appear on our live listings directory instantly.",
    },
    {
      id: "faq_3",
      question: "How does LostLink handle contact privacy?",
      answer:
        "We mask reporter contact numbers and names behind interactive reveal buttons. This prevents scrapers, bots, and unauthenticated traffic from harvesting phone numbers. We strongly advise that you only share the minimal necessary contact credentials to facilitate safe recovery meetups.",
    },
    {
      id: "faq_4",
      question: "How do I verify if a found item is actually mine?",
      answer:
        "When contacting a finder, we recommend asking for unique identifiers that were not disclosed in the public listing. For example, ask them to confirm a serial number, a scratch marking location, a photo of a specific inner compartment, or to input the unlock passcode of a locked electronics device.",
    },
    {
      id: "faq_5",
      question: "What are the rules for arranging a safe meetup?",
      answer:
        "Always meet in a highly populated, public space during daylight hours (e.g., inside a coffee shop, bank lobby, or in front of a police precinct). Never invite strangers to your home, and never go to theirs. If possible, bring a friend or family member along.",
    },
    {
      id: "faq_6",
      question: "How do I mark my reported item as resolved?",
      answer:
        "Once you locate your item or successfully return a found item to its owner, go to 'Manage Listings' from your profile menu. Click the checkmark icon next to the item to mark it as 'recovered'. This updates stats on the homepage and resolves the active search flag.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-neutral-dark tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-neutral-mid mt-2 font-medium max-w-xl mx-auto">
          Have questions about security, listing management, or safe meetups? Find answers below.
        </p>
      </div>

      {/* Accordion Component */}
      <FAQAccordion items={faqData} />

      {/* Bottom CTA Help Section */}
      <div className="mt-16 text-center border-t border-neutral-light/70 pt-10 max-w-lg mx-auto">
        <div className="inline-flex w-10 h-10 rounded-full bg-primary-light text-primary items-center justify-center mb-3">
          <MessageSquare className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-neutral-dark text-sm mb-1">
          Still have unanswered questions?
        </h3>
        <p className="text-xs text-neutral-mid mb-5 leading-relaxed">
          If you didn&apos;t find the answers you were looking for, send a message to our support desk. We are here to assist you.
        </p>
        <Link href="/contact">
          <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />} className="bg-white text-xs">
            Send Support Ticket
          </Button>
        </Link>
      </div>
    </div>
  );
}
