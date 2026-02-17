"use client";

import { useCallback, useMemo, useState } from "react";
import {
  type DeceasedInfo,
  type Heir,
  type HeirRelation,
  type InheritanceInput,
  type InheritanceResult,
  type LawSystem,
  calculateInheritance,
  validateInput,
} from "@/lib/inheritance-calculator";
import useGetUser from "@/hooks/auth/use-get-user";
import { useCalculatorCreditMutation } from "@/hooks/calculator/use-calculator-credit";

const INITIAL_DECEASED: DeceasedInfo = {
  name: "",
  gender: "male",
  maritalStatus: "married",
};

const MALE_RELATIONS = new Set<HeirRelation>([
  "son",
  "father",
  "grandfather",
  "brother_full",
  "brother_paternal",
  "brother_maternal",
  "uncle_paternal",
  "son_of_son",
  "son_of_uncle",
]);

export const useInheritanceCalculator = (stepsCount: number) => {
  const { hasLoggedin, isLoading } = useGetUser();
  const creditMutation = useCalculatorCreditMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [lawSystem, setLawSystem] = useState<LawSystem | null>(null);
  const [deceased, setDeceased] = useState<DeceasedInfo>(INITIAL_DECEASED);
  const [heirs, setHeirs] = useState<Heir[]>([]);
  const [totalEstate, setTotalEstate] = useState<number>(0);
  const [debts, setDebts] = useState<number>(0);
  const [funeralCosts, setFuneralCosts] = useState<number>(0);
  const [wasiat, setWasiat] = useState<number>(0);
  const [result, setResult] = useState<InheritanceResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [showCreditConfirm, setShowCreditConfirm] = useState(false);

  const addHeir = useCallback((relation: HeirRelation) => {
    const newHeir: Heir = {
      id: `heir-${Date.now()}`,
      relation,
      name: "",
      gender: MALE_RELATIONS.has(relation) ? "male" : "female",
      isAlive: true,
      count: 1,
    };
    setHeirs((prev) => [...prev, newHeir]);
  }, []);

  const updateHeir = useCallback((id: string, updates: Partial<Heir>) => {
    setHeirs((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updates } : h)),
    );
  }, []);

  const removeHeir = useCallback((id: string) => {
    setHeirs((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const calculate = useCallback(() => {
    if (!lawSystem) return;

    const input: InheritanceInput = {
      deceased,
      heirs,
      totalEstate,
      debts,
      funeralCosts,
      wasiat,
      lawSystem,
    };

    const validationErrors = validateInput(input);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    // Show credit confirmation dialog instead of directly calculating
    setShowCreditConfirm(true);
  }, [lawSystem, deceased, heirs, totalEstate, debts, funeralCosts, wasiat]);

  const confirmCreditAndCalculate = useCallback(async () => {
    if (!lawSystem) return;

    try {
      // Deduct credits first
      await creditMutation.mutateAsync("waris");

      // Then calculate
      const input: InheritanceInput = {
        deceased,
        heirs,
        totalEstate,
        debts,
        funeralCosts,
        wasiat,
        lawSystem,
      };

      const calculationResult = calculateInheritance(input);
      setResult(calculationResult);
      setCurrentStep(5);
      setShowCreditConfirm(false);
    } catch {
      // Error handled by the mutation hook (toast)
      setShowCreditConfirm(false);
    }
  }, [
    creditMutation,
    lawSystem,
    deceased,
    heirs,
    totalEstate,
    debts,
    funeralCosts,
    wasiat,
  ]);

  const cancelCreditConfirm = useCallback(() => {
    setShowCreditConfirm(false);
  }, []);

  const resetCalculator = useCallback(() => {
    setCurrentStep(1);
    setLawSystem(null);
    setDeceased(INITIAL_DECEASED);
    setHeirs([]);
    setTotalEstate(0);
    setDebts(0);
    setFuneralCosts(0);
    setWasiat(0);
    setResult(null);
    setErrors([]);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < 5) {
      if (currentStep === 4) {
        calculate();
        return;
      }
      setCurrentStep((prev) => prev + 1);
    }
  }, [calculate, currentStep]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);

  const canProceed = useCallback((): boolean => {
    switch (currentStep) {
      case 1:
        return lawSystem !== null;
      case 2:
        return deceased.name.trim() !== "";
      case 3:
        return heirs.length > 0;
      case 4:
        return totalEstate > 0;
      default:
        return true;
    }
  }, [currentStep, lawSystem, deceased.name, heirs.length, totalEstate]);

  const progress = useMemo(() => {
    if (stepsCount <= 0) return 0;
    return (currentStep / stepsCount) * 100;
  }, [currentStep, stepsCount]);

  return {
    hasLoggedin,
    isLoading,
    currentStep,
    setCurrentStep,
    lawSystem,
    setLawSystem,
    deceased,
    setDeceased,
    heirs,
    addHeir,
    updateHeir,
    removeHeir,
    totalEstate,
    setTotalEstate,
    debts,
    setDebts,
    funeralCosts,
    setFuneralCosts,
    wasiat,
    setWasiat,
    result,
    errors,
    calculate,
    resetCalculator,
    nextStep,
    prevStep,
    canProceed,
    progress,
    showCreditConfirm,
    confirmCreditAndCalculate,
    cancelCreditConfirm,
    isCreditDeducting: creditMutation.isPending,
  };
};
