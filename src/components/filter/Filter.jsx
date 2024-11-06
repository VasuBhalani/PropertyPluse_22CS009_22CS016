import { useSearchParams } from 'react-router-dom';
import './filter.scss';
import { useState } from 'react';
function Filter()
{
    const [serchParams,setSearchParams] = useSearchParams()
    // console.log(...serchParams.getAll(["city", "type", "minPrice", "maxPrice"]))

    const [query,setQuery] = useState({
        city: serchParams.get("city") || "",
        type: serchParams.get("type") || "",
        property: serchParams.get("property") || "",
        bedrooms: serchParams.get("bedrooms") || 0,
        minPrice: serchParams.get("minPrice") || 100,
        maxPrice: serchParams.get("maxPrice") || 1000000,
    });


     const handleChange = (e) => {
        setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
     }
    return(
    <div className="filter">
        <h2>Search of result <b>{query.city }</b></h2>
        <div className="top">
            <div className="item">
                <label htmlFor="city">Location</label>
                <input type="text" id="city"name='city' placeholder="City Location" value={query.city} onChange={handleChange}/>
            </div>
        </div>
        <div className="bottom">
        <div className="item">
                <label htmlFor="type">Type</label>
                <select id="type" name="type" value={query.type} onChange={handleChange}>
                    <option value="">Select</option>    
                    <option value="buy">Buy</option>    
                    <option value="rent">Rent</option>    
                </select> 
            </div>
        <div className="item">
        <label htmlFor="property">Property</label>
                <select id="property" name="property" value={query.property} onChange={handleChange}>
                    <option value="">Select</option>    
                    <option value="apartment">Apartment</option>    
                    <option value="house">House</option>    
                    <option value="condo">Condo</option>    
                    <option value="land">Land</option>    
                </select> 
         </div>
         <div className="item">
                <label htmlFor="minPrice">Min Price</label>
                <input type="number" id="minPrice" name='minPrice' min='0' max='1000000' placeholder="Min Price" value={query.minPrice} onChange={handleChange}/>
        </div>
         <div className="item">
                <label htmlFor="maxPrice">Max Price</label>
                <input type="number" id="maxPrice" name='maxPrice' min='0' max='1000000' placeholder="Max Price" value={query.maxPrice} onChange={handleChange}/>
        </div>
        
         <div className="item">
                <label htmlFor="bedrooms">Bedrooms</label>
                <input type="number" id="bedrooms" name='bedrooms' min='0' max='100' placeholder="No of bedrooms" value={query.bedrooms} onChange={handleChange}/>
        </div>
         

        <button onClick={() => setSearchParams(query) }>
            <img src="/search.png" alt=""  />
          </button>

        

         </div>

         </div>

    
    )
};

export default Filter;