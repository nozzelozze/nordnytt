"use client";
import { useKeyboard } from "@/input/keyboard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArticlePageNav({nextId, prevId} : { prevId?: number | null, nextId?: number | null })
{

    const router = useRouter();
    const [noArticle, setNoArticle] = useState<Boolean>(false)

    useEffect(() => {
        if (!noArticle)
        {
            return
        }
        const timer = setTimeout(() => setNoArticle(false), 600);
        return () => clearTimeout(timer);
    }, [noArticle]);

    useEffect(() => {
       return useKeyboard((key) =>
        {
            if (key == "n")
            {
                if (nextId)
                {
                    router.push(`/${nextId}`)
                }
                else
                {
                    setNoArticle(true)
                }
            }
            if (key == "p")
            {
                if (prevId)
                {
                    router.push(`/${prevId}`)
                }
                else
                {
                    setNoArticle(true)
                }
            }
        })
    }, [nextId, prevId, router])

    if (!noArticle)
    {
        return null
    }

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm px-3 py-2 rounded">
            No Article
        </div>
    )
}