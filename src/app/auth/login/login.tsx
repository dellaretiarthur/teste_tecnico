import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { z } from "zod"

type formProps = z.infer<typeof formSchema>;

const formSchema = z.object ({
    email: z.string().email("Email inválido").min(1, "Campo obrigatório"),
    password: z.string().min(1, "Campo obrigatório")
})


export default function login() {

    return (
        <>

        
        
        </>
    )
}