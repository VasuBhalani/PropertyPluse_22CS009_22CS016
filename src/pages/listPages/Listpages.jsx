import './listpages.scss';
import Filter from '../../components/filter/Filter.jsx';
import Card from '../../components/card/Card.jsx';
import Map from '../../components/map/Map';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner.jsx';
import { useLoaderData, Await } from 'react-router-dom';
import { Suspense } from 'react';

function Listpage() {
   const data = useLoaderData();
   // console.log(data);

   return (
     <div className="listpage">
        <div className="listContainer">
           <div className="wrapper">
              <Filter />
              <Suspense fallback={<LoadingSpinner />}>
                 <Await
                    resolve={data.postResponse}
                    errorElement={<p>Error loading Posts!</p>}
                 >
                    {(postResponse) =>
                      postResponse.data.map(post => (
                         <Card key={post.id} item={post} />
                      ))
                    }
                 </Await>
              </Suspense>
           </div>
        </div>
       
        <div className="mapContainer">
           <Suspense fallback={
             <div className="spinnerWrapper">
               <LoadingSpinner />
             </div>
           }>
              <Await
                 resolve={data.postResponse}
                 errorElement={<p>Error loading Posts!</p>}
              >
               
                 {(postResponse) => <Map items={postResponse.data} />}
              </Await>
           </Suspense>
        </div>
     </div>
   );
}

export default Listpage;
