'use client'
import React, { useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import ProfileForm from '../profileform/ProfileForm'

interface ProfileDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}
const ProfileDialog = ({ open, setOpen }: ProfileDialogProps) => {
    const profileFormRef = useRef(null);
    const handleSubmit = () => {
        profileFormRef.current?.submit();
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>铸造灵魂</DialogTitle>
                    <DialogDescription>
                        填写您确切的出生信息，一旦确认无法修改！！！
                    </DialogDescription>
                </DialogHeader>
                <ProfileForm ref={profileFormRef} />
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">取消</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit}>开始铸造</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ProfileDialog
