import { ChangeEvent, useEffect, useState } from 'react';

import CardList from './components/card-list/card-list'
import SearchBox from './components/search-box/search-box'

import { getData } from './utils/data.utils';

import './App.css';

export type Monster = {
  id: string;
  name: string;
  email: string;
};

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect( () => {
    const fetchUsers = async () => {
      const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users');
      setMonsters(users);
    };

    fetchUsers();
  }, []);

  useEffect( () => {
    const newFilteredMonsters = monsters.filter((monster) => (
      monster.name.toLocaleLowerCase().includes(searchField)
    ));

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const newSearchString = event.target.value.toLocaleLowerCase();
    setSearchField(newSearchString);
  };

  return (
    <div>
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox
        className='monsters-search-box'
        placeholder='search monsters'
        onChangeHandler={onSearchChange}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
}

export default App;
