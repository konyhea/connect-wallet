

import OtpInput from "../otpInput";
import { useState } from "react";

export const Email = () => {

    const [isinvalid, setIsinvalid] = useState(false);
    const [verifying, setVerifying] = useState(false);

    const onComplete = () => {
        setVerifying(true);
        setTimeout(() => {
            const choices = [true, false];
            const randomChoice = choices[Math.floor(Math.random() * choices.length)];
            console.log(randomChoice);
            setIsinvalid(randomChoice)
            setVerifying(false)

        }, 2000)
    }
    return (
        <div className="xs:mb-4 mx-auto max-w-full pt-12">
            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-col gap-2 text-center pt-0.5 ">
                    <h1 className="font-medium  leading-4.75 tracking-[-0.13px]">
                        We've emailed you a verification code
                    </h1>
                    <p className="font-normal text-[14px] text-black-a6 leading-4.75 tracking-[-0.13px] ">
                        Please enter the code we sent you below
                    </p>
                </div>
                <div className="h-33 w-auto flex flex-col justify-around  items-center">
                    <OtpInput length={6} onComplete={onComplete} inValid={isinvalid} loading={verifying} onInvalidHandled={() => setIsinvalid(false)} />
                    <div className=" text-center">
                        <p className="text-[14px] whitespace-pre font-normal leading-4.75 tracking-[-0.0129px] text-black-a6 ">
                            Didn't receive a code?
                            <button className="cursor-pointer"> Resend</button>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}