"use client"
import { useEffect, useState } from "react"
import SignInForm from "./SignInForm"
import { SignUpForm } from "./SignUpForm"
import { Modal } from "@/components/modal/Modal"
import { useDispatch, useSelector } from "react-redux"
import { setOpenModal } from "@/redux/slice/auth-slice"
const modalStates = {"signIn" : 0, "signUp" : 1}

export const AuthModal = () =>{
    const dispatch = useDispatch()
    const { openModal } = useSelector((state: any) => state.authSlice);
    const [currentStep,setCurrentStep] = useState(0)
    const formsUI = [<SignInForm onSwitchToSignUp={()=>setCurrentStep(1)} /> ,
    <SignUpForm onSwitchToSignIn={()=>setCurrentStep(0)} />]

    useEffect(() => {
        setCurrentStep(modalStates[openModal])
    }, [openModal]);
    
    return  (
        <Modal isOpen={openModal} onClose={() => dispatch(setOpenModal(''))}>
        <div className="bg-black w-sm">
            {formsUI[currentStep]}
        </div>
        </Modal>
        )
}