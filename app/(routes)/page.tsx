"use client"

import UsersTable from '@/components/tables/users-table'
import { Button } from '@/components/ui/button'
import useModal from '@/hooks/useModal'
import { getPatients } from '@/lib/patients'
import { Plus } from 'lucide-react'
import { useQuery } from 'react-query'

export default function Home() {
  const { data } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
    refetchOnWindowFocus: false
  })

  const modal = useModal()

  const renderTable = () => {
    if (!data) return <div className='mt-5'>Loading</div>
    return <UsersTable data={data} />
  }

  return (
    <div className='p-3'>
      <Button onClick={() => modal.onOpen("add-patient")}>
        <Plus className='w-5 h-5 mr-1' />
        დამატება
      </Button>

      {renderTable()}
    </div>
  )
}
