"use client";
import { useKeyboard } from "@/input/keyboard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StartPageNav({ ids }: { ids: number[] })
{

    const router = useRouter();

    useEffect(() => {
       return useKeyboard((key) =>
        {
            if (key < "1" || key > "9") return;

            const id = ids[Number(key)-1]
            if (!id) return;

            router.push(`/${id}`)
        })
    }, [ids, router])

    return null
}