"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import useModal, { ModalStore } from "@/hooks/useModal"
import axios from "axios"
import { useRouter } from "next/navigation"

type DeleteModalType = {
    type: ModalStore["type"],
    api: string,
    data?: { title?: string, id?: any },
    onSave: () => void
}

export function DeleteModal({ type: modalType, api, data, onSave }: DeleteModalType) {
    const { type, onClose } = useModal()

    const isOpen = type === modalType

    const router = useRouter()

    const onDelete = async () => {
        try {
            await axios.delete(`/api/${api}/${data?.id}`)
            router.refresh()
            onClose()
            onSave()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>დარწმუნებული ხართ?</AlertDialogTitle>
                    <AlertDialogDescription>
                        ამ მოქმედების გაუქმება შეუძლებელია. ეს სამუდამოდ წაიშლება {" "}
                        <span className="text-blue-500 dark:text-blue-400">{data?.title}</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction type="submit" onClick={onDelete}>წაშლა</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
