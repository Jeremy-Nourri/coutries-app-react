/* eslint-disable react/prop-types */
import Country from "./Country";

function CountryList({ countries }) {

    return ( 
        <div className="flex flex-wrap justify-evenly">
            {
                countries && (
                    countries.map((item) => (
                        <Country key={item.id} item={item} />
                    ))
                )
            }
        </div>
     );
}

export default CountryList;