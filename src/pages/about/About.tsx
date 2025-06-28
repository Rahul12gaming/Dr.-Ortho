import type { FC } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";

const About:FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      {/* Left side text */}
      <div>
        <h2 className="text-4xl font-bold mb-4 leading-tight">Get a live demo of <span className="text-primary">Dr. Ortho</span></h2>
        <ul className="list-disc ml-5 text-gray-600 text-base space-y-2">
          <li>Live walkthrough of the platform</li>
          <li>Explore use cases for your team</li>
          <li>Understand pricing options for your organization</li>
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          Looking for support? <a href="#" className="text-primary underline">Connect with our team</a>
        </p>
        {/* Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {["rubrik", "juniper", "gong", "siemens"].map((logo) => (
            <div key={logo} className="h-12 w-auto bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 text-sm uppercase">{logo}</div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form className="bg-white p-8 rounded-2xl shadow-md border w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className="space-y-2">
            <Label htmlFor="email">Work email address *</Label>
            <Input id="email" type="email" required placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName">First name *</Label>
            <Input id="firstName" required placeholder="John" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name *</Label>
            <Input id="lastName" required placeholder="Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company name *</Label>
            <Input id="company" required placeholder="Acme Inc." />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="source">How did you hear about us?</Label>
          <Select>
            <SelectTrigger id="source">
              <SelectValue placeholder="Pick an answer choice" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="google">Google Search</SelectItem>
              <SelectItem value="referral">Referral</SelectItem>
              <SelectItem value="event">Event</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="topic">What would you like to discuss? *</Label>
          <Select required>
            <SelectTrigger id="topic">
              <SelectValue placeholder="Pick an answer choice" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="demo">Schedule a Demo</SelectItem>
              <SelectItem value="pricing">Pricing Details</SelectItem>
              <SelectItem value="use-cases">Use Cases</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full space-y-2">Contact Us</Button>

        <p className="text-xs text-muted-foreground text-center">
          By clicking “Contact Us” you agree to our <a href="#" className="underline">TOS</a> and <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </form>
    </div>
  );
};

export default About;
