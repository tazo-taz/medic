import { patientType } from "@/lib/types";
import { create } from "zustand";

export type ModalStore = {
    type: "add-patient" | "update-patient" | "delete-patient" | null,
    data: {
        patient?: patientType
    },
    onOpen: (type: ModalStore["type"], data?: ModalStore["data"], cb?: ModalStore["cb"]) => void;
    onClose: () => void;
    cb: () => void;
};

const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    onOpen: (type, data = {}, cb = () => { }) => set({ type, data, cb }),
    onClose: () => set({ type: null, data: {} }),
    cb: () => { },
}));


export default useModal;
