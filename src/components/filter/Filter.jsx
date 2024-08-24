import './filter.scss';
function Filter()
{
    return(
    <div className="filter">
        <h2>Search of result <b>Ahmedabad</b></h2>
        <div className="top">
            <div className="item">
                <label htmlFor="city">Location</label>
                <input type="text" id="city"name='city' placeholder="City Location"/>
            </div>
        </div>
        <div className="bottom">
        <div className="item">
                <label htmlFor="type">Type</label>
                <select id="type" name="type">
                    <option value="">Select</option>    
                    <option value="buy">Buy</option>    
                    <option value="rent">Rent</option>    
                </select> 
            </div>
        <div className="item">
        <label htmlFor="property">Property</label>
                <select id="property" name="property">
                    <option value="">Select</option>    
                    <option value="apartment">Apartment</option>    
                    <option value="house">House</option>    
                    <option value="condo">Condo</option>    
                    <option value="land">Land</option>    
                </select> 
         </div>
         <div className="item">
                <label htmlFor="minPrice">Min Price</label>
                <input type="number" id="minPrice" name='minPrice' min='0' max='1000000' placeholder="Min Price"/>
        </div>
         <div className="item">
                <label htmlFor="maxPrice">Max Price</label>
                <input type="number" id="maxPrice" name='maxPrice' min='0' max='1000000' placeholder="Max Price"/>
        </div>
        
         <div className="item">
                <label htmlFor="bedrooms">Bedrooms</label>
                <input type="number" id="bedrooms" name='bedrooms' min='0' max='100' placeholder="No of bedrooms"/>
        </div>

        <button>
            <img src="/search.png" alt="" />
          </button>

        

         </div>

         </div>

    
    )
};

export default Filter;