import { Button } from "../../components/ui/button";
import type { FC } from "react";

interface ToolCard {
  title: string;
  description: string;
  tags: string[];
  primaryAction: string;
  secondaryAction: string;
}

const toolsList: ToolCard[] = [
  {
    title: "Dental Check-Up Booking",
    description:
      "Schedule your routine dental check-ups to maintain optimal oral hygiene and prevent future issues.",
    tags: ["Check-Up", "Booking", "Dental Care"],
    primaryAction: "Book Now",
    secondaryAction: "Learn More",
  },
  {
    title: "Teeth Cleaning Services",
    description:
      "Professional teeth cleaning to remove plaque, tartar, and surface stains for a brighter smile.",
    tags: ["Cleaning", "Hygiene", "Smile"],
    primaryAction: "Schedule Cleaning",
    secondaryAction: "Know Benefits",
  },
  {
    title: "Braces & Orthodontics",
    description:
      "Consult our orthodontists for braces, aligners, and bite corrections tailored to your smile.",
    tags: ["Braces", "Aligners", "Orthodontics"],
    primaryAction: "Book Consultation",
    secondaryAction: "View Options",
  },
  {
    title: "Root Canal Treatment",
    description:
      "Pain-free root canal therapy by specialists to treat infected pulp and preserve your tooth.",
    tags: ["Root Canal", "Treatment", "Tooth Care"],
    primaryAction: "Get Treated",
    secondaryAction: "Understand Process",
  },
  {
    title: "Tooth Extraction",
    description:
      "Expert and gentle removal of damaged or decayed teeth with aftercare guidance.",
    tags: ["Extraction", "Oral Surgery", "Relief"],
    primaryAction: "Schedule Visit",
    secondaryAction: "Read Guide",
  },
  {
    title: "Dental Implants",
    description:
      "Restore missing teeth with durable and natural-looking dental implants by our professionals.",
    tags: ["Implants", "Restoration", "Smile Design"],
    primaryAction: "Book Evaluation",
    secondaryAction: "Explore Benefits",
  },
  {
    title: "Teeth Whitening",
    description:
      "Safe and effective teeth whitening options to brighten your smile in just one session.",
    tags: ["Whitening", "Cosmetic", "Bright Smile"],
    primaryAction: "Get Whitening",
    secondaryAction: "See Before & After",
  },
  {
    title: "Pediatric Dentistry",
    description:
      "Gentle care for kids’ dental needs — from first check-ups to preventive treatments.",
    tags: ["Kids", "Dental Care", "Prevention"],
    primaryAction: "Book for Child",
    secondaryAction: "Meet Our Experts",
  },
  {
    title: "Gum Disease Treatment",
    description:
      "Early diagnosis and advanced treatment options for bleeding gums and periodontal issues.",
    tags: ["Gums", "Treatment", "Periodontics"],
    primaryAction: "Start Treatment",
    secondaryAction: "Symptoms & Causes",
  },
];

const Home: FC = () => {
  return (
    <section className="px-10 py-2">
      <main className="text-center py-10">
        <h1 className="text-5xl font-extrabold text-blue-800">
          Comprehensive Dental Care Services
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-2xl mx-auto">
          From routine cleanings to advanced procedures, we provide expert dental care tailored to every smile.
        </p>

        <Button className="mt-4" variant={"default"}>
          Explore Services
        </Button>
      </main>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolsList.map((card, index) => (
          <div
            key={index}
            className="bg-white border-2 border-gray-200 p-6 hover:shadow-md transition rounded-xl"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {card.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold px-2 py-1 border border-blue-600 text-blue-700 uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4">{card.description}</p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md">
                {card.primaryAction}
              </button>
              <button className="text-sm font-medium text-blue-600 hover:underline">
                {card.secondaryAction}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
