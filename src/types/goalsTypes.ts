export interface AllocatedAccount {
    accountId: string; // ID of the account
    accountName: string; // Name of the account
    percentageAllocated: number; // Percentage of the account allocated to the goal (e.g., 50 for 50%)
    allocatedAmount: number;
}
  
export interface Goal {
    title: string; // Title of the goal (e.g., "Emergency Fund")
    targetAmount: number; // Target amount for the goal (e.g., $10,000)
    createdDate: string; // Date the goal was created in ISO format
    allocatedAccounts: AllocatedAccount[]; // List of accounts allocated to the goal
    currentAmount: number;
  }
  