"use client"

import { genderEnum } from '@/lib/constants'
import { patientSchema } from '@/lib/form-schema/patient'
import { useQueryClient } from 'react-query'
import ModalForm from './ui/modal-form'
import useModal from '@/hooks/useModal'

export default function PatientModal() {
    const queryClient = useQueryClient();
    const modal = useModal()

    const onSave = async () => {
        await queryClient.fetchQuery(["patients"]);
    }

    return (
        <ModalForm
            schema={patientSchema}
            apiUrl="/api/patients"
            isUpdating={modal.type === "update-patient"}
            modalType={['add-patient', "update-patient"]}
            onSave={onSave}
            defaultValues={{
                fullName: "",
                date: "",
                address: "",
                phone: "",
                gender: "",
                mail: "",
                idNumber: "",
            }}
            title="პაციენტის დამატება"
            fields={[
                {
                    name: "fullName",
                    placeholder: "პაციენტის გვარი სახელი"
                },
                {
                    name: "mail",
                    placeholder: "მეილი",
                },
                {
                    name: "idNumber",
                    placeholder: "პირადი ნომერი",
                },
                {
                    name: "date",
                    placeholder: "დაბადების თარიღი",
                    type: "date"
                },
                {
                    name: "address",
                    placeholder: "პაციენტის მისამართი",
                },
                {
                    name: "phone",
                    placeholder: "ტელეფონის ნომერი",
                },
                {
                    type: "select",
                    name: "gender",
                    placeholder: "პაციენტის სქესი",
                    values: Object.entries(genderEnum).map(([id, title]) => ({ id, title }))
                },
            ]}
        />
    )
}
