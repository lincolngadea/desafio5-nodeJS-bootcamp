import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string;
  value: number;
  type: 'income'|'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title,value,type}:Request): Transaction {
    const transaction =this.transactionsRepository.create({
      title,
      value,
      type
    });

    const {total} = this.transactionsRepository.getBalance();

    if(type === 'outcome' && total < value ){
      throw new Error('You dont have enough balance');
    }

    return transaction;
  }
}

export default CreateTransactionService;
