"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Button } from '../../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog'
import { Input } from '../../ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form'
import { ZodSchema, z } from 'zod'
import HydrationHOC from '@/components/HydrationHOC'
import useModal, { ModalStore } from '@/hooks/useModal'
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "@radix-ui/react-icons"
import { cn } from '@/lib/utils'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect } from 'react'


type filedType = {
    placeholder: string,
    type?: "input" | "date" | "select"
    name: string,
    values?: { id: string, title: any }[],
}

type ModalFormProps = {
    schema: ZodSchema,
    modalType: ModalStore["type"] | ModalStore["type"][],
    title: string,
    fields: filedType[]
    defaultValues: {},
    apiUrl: string,
    onSave?: () => any,
    isUpdating: boolean
}

function ModalForm({ schema, modalType, title, fields, defaultValues, apiUrl, onSave, isUpdating }: ModalFormProps) {
    const modal = useModal()
    const data = modal.data.patient

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
    })

    useEffect(() => {
        if (data) {
            for (let [key, value] of Object.entries(data))
                form.setValue(key, value)


        }
    }, [data, form])


    const save = async () => {
        try {
            const values = form.getValues()

            if (isUpdating) {
                await axios.patch(`${apiUrl}/${data?.id}`, values)
            } else {
                await axios.post(apiUrl, values)
            }

            await onSave?.()
            modal.onClose()
            form.reset()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Dialog open={typeof modalType === "object" ? modalType?.includes(modal.type) : modal.type === modalType} onOpenChange={() => {
            form.reset()
            modal.onClose()
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center mb-2'>{title}</DialogTitle>
                </DialogHeader>
                <div className='flex flex-col gap-5 mt-3 justify-center'>
                    <Form {...form}>
                        {fields.map(({ placeholder, type, name, values }, inx) => (
                            <FormField
                                key={inx}
                                control={form.control}
                                name={name}
                                render={({ field }) => {

                                    let content = <Input placeholder={placeholder} {...field} />
                                    if (type === "date") content = (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? format(new Date(field.value), "PPP") : <span>{placeholder}</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={new Date(field.value)}
                                                    onSelect={value => {
                                                        field.onChange(value?.toDateString())
                                                    }}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    )
                                    else if (type === "select" && values) content = (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={placeholder} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {values.map(({ id, title }) => (
                                                    <SelectItem key={id} value={id}>{id}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )

                                    return (
                                        <FormItem>
                                            <FormLabel>{placeholder}</FormLabel>
                                            <FormControl>
                                                {content}
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )
                                }}
                            />
                        ))}
                        <Button loading={form.formState.isSubmitting} onClick={form.handleSubmit(save)}>დამატება</Button>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default HydrationHOC(ModalForm)