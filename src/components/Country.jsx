/* eslint-disable react/prop-types */
function Country({ item }) {
    return ( 
        <article>
            <div>
                <img src={item.flags.png} alt={`Drapeau de ${item.translations.fra.common}`} />
            </div>
            <div>{item.translations.fra.common}</div>
            <div>{item.capital[0]}</div>
            <div>{item.region}</div>
            <div>{item.population}</div>
        </article>
     );
}

export default Country;