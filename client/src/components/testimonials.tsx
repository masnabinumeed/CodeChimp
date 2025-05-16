import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number; // ms per character
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  className = "",
  speed = 20,
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!isInView) return;
    setDisplayed(""); // Reset if needed
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [isInView, text, speed]);

  return (
    <motion.p
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
      aria-label={text}
    >
      {displayed}
      <span className="inline-block w-2 animate-pulse">|</span>
    </motion.p>
  );
};

export function Testimonials() {
  return (

    <div className="bg-gray-800 bg-gradient-to-tr from-primary via-background to-background  ">
      <section id="testimonials"

      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl uppercase font-bold mb-6 font-display text-center">
            What our customers have to say
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <Card className="rounded-2xl p-16">
              <CardContent className="flex flex-row gap-16">
                <div className="flex flex-col items-center text-center gap-4 mb-6 w-1/6">
                  <Avatar className="size-20">
                    <AvatarImage src="https://plus.unsplash.com/premium_photo-1723867331866-e112500178a4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmVzc2lvbmFsJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwwfDJ8MHx8fDA%3D" alt="" />
                    <AvatarFallback className="bg-primary text-background font-bold">L</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1 text-xl">
                    <div>Jane Doe</div>
                    <div className="text-sm">🇦🇺 Australia</div>
                  </div>
                </div>
                <TypewriterText
                  className="leading-tight w-full text-2xl"
                  text="I was thoroughly impressed with the team's software development skills! Their attention to detail and professionalism exceeded my expectations and showed a deep understanding of the project requirements."
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 lg:w-1/3"
          >
            <Card className="">
              <CardContent>
                <div className="flex flex-row gap-4 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback className="bg-primary text-background font-bold">D</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <div>darsej</div>
                    <div className="text-sm">🇦🇱 Albania</div>
                  </div>
                </div>
                <p className="leading-tight">
                  Tech Monkeys exceeded my expectations with their PROFESSIONAL, bug-free software delivery. Working with them was a breeze; their politeness, deep understanding, and willingness to go above and beyond were truly commendable.                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 lg:w-1/3"
          >
            <Card className="">
              <CardContent>
                <div className="flex flex-row gap-4 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback className="bg-primary text-background font-bold">M</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <div>melos_kelmendi</div>
                    <div className="text-sm">🇨🇭 Switzerland</div>
                  </div>
                </div>
                <p className="leading-tight">
                  TechMonkeys keep their word and are a competent group with reasonable opinions who do not shy away from challenges.
                </p>
              </CardContent>
            </Card>
          </motion.div> */}
        </div>
      </section>
    </div>
  );
}
