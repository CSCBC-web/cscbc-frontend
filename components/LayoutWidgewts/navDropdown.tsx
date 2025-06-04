"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@heroui/dropdown";
import { Button } from "@heroui/button";

import { MenuIcon } from "../icons";

interface NavDropdownItem {
  key: string;
  label: string;
  link?: string;
}

export interface NavDropdownProps {
  items: NavDropdownItem[];
}

export default function NavDropdown({
  items
}: NavDropdownProps) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light">
            <MenuIcon/>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions" items={items}>
          {(item) => (
            <DropdownItem
              key={item.key}
              className={item.key === "delete" ? "text-danger" : ""}
              color={item.key === "delete" ? "danger" : "default"}
              href={item.link? item.link : "#"}
            >
              <span>
                {item.label}
              </span>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}