import { Put } from "./apiUtils";

export const functionList: Record<string, (data: any) => Promise<boolean>> = {
  Quotation: async (data: any) => {
    if (!data?.id) return false;
    try {
      const url = `/api/quotation/update-status/${data.id}`;
      const response: any = await Put(url, { status: data.status });
      return response?.success ?? false;
    } catch (error) {
      console.error("Error updating quotation status:", error);
      return false;
    }
  },
  Purchase: async (data: any) => {
    if (!data?.id) return false;
    try {
      const url = `/api/purchase/update-status/${data.id}`;
      const response: any = await Put(url, { stockAdded: data.status });
      return response?.success ?? false;
    } catch (error) {
      console.error("Error updating quotation status:", error);
      return false;
    }
  },
};
