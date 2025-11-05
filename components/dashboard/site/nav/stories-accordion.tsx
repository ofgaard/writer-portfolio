import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function StoriesAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="all-stories">
        <AccordionTrigger className="text-lg font-bold px-0 hover:no-underline">
  
          <span className="hover:no-underline focus:no-underline">Stories</span>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="ml-4 mt-2 flex flex-col space-y-2 text-base font-normal">
            <li>
                <Link href="/dashboard/stories">All Stories</Link>
            </li>
            <li>
              <Link href="/dashboard/stories/reporting">Reporting</Link>
            </li>
            <li>
              <Link href="/dashboard/stories/press">Press & Communication</Link>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}