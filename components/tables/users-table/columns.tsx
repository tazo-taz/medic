"use client";

import { patientType } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import CellAction from "./CellAction";

export const columns: ColumnDef<patientType>[] = [
  {
    accessorKey: "id",
    header: "Id"
  },
  {
    accessorKey: "fullName",
    header: "პაციენტის გვარი სახელი"
  },
  {
    accessorKey: "email",
    header: "მეილი"
  },
  {
    accessorKey: "idNumber",
    header: "პირადი ნომერი"
  },
  {
    header: "დაბ თარიღი",
    cell: ({ row }) => {
      return moment(row.original.date).format("DD.MM.YYYY");
    },
  },
  {
    accessorKey: "gender",
    header: "სქესი"
  },
  {
    accessorKey: "phone",
    header: "მობ ნომერი"
  },
  {
    accessorKey: "address",
    header: "მისამართი"
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;
      return <CellAction data={item} />;
    },
  },
];
