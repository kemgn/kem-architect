"use client";

import { Avatar } from "@ims/component-library";
import useSWR from "swr";

interface AvatProps {
    className: string
}

// function Deneme() {
//     const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/users')
//     if(isLoading) return "aa"
//     if (error) return <div>sdf</div>
//     return <div>helloğ</div>
// }

export default function HeaderAvatar({ className }: AvatProps) {
    return (
        <>
            <Avatar
                className={className}
                variant="circular"
                onClick={() => console.log("clicked")}
            >
                {/* {Deneme()} */}
            </Avatar>
        </>
    )
}