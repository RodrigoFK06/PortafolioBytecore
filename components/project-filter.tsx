"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ProjectFilterProps {
  onFilterChange: (filterId: string) => void;
}

export function ProjectFilter({ onFilterChange }: ProjectFilterProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "Todos" },
    { id: "web", label: "Desarrollo Web" },
    { id: "ui", label: "UX/UI Design" },
    { id: "mobile", label: "Móvil" },
  ];

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {filters.map((filter) => (
        <motion.div key={filter.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={activeFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange(filter.id)}
            className="rounded-full"
          >
            {filter.label}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
