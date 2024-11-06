import './list.scss';
import Card from '../card/Card';

function List({ posts }) {
  return (
    <div className='list'>
      {posts.map(item => {
        // console.log("details", item.title,item);  // Log item title
        return <Card key={item.id} item={item} />;  // Render Card
      })}
    </div>
  );
}

export default List;
