import './listpages.scss';
import {listData} from '../../lib/dumy';
import Filter from '../../components/filter/Filter';
import Card from '../../components/card/Card';
import Map from '../../components/map/Map';
function Listpage()
{
    const data=listData;
    return (

     <div className="listpage">
        <div className="listContainer">
        <div className="wrapper">
         <Filter/>
         {data.map((item)=>(
          <Card item={item} key={item.id}/>
         ))}
       </div>
        </div>
       
       <div className="mapContainer">
          <Map items={data}/>
       </div>
     </div>
    );
}

export default  Listpage;
