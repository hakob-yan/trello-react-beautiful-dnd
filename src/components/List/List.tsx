import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addCard, addList } from '../../Redux/actions';
import { AddCard, AddList } from '../../constants/global';

import './style.scss';
import { IList } from './types';

const List: React.FC<IList> = ({ focus, setFocus, feature, parentId }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [cardTitle, setCardTitle] = useState('');

  // create a custom useBooleanState that will return [state, setTrue, setFalse, toggle]
  const handleOpen = () => {
    setFocus(true);
  };

  const handleClose = () => {
    setFocus(false);
  };

  const handleInput = () => {
    if (feature === AddList && title !== '') {
      dispatch(addList(title));
      setTitle('');
    } else if (feature === AddCard && cardTitle !== '') {
      dispatch(addCard(cardTitle, parentId));
      setCardTitle('');
    }
    setFocus(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (feature === AddList) {
      setTitle(e.target.value);
    } else if (feature === AddCard) {
      setCardTitle(e.target.value);
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLDivElement> = (e) => {
    const list = e.relatedTarget?.className;
    if (list === 'addButton' || list === 'secondList' || list === 'listInput') {
      return false;
    }
    handleClose();
  };

  return focus ? (
    <div tabIndex={0} onBlur={handleBlur} className="secondList">
      <input
        autoFocus
        value={feature === AddList ? title : cardTitle}
        className="listInput"
        type="text"
        placeholder="Enter title.."
        onChange={handleChange}
      />
      <div>
        <input onClick={handleInput} className="addButton" type="button" value={feature} />
        <span onBlur={handleClose} onClick={handleClose} tabIndex={3} className="close">
          X
        </span>
      </div>
    </div>
  ) : (
    <div onClick={handleOpen} className={feature == AddList ? 'firstList' : 'otherList'}>
      <span className="plus">+</span>
      <span className="listText">{feature}</span>
    </div>
  );
};

export default List;
