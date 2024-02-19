import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { getAPI } from "./ApiHelper/ApiHelper";
import { useState } from "react";

const formSchema = z.object({
    userName: z.string()
        .min(2, {
            message: "Name should have atleast 3 charaters.",
        })
})

export function NameForm() {
    const [name, setName] = useState('')
    const [values, setValues] = useState([] as any);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: "",
        }
    })

    const showData = (values: any, name: string) => {
        return (
            <div className="font-bold py-10">
                <h2>Name: {name}</h2>
                <h3>Age: {values[0]}</h3>
                <h3>Gender: {values[1]}</h3>
                <h3>Country: {values[2]}</h3>
            </div>
        )
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            getAPI(values?.userName).then((data) => {
                setValues(data)
                setName(values?.userName)
            })
        } catch (error) {
            console.log('Error: ', error)
        }

    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="userName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Enter a name</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
            {values && showData(values, name)}
        </div>

    )
}
