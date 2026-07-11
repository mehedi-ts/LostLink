"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/context/ToastContext";
import { validators } from "@/utils/validators";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Mail, Phone, MapPin, Send, HelpCircle } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const handleContactSubmit = async (data: ContactFormData) => {
    setLoading(true);
    // Simulate brief API delays
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log("Contact form submitted:", data);
    showToast("Message sent successfully! Our support team will respond shortly.", "success");
    reset();
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-neutral-dark tracking-tight">
          Contact Us
        </h1>
        <p className="text-sm text-neutral-mid mt-2 font-medium max-w-xl mx-auto">
          Have questions, feedback, or need help recovering an item? Reach out and our support crew will get back to you within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Contact details card */}
        <div className="lg:col-span-4 space-y-6">
          <Card hoverEffect={false} className="bg-primary text-white p-6 shadow-md relative overflow-hidden">
            <div className="absolute inset-0 bg-indigo-950/20"></div>
            <div className="relative z-10 flex flex-col gap-6">
              <h3 className="font-extrabold text-md border-b border-white/20 pb-3">Get in Touch</h3>
              
              <div className="flex gap-3 text-xs leading-relaxed items-start">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <div>
                  <span className="block font-bold">Email Support</span>
                  <a href="mailto:support@lostlink.com" className="hover:underline mt-0.5 block text-indigo-100">
                    support@lostlink.com
                  </a>
                </div>
              </div>

              <div className="flex gap-3 text-xs leading-relaxed items-start">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <div>
                  <span className="block font-bold">General Inquiries</span>
                  <span className="mt-0.5 block text-indigo-100">+1 (800) 555-0199</span>
                </div>
              </div>

              <div className="flex gap-3 text-xs leading-relaxed items-start">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0" />
                <div>
                  <span className="block font-bold">Headquarters</span>
                  <span className="mt-0.5 block text-indigo-100">
                    LostLink Inc.<br />
                    120 Broadway, Suite 400<br />
                    New York, NY 10271
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* FAQ link banner */}
          <div className="p-4 bg-neutral-light border border-neutral-light rounded-card flex gap-3 text-xs items-start text-neutral-mid font-medium">
            <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-dark">Looking for instant answers?</span> Check our FAQ page for helpful solutions on verification rules and recovery meetups.
            </div>
          </div>
        </div>

        {/* Right Side: Form card */}
        <div className="lg:col-span-8">
          <Card hoverEffect={false} className="p-6 sm:p-8 bg-white border border-neutral-light shadow-md">
            <form onSubmit={handleSubmit(handleContactSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="Your Name"
                    placeholder="e.g. Jane Doe"
                    error={errors.name?.message}
                    {...register("name", validators.name)}
                  />
                </div>
                <div>
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="e.g. jane@example.com"
                    error={errors.email?.message}
                    {...register("email", validators.email)}
                  />
                </div>
              </div>

              <div>
                <Input
                  label="Subject"
                  placeholder="e.g. Verification support, listing issue"
                  error={errors.subject?.message}
                  {...register("subject", { required: "Subject is required" })}
                />
              </div>

              <div>
                <TextArea
                  label="Message"
                  placeholder="Describe your inquiry or describe the item details..."
                  error={errors.message?.message}
                  {...register("message", {
                    required: "Message is required",
                    minLength: { value: 10, message: "Message must be at least 10 characters" },
                  })}
                />
              </div>

              <div className="pt-2">
                <Button type="submit" isLoading={loading} leftIcon={<Send className="w-4 h-4" />} className="w-full sm:w-auto">
                  Send Message
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
