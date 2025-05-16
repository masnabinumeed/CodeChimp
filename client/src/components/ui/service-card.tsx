'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Tilt } from "@/components/ui/tilt";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  illustration: React.ComponentType;
}

export function ServiceCard({ title, description, icon: Icon, illustration: Illustration }: ServiceCardProps) {
  return (
    <Tilt
      rotationFactor={16}
      isRevese
      style={{
        transformOrigin: 'center center',
      }}
      springOptions={{
        stiffness: 50,
        damping: 8,
        mass: 0.25,
      }}
      className="group"
    >
      <Card className="bg-primary/20 transition-all duration-300">
        <CardContent className="flex flex-col items-end gap-8 -mb-16">
          <p className="text-2xl xl:text-3xl text-foreground transition-colors duration-300">
            {description}
          </p>
          <Illustration />
        </CardContent>
      </Card>
    </Tilt>
  );
} 