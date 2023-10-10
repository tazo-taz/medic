"use client"

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useModal from "@/hooks/useModal";
import { patientType } from "@/lib/types";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

interface CellActionProps {
  data: patientType;
}

export default function CellAction({ data }: CellActionProps) {

  const { onOpen } = useModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>ფუქნციები</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            onOpen("update-patient", { patient: data });
          }}
        >
          განახლება
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            onOpen("delete-patient", { patient: data });
          }}
        >
          წაშლა
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
