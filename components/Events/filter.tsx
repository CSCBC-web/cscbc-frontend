"use client"

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from "@heroui/button";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Divider } from "@heroui/divider";

interface FilterProps {
  categories: string[];
  selectedCategories: string[];
  categoryGroupTitle: string;
  resetButtonText: string;
  applyButtonText: string;
}

export default function EventFilter({
  categories,
  selectedCategories,
  categoryGroupTitle,
  resetButtonText,
  applyButtonText,
}: FilterProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [draftCategories, setDraftCategories] = useState<string[]>(selectedCategories);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    setDraftCategories(selectedCategories);
    setHasUnsavedChanges(false);
  }, [selectedCategories]);

  const updateSearchParams = (newCategories: string[]) => {
    const params = new URLSearchParams();
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.forEach((value, key) => {
      if (key !== 'categories') {
        params.set(key, value);
      }
    });

    if (newCategories.length > 0) {
      params.set('categories', newCategories.map(c => encodeURIComponent(c)).join(','));
    }

    router.push(`${pathname}?${params.toString()}`);
  };
  const handleCategoryChange = (selected: string[]) => {
    setDraftCategories(selected);
    setHasUnsavedChanges(true);
  }
  const handleApply = () => {
    updateSearchParams(draftCategories);
  }
  const handleReset = () => {
    setDraftCategories([]);
    setHasUnsavedChanges(false);
    updateSearchParams([]);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{categoryGroupTitle}</h3>
        <CheckboxGroup
          value={draftCategories}
          onChange={handleCategoryChange}
          className="max-h-[50vh] overflow-y-auto"
        >
          {categories.map((category) => (
            <Checkbox key={category} value={category}>
              {category}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
      <Divider />
      <div className="flex gap-2">
        {/* TODO: fix buttons' `disabled` logics */}
        <Button
          color="primary"
          variant="flat"
          onPress={handleReset}
          isDisabled={!draftCategories.length}
        >
          {resetButtonText}
        </Button>
        
        <Button
          color="secondary"
          variant="solid"
          onPress={handleApply}
          isDisabled={!hasUnsavedChanges}
        >
          {applyButtonText}
        </Button>
      </div>
    </div>
  )
}