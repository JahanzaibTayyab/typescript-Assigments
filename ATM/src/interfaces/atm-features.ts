type ATM = "Deposit Money" | "Balance" | "Withdraw" | "Show Data" | "Cancel";

export default interface ATMOperations {
  operation: ATM;
  amount?: number;
  totalAmount?: number;
}
