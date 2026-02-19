"use client";

import type React from "react";

import { useState } from "react";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "support",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend API for form submission
    console.log("Form submitted:", formState);
    setSubmitted(true);
    setTimeout(() => {
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "support",
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="font-poppins text-3xl font-bold tracking-tight text-balance text-foreground lg:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Have questions about Safeswap? Our team is here to help. Reach out
            anytime and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Email */}
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-foreground mb-1">
                  Email
                </h3>
                <p className="text-muted-foreground text-sm">
                  <a
                    href="mailto:support@safeswap.com"
                    className="hover:text-primary transition-colors"
                  >
                    support@safeswap.com
                  </a>
                </p>
                <p className="text-muted-foreground text-sm">
                  <a
                    href="mailto:sales@safeswap.com"
                    className="hover:text-primary transition-colors"
                  >
                    sales@safeswap.com
                  </a>
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-foreground mb-1">
                  Phone
                </h3>
                <p className="text-muted-foreground text-sm">
                  <a
                    href="tel:+254700000000"
                    className="hover:text-primary transition-colors"
                  >
                    +254 736368320
                  </a>
                </p>
                <p className="text-muted-foreground text-sm">
                  24/7/365 - Always Available
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-foreground mb-1">
                  Office
                </h3>
                <p className="text-muted-foreground text-sm">
                  Nairobi Innovation Hub
                  <br />
                  Nairobi, Kenya
                </p>
              </div>
            </div>

            {/* Response Time */}
            <div className="flex gap-4 pt-4 border-t border-border">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-foreground mb-1">
                  Response Time
                </h3>
                <p className="text-muted-foreground text-sm">
                  We typically respond within 24 hours
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formState.name}
                onChange={handleInputChange}
                required
                className="bg-background"
              />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formState.email}
                onChange={handleInputChange}
                required
                className="bg-background"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formState.subject}
                onChange={handleInputChange}
                required
                className="bg-background"
              />
              <select
                name="category"
                value={formState.category}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="support">Support</option>
                <option value="sales">Sales Inquiry</option>
                <option value="partnership">Partnership</option>
                <option value="feedback">Feedback</option>
                <option value="security">Security Issue</option>
              </select>
            </div>

            <textarea
              name="message"
              placeholder="Your Message"
              value={formState.message}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />

            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto"
              disabled={submitted}
            >
              {submitted ? "Message Sent!" : "Send Message"}
            </Button>

            {submitted && (
              <p className="text-sm text-primary font-medium">
                Thank you! We've received your message and will get back to you
                soon.
              </p>
            )}
          </form>
        </div>

        {/* Support Channels */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
          <h3 className="font-poppins text-lg font-semibold text-foreground mb-4">
            Other Ways to Reach Us
          </h3>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-foreground mb-2">
                Live Chat
              </p>
              <p className="text-sm text-muted-foreground">
                Available during business hours for instant support
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">
                Help Center
              </p>
              <p className="text-sm text-muted-foreground">
                Browse FAQs and knowledge base articles anytime
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">
                Support Tickets
              </p>
              <p className="text-sm text-muted-foreground">
                Track your support requests in your dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
