"use client"

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from "@heroui/button";
import { Checkbox, CheckboxGroup } from "@heroui/checkbox";
import { Divider } from "@heroui/divider";

interface FilterProps {
  categories: string[];
  speakers: string[];
  selectedCategories: string[];
  selectedSpeakers: string[];
}

export default function SermonFilter({
  categories,
  speakers,
  selectedCategories,
  selectedSpeakers,
}: FilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  // TODO: multi locales
  // TODO: remember check box selection and load the selected items after refreshing page.
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
    updateSearchParams([], []);
    setHasUnsavedChanges(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">filter_categories</h3>
        <Divider />
        <CheckboxGroup
          value={draftCategories}
          onValueChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <Checkbox key={category} value={category}>
              {category}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">filter_speakers</h3>
        <Divider />
        <CheckboxGroup
          value={draftSpeakers}
          onValueChange={handleSpeakerChange}
        >
          {speakers.map((speaker) => (
            <Checkbox key={speaker} value={speaker}>
              {speaker}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>

      <div className="flex gap-2">
        {/* TODO: dix buttons' `disabled` logics */}
        <Button
          color="primary"
          variant="flat"
          onPress={handleReset}
          isDisabled={!draftCategories.length && !draftSpeakers.length}
        >
          filter_clear
        </Button>
        
        <Button
          color="secondary"
          variant="solid"
          onPress={handleApply}
          isDisabled={!hasUnsavedChanges}
        >
          filter_apply
        </Button>
      </div>
    </div>
  );
}