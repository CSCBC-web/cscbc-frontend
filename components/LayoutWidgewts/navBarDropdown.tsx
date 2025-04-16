"use client";

import * as React from "react";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import { Link } from "@heroui/link";

export default function NavBarDropdown({
  name,
  items,
}: {
  name: string;
  items: {
    label: string;
    key: string;
    link: string;
  }[];
}) {
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button className="flex items-center gap-2" size="lg" variant="light">
            <span className="hidden sm:inline font-medium">{name}</span>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions">
          <DropdownSection>
            {items.map((item) => (
              <DropdownItem key={item.key}>
                <Link color="foreground" href={item.link}>
                  {item.label}
                </Link>
              </DropdownItem>
            ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
