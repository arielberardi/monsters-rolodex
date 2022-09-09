import Card from '../card/card.jsx';
import './card-list.css';

const CardList = ({ monsters }) => (
  <div className='card-list'>
    {monsters.map((monster) => (
      <Card monster={monster} key={monster.id}/>
    ))}
  </div>
);

export default CardList;
