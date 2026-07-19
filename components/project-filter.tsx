"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { projectCategories } from "@/data/projects";

interface ProjectFilterProps {
  onFilterChange: (filterId: string) => void;
}

export function ProjectFilter({ onFilterChange }: ProjectFilterProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = projectCategories;

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterChange(filter.id)}
          className="rounded-full transition-transform hover:scale-105 active:scale-95"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
