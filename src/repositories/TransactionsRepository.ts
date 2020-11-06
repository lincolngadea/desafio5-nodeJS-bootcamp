import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransationDTO{
  title: string;
  value: number;
  type: 'income'|'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const {income,outcome} = this.transactions.reduce((itemBalance: Balance,transaction: Transaction)=>{
      switch(transaction.type){
        case 'income':
          itemBalance.income += transaction.value;
          break;
        case 'outcome':
          itemBalance.outcome += transaction.value;
          break;
      }
      return itemBalance;
    },{
      income:0,
      outcome:0,
      total:0,
    }
    );

    const total = income - outcome;
    return {income, outcome, total};
  }

  public create({title,value,type}:CreateTransationDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
