import { createTransaction } from '../../api/transaction';

export const createStore = () => {
  const store = {
    transactionAddModalVisible: false,
    messageVisible: false,
    input: {
      _id: '',
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      type: '지출',
      category: {},
      payment: {},
      cost: 0,
      content: '',
    },
    message: '',

    initInput() {
      this.input = {
        _id: '',
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        type: '지출',
        category: {},
        payment: {},
        cost: 0,
        content: '',
      };
    },

    setMessageVisible(visible: boolean) {
      this.messageVisible = visible;
    },

    setMessage(text: string) {
      this.message = text;
    },

    setTransactionAddModalVisible(visible: boolean) {
      this.transactionAddModalVisible = visible;
    },

    setInput(transaction: any) {
      this.input = transaction;
    },

    async postTransaction(accountbookId: string) {
      const { year, month, day } = this.input;

      const date = `${year}-${month
        .toString()
        .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

      const newTransaction = { ...this.input, date };

      try {
        const { status, data } = await createTransaction(
          accountbookId,
          newTransaction,
        );

        return data;
        if (status !== 200) throw new Error();
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  };
  return store;
};

export type TStore = ReturnType<typeof createStore>;