import React, { useEffect, useState } from 'react';
import Til from './Til';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Tils = () => {
  const [tils, setTils] = useState([
    { id: 1, content: 'TIL 진행 중', isDone: false },
    { id: 2, content: 'TIL 완료', isDone: true }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 tils인 collection의 모든 document를 가져옵니다.
      const q = query(collection(db, 'tils'));
      const querySnapshot = await getDocs(q);

      const initialTils = [];

      // document의 id와 데이터를 initialTils에 저장합니다.
      // doc.id의 경우 따로 지정하지 않는 한 자동으로 생성되는 id입니다.
      // doc.data()를 실행하면 해당 document의 데이터를 가져올 수 있습니다.
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };
        // doc.data()
        console.log('data', data);
        initialTils.push(data);
      });

      // firestore에서 가져온 데이터를 state에 전달
      setTils(initialTils);
    };

    fetchData();
  }, []);

  const [content, setContent] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'content') {
      setContent(value);
    }
  };

  const addTil = async (event) => {
    event.preventDefault();
    const newTil = { uid: auth.currentUser.uid, content: content, isDone: false };
    setTils((prev) => {
      return [...tils, newTil];
    });
    setContent('');

    const collectionRef = collection(db, 'tils');

    await addDoc(collectionRef, newTil);
  };

  return (
    <div>
      <h2>할 일 컴포넌트</h2>
      <form>
        <div>
          <label>할 일 : </label>
          <input type="text" value={content} name="content" onChange={onChange} required></input>
          <button onClick={addTil}>추가</button>
        </div>
      </form>
      <h3>Working</h3>
      {tils
        .filter((til) => !til.isDone)
        .map((til) => {
          return <Til key={til.id} til={til} setTils={setTils} />;
        })}
      <h3>Done</h3>
      {tils
        .filter((til) => til.isDone)
        .map((til) => {
          return <Til key={til.id} til={til} setTils={setTils} />;
        })}
    </div>
  );
};

export default Tils;
