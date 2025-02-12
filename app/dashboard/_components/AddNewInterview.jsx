"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';


const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <div>
            <div onClick={() => setOpenDialog(true)} className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
                <h2 className='font-bold text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>

                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle>Tell us more about your job interviewing</DialogTitle>
                        <DialogDescription>
                            <form action="">
                                <div>

                                    <h2 className='text-2xl'>Add Details about your job position/role, Job description and years of expirence</h2>
                                    <div className='mt-7 my-3'>
                                        <label htmlFor="">Job Role/Job Position</label>
                                        <Input placeholder="Ex. Full Stack Developer" required />
                                    </div>

                                    <div className='my-3'>
                                        <label htmlFor="">Job Description/ Tech Stack(In Short)</label>
                                        <Textarea placeholder="Ex. React, Angular, NodeJs etc" required />
                                    </div>

                                    <div className='my-3'>
                                        <label htmlFor="">Years of expirence</label>
                                        <Input placeholder="Ex. 5" type="number" required />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit">Start Interview</Button>
                                </div>
                            </form>
                        </DialogDescription>

                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview
