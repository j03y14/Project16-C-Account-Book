import React, { useEffect, isValidElement } from 'react';

import { useHistory } from 'react-router-dom';

import {
  getAccountBookList,
  deleteAccountBook,
} from '../../../api/accoun-book-list';
import './accountBookList.scss';

export const AccountBookList = ({ datas, setDatas }) => {
  const history = useHistory();

  const setAccountBookList = async () => {
    const accountBooks = await getAccountBookList();
    accountBooks.data.sort((a, b) => {
      return b.transactions.length - a.transactions.length;
    });
    setDatas(accountBooks.data);
  };

  const linkToDetail = async event => {
    if (!event.target.classList.contains('fa-trash-alt')) {
      history.push({
        pathname: '/calendar',
        state: {
          id: event.target.dataset.acbookid,
        },
      });
    }
  };

  const onClickDelete = async event => {
    const accountBookId = event.target.dataset.id;
    const res = await deleteAccountBook(accountBookId);

    setDatas(datas.filter(data => data._id !== accountBookId));
  };

  useEffect(() => {
    setAccountBookList();
  }, []);

  return (
    <>
      {datas.map((data, index) => (
        <div
          key={data._id}
          className="acbook"
          data-acbookid={data._id}
          onClick={linkToDetail}
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          <div className="ac__title" data-acbookid={data._id}>
            {data.name}
          </div>
          <div className="ac__desc" data-acbookid={data._id}>
            {data.description}
          </div>

          <i className="fas fa-edit" data-id={data._id} />
          <i
            className="fas fa-trash-alt"
            data-id={data._id}
            onClick={onClickDelete}
          />
        </div>
      ))}
    </>
  );
};

export default AccountBookList;
