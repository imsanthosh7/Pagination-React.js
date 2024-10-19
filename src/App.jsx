import { useEffect, useState } from 'react';
import './App.css';
import ListItem from './Components/ListItem';

function App() {

  const [data, setData] = useState([]);

  const featchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const getData = await response.json();
      setData(getData);
    } catch (error) {
      console.error('Something went wrong');
    }
  };

  useEffect(() => {
    featchData();
  }, []);

  return (
    <>
      <ListItem data={data} />
    </>
  );
}

export default App;
