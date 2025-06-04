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
interface SpeakerOption {
  documentId: string;
  name: string;
}

interface FilterProps {
  categories: CategoryOption[];
  speakers: SpeakerOption[];
  selectedCategories: string[];
  selectedSpeakers: string[];
  categoryGroupTitle: string;
  speakerGroupTitle: string;
  resetButtonText: string;
  applyButtonText: string;
}

export default function SermonFilter({
  categories,
  speakers,
  selectedCategories,
  selectedSpeakers,
  categoryGroupTitle,
  speakerGroupTitle,
  resetButtonText,
  applyButtonText,
}: FilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  // 客户端草稿状态
  const [draftCategories, setDraftCategories] = useState<string[]>(selectedCategories);
  const [draftSpeakers, setDraftSpeakers] = useState<string[]>(selectedSpeakers);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // 同步服务端参数变化
  useEffect(() => {
    setDraftCategories(selectedCategories);
    setDraftSpeakers(selectedSpeakers);
    setHasUnsavedChanges(false);
  }, [selectedCategories, selectedSpeakers]);

  // 更新URL参数（同时处理两个过滤条件）
  const updateSearchParams = (newCategories: string[], newSpeakers: string[]) => {
    const params = new URLSearchParams();

    // 保留其他参数
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.forEach((value, key) => {
      if (key !== 'categories' && key !== 'speakers') {
        params.set(key, value);
      }
    });

    // 设置新的过滤参数
    if (newCategories.length > 0) {
      params.set('categories', newCategories.map(c => encodeURIComponent(c)).join(','));
    }
    if (newSpeakers.length > 0) {
      params.set('speakers', newSpeakers.map(c => encodeURIComponent(c)).join(','));
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  // 处理分类变化
  const handleCategoryChange = (values: string[]) => {
    setDraftCategories(values);
    setHasUnsavedChanges(true);
  };

  // 处理讲员变化
  const handleSpeakerChange = (values: string[]) => {
    setDraftSpeakers(values);
    setHasUnsavedChanges(true);
  };

  // 应用筛选
  const handleApply = () => {
    updateSearchParams(draftCategories, draftSpeakers);
    setHasUnsavedChanges(false);
  };

  // 重置筛选
  const handleReset = () => {
    setDraftCategories([]);
    setDraftSpeakers([]);
    
    setHasUnsavedChanges(false);

    // updateSearchParams([], []);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{categoryGroupTitle}</h3>
        <Divider />
        <CheckboxGroup
          className="max-h-[50vh] overflow-y-auto"
          value={draftCategories}
          onValueChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <Checkbox key={category.documentId} value={category.documentId}>
              {category.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{speakerGroupTitle}</h3>
        <Divider />
        <CheckboxGroup
          className="max-h-[50vh] overflow-y-auto"
          value={draftSpeakers}
          onValueChange={handleSpeakerChange}
        >
          {speakers.map((speaker) => (
            <Checkbox key={speaker.documentId} value={speaker.documentId}>
              {speaker.name}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>

      <div className="flex gap-2">
        <Button
          color="secondary"
          variant="solid"
          onPress={handleReset}
          // isDisabled={!draftCategories.length && !draftSpeakers.length}
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