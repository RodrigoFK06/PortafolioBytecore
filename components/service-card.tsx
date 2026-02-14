"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building,
  Box,
  Layout,
  MessageSquare,
  Monitor,
  Palette,
  Code,
  Database,
  type LucideIcon,
} from "lucide-react";
import ServiceModal from "./ServiceModal";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = getIcon(icon);

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
      >
        <div className="p-8 border border-border rounded-lg bg-card hover:border-brand/30 transition-colors duration-300 h-full flex flex-col">
          <div className="mb-6 text-brand">
            <IconComponent className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-muted-foreground mb-6 flex-grow">{description}</p>

          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center text-sm font-medium text-brand group focus:outline-none"
          >
            Saber más
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>

      {/* Modal de detalles */}
      <ServiceModal
        title={title}
        description={description}
  icon={<IconComponent className="w-12 h-12 text-brand" />}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

function getIcon(iconName: string): LucideIcon {
  switch (iconName) {
    case "Building":
      return Building;
    case "Box":
      return Box;
    case "Layout":
      return Layout;
    case "MessageSquare":
      return MessageSquare;
    case "Monitor":
      return Monitor;
    case "Palette":
      return Palette;
    case "Code":
      return Code;
    case "Database":
      return Database;
    default:
      return Layout;
  }
}
