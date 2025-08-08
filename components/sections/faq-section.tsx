import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion"

export default function FAQSection() {
  return (
    <section className="py-16" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start">
          {/* Kiri: Teks FAQ */}
          <div className="w-full md:w-1/3 flex flex-col gap-2">
            <div className="uppercase text-sm font-bold tracking-[0.2em] text-[#6e7869]">faq</div>
            <div className="text-3xl md:text-4xl font-bold tracking-wide text-[#1a1a1a]">Frequently Asked Questions</div>
          </div>
          {/* Kanan: FAQ Accordion */}
          <div className="w-full md:w-2/3">
            <div className="pb-6 flex flex-col gap-2.5">
              {/* Accordion FAQ */}
              <Accordion type="single" collapsible className="w-full divide-y divide-[#6e7869]/20">
                <AccordionItem value="q1">
                  <AccordionTrigger className="py-6 flex justify-between items-center text-[#6e7869] text-xl font-medium font-sans hover:no-underline focus:no-underline [&_*]:hover:no-underline [&_*]:focus:no-underline">
                    Where is Kenteng Village located?
                  </AccordionTrigger>
                  <AccordionContent className="pr-8 text-[#1e1e1e] text-base font-normal font-sans tracking-tight pb-6">
                    Kenteng is nestled in the highlands of Bandungan, Central Java — about 1 hour from Semarang City. It's easy to reach by car or motorbike, and we can help arrange transportation if needed.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q2">
                  <AccordionTrigger className="py-6 flex justify-between items-center text-[#6e7869] text-xl font-medium font-sans hover:no-underline focus:no-underline [&_*]:hover:no-underline [&_*]:focus:no-underline">
                    What kind of tours do you offer?
                  </AccordionTrigger>
                  <AccordionContent className="pr-8 text-[#1e1e1e] text-base font-normal font-sans tracking-tight pb-6">
                    We offer a variety of tours: nature walks, cultural experiences, culinary journeys, and hands-on workshops with local artisans. You can join a group or request a custom itinerary.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q3">
                  <AccordionTrigger className="py-6 flex justify-between items-center text-[#6e7869] text-xl font-medium font-sans hover:no-underline focus:no-underline [&_*]:hover:no-underline [&_*]:focus:no-underline">
                    Do I need to book in advance?
                  </AccordionTrigger>
                  <AccordionContent className="pr-8 text-[#1e1e1e] text-base font-normal font-sans tracking-tight pb-6">
                    Advance booking is recommended, especially for weekends and holidays, to ensure availability and the best experience. However, walk-ins are welcome if space allows.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q4">
                  <AccordionTrigger className="py-6 flex justify-between items-center text-[#6e7869] text-xl font-medium font-sans hover:no-underline focus:no-underline [&_*]:hover:no-underline [&_*]:focus:no-underline">
                    Can I visit Kenteng without joining a tour?
                  </AccordionTrigger>
                  <AccordionContent className="pr-8 text-[#1e1e1e] text-base font-normal font-sans tracking-tight pb-6">
                    Yes, you are welcome to explore Kenteng independently. Our team is happy to provide tips and recommendations for your visit.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="q5">
                  <AccordionTrigger className="py-6 flex justify-between items-center text-[#6e7869] text-xl font-medium font-sans hover:no-underline focus:no-underline [&_*]:hover:no-underline [&_*]:focus:no-underline">
                    Do you speak English?
                  </AccordionTrigger>
                  <AccordionContent className="pr-8 text-[#1e1e1e] text-base font-normal font-sans tracking-tight pb-6">
                    Yes, our guides and staff speak English and Bahasa Indonesia. We strive to make every guest feel welcome and understood.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}