"use client"

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from "@heroui/button";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Divider } from "@heroui/divider";

interface CategoryOption {
  documentId: string;
  label: string;
}

interface FilterProps {
  categories: CategoryOption[];
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
  };
  const handleApply = () => {
    updateSearchParams(draftCategories);
  };
  const handleReset = () => {
    // 清空本地状态，CheckboxGroup 的 value={draftCategories} 得到更新，从而取消所有勾选
    setDraftCategories([]);
    setHasUnsavedChanges(false);
    // 更新 URL 上的搜索参数
    // updateSearchParams([]);
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
            <Checkbox key={category.documentId} value={category.documentId}>
              {category.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
      <Divider />
      <div className="flex gap-2">
        
        <Button
          color="secondary"
          variant="solid"
          onPress={handleReset}
          // isDisabled={!draftCategories.length}
        >
          {resetButtonText}
        </Button>
        
        <Button
          color="primary"
          variant="solid"
          onPress={handleApply}
          // isDisabled={!hasUnsavedChanges}
        >
          {applyButtonText}
        </Button>
      </div>
    </div>
  );
}