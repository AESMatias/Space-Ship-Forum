"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react";



export function CheckBoxSimple({ isChecked, setIsChecked }) {


    const handleCheckboxChange = () => {
        console.log('Redirect option', !isChecked)
        setIsChecked(!isChecked);
        ;
    };


    return (
        <div className="items-top flex space-x-2">
            <Checkbox
                onClick={() => handleCheckboxChange()}
                checked={isChecked}
                id="terms1" />
            <div className="grid gap-1.5 leading-none">
                <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    <p className="text-sm text-muted-foreground">
                        I Like to see the post page immediately.
                    </p>
                </label>

            </div>
        </div>
    )
}

export default CheckBoxSimple;