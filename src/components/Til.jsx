import React from 'react';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Til = ({ til, setTils }) => {
  const updateTil = async (event) => {
    const tilRef = doc(db, 'tils', til.id);
    await updateDoc(tilRef, { ...til, isDone: !til.isDone });

    setTils((prev) => {
      return prev.map((element) => {
        if (element.id === til.id) {
          return { ...element, isDone: !element.isDone };
        } else {
          return element;
        }
      });
    });
  };

  const deleteTil = async (event) => {
    const tilRef = doc(db, 'tils', til.id);
    await deleteDoc(tilRef);
    console.log(til.id);

    setTils((prev) => {
      return prev.filter((element) => element.id !== til.id);
    });
  };

  return (
    <div key={til.id}>
      <span>{til.content}</span>
      <button onClick={updateTil}>{til.isDone ? '취소' : '완료'}</button>
      <button onClick={deleteTil}>삭제</button>
    </div>
  );
};

export default Til;
