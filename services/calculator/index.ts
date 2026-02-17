import axiosInstance from "@/lib/axios";
import { APIResponse } from "@/types/api.types";

export interface UseCalculatorResponse {
  credit_used: number;
  balance_after: number;
}

export interface CalculatorPriceResponse {
  calculator_type: string;
  credit_price: number;
}

export async function useCalculatorCredit(
  calculatorType: string,
): Promise<APIResponse<UseCalculatorResponse>> {
  const { data } = await axiosInstance.post<APIResponse<UseCalculatorResponse>>(
    "/api/calculator/use",
    {
      calculator_type: calculatorType,
    },
  );
  return data;
}

export async function getCalculatorPrice(
  calculatorType: string,
): Promise<APIResponse<CalculatorPriceResponse>> {
  const { data } = await axiosInstance.get<
    APIResponse<CalculatorPriceResponse>
  >(`/api/calculator/price/${calculatorType}`);
  return data;
}
