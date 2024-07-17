import { useState, useCallback } from 'react';

export const useStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  // 다음 step 이동
  const handleNext = useCallback(() => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  }, []);

  // 이전 step 이동
  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, []);

  // 특정 step으로 이동
  const goToStep = useCallback((step: number) => {
    setActiveStep(step);
  }, []);

  const handleSkip = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  }, []);

  // 리셋
  const handleReset = useCallback(() => {
    setActiveStep(0);
  }, []);

  return {
    activeStep,
    skipped,
    handleNext,
    handleBack,
    handleSkip,
    goToStep,
    handleReset,
  };
};
