"use client"

import { DataTable } from '@/components/ui/data-table'
import { patientType } from '@/lib/types'
import { columns } from './columns'

interface CategoryTableProps {
    data: patientType[]
}

export default function UsersTable({ data }: CategoryTableProps) {
    return (
        <DataTable
            filterKeys={["id", "fullName"]}
            columns={columns}
            data={data}
        />
    )
}
