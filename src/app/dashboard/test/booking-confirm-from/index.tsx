"use client"
import { useState } from 'react';
import FromOne from './FromOne'
import SideStepper from './SideStepper'


const BookingConfirmFrom = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showWelcome, setShowWelcome] = useState(false);

  
  const handleNext = () => {
    if (currentStep < 3) {
      // Mark current step as completed
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In a real app, you would submit the form data here
    console.log('Form submitted!');
    setShowWelcome(true);
  };

  return (
    <div className='flex justify-center gap-4 py-4 mt-6 '>
      <SideStepper />
       <FromOne />
    </div>
  )
}

export default BookingConfirmFrom