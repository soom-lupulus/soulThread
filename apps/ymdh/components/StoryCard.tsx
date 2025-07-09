import React from 'react'
import { Card, CardHeader, CardContent } from "@/components/ui/card";

type StoryCardPropsType = {
    title: string
    bazi: string
    content: string
}
const StoryCard = ({ title, bazi, content }: StoryCardPropsType) => {
    return (
        <Card className="bg-opacity-70 backdrop-blur-md">
            <CardHeader>
                <div className="flex justify-between">
                    <h3>{title}</h3>
                    <span className="text-amber-500">{bazi}</span>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600">{content}</p>
            </CardContent>
        </Card>
    )
}

export default StoryCard