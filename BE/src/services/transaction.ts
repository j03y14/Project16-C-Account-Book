import accountBookModel from '@models/accountbook';
import { Context } from 'koa';
const { Parser } = require('json2csv');

const post = async (ctx: Context): Promise<any> => {
  const transactionInfo = {
    content: ctx.request.body.content,
    type: ctx.request.body.type,
    category: ctx.request.body.category,
    cost: ctx.request.body.cost,
    date: ctx.request.body.date,
    payment: ctx.request.body.payment,
  };
  const transaction = await accountBookModel.addTransaction(
    ctx.params.accountbookid,
    transactionInfo,
  );
  if (transaction) {
    return {
      message: 'success',
      data: transaction,
    };
  }
  return {
    message: 'fail',
    data: {},
  };
};

const patch = async (ctx: Context): Promise<any> => {
  const accountBookId = ctx.params.accountbookid;
  const transactionId = ctx.params.transactionid;
  const updateInfo = {
    _id: transactionId,
    content: ctx.request.body.content,
    type: ctx.request.body.type,
    category: ctx.request.body.category,
    cost: ctx.request.body.cost,
    date: ctx.request.body.date,
    payment: ctx.request.body.payment,
  };
  const updateResult = await accountBookModel.updateTransaction(
    accountBookId,
    transactionId,
    updateInfo,
  );
  if (updateResult) {
    return {
      message: 'success',
      data: {},
    };
  }
  return {
    message: 'fail',
    data: {},
  };
};

const del = async (ctx: Context): Promise<any> => {
  const accountBookId = ctx.params.accountbookid;
  const transactionId = ctx.params.transactionid;
  const delResult = await accountBookModel.deleteTransaction(
    accountBookId,
    transactionId,
  );
  if (delResult) {
    return {
      message: 'success',
      data: {},
    };
  }
  return {
    message: 'fail',
    data: {},
  };
};

const transactionCsv = async (ctx: Context): Promise<any> => {
  const accountBook = await accountBookModel.getDetail(
    ctx.params.accountbookid,
  );
  const transactions = accountBook.transactions;
  console.log('transactions', typeof transactions);

  if (transactions) {
    const fields = [
      'content',
      'type',
      'cost',
      'date',
      'category.name',
      'category.icon',
      'category.type',
      'payment.name',
      'payment.color',
    ];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(transactions);
    console.log(csv);
    return {
      message: 'success',
      data: transactions,
    };
  }
  return {
    message: 'fail',
    data: {},
  };
};

export default { post, patch, del, transactionCsv };
