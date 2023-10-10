"use client"

import React from 'react'
import PatientModal from '../modals/patient-modal'
import { DeleteModal } from '../modals/ui/delete-modal'
import useModal from '@/hooks/useModal'
import { useQueryClient } from 'react-query'

export default function ModalsProviders() {
    const modal = useModal()
    const { patient } = modal.data
    const queryClient = useQueryClient();


    const onSave = async () => {
        await queryClient.fetchQuery(["patients"]);
    }

    return (
        <>
            <PatientModal />
            <DeleteModal onSave={onSave} type={'delete-patient'} api='patients' data={{ id: patient?.id, title: patient?.fullName }} />
        </>
    )
}
