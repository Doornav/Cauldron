export interface Transaction {
  transactionId: string;
  name: string;
  amount: number;
  date: string;
  category: string[];
}

export interface Holding {
  securityId: string;
  symbol?: string;
  name?: string;
  quantity: number;
  currentPrice?: number;
  marketValue?: number;
  isoCurrencyCode?: string;
}

export interface Institution {
  institutionId: string;
  name: string;
  logo?: string;
  url?: string;
  primary_color?: any;
}

export interface BalanceHistory {
  balance: number; // The account balance at a specific time
  timestamp: string; // ISO 8601 string for the date and time of the balance snapshot
}

export interface Account {
  accountId: string;
  accountName: string;
  accountType: string;
  balance: number;
  transactions: Transaction[];
  holdings?: Holding[];
  balanceHistory: BalanceHistory[]; // Array to store the account's balance over time
  institution?: Institution; // Institution data associated with the account
}

export interface GetAccountsResponse {
  accounts: Account[]; // Accounts array with mapped institution data
}
