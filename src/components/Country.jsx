/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
function Country({ item }) {
  return (
    <article className="card w-96 bg-base-100 shadow-xl my-2">
      <figure className="h-2/3">
        <img
          src={item.flags.png}
          alt={`Drapeau de ${item.translations.fra.common}`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.translations.fra.common}</h2>
        <p>Capitale: {item.capital[0]}</p>

        <p>Nombre d'habitants : {item.population}</p>
        <div className="card-actions w-1/4">
            <p className="badge badge-outline">{item.region}</p>
        </div>
      </div>

    </article>
  );
}

export default Country;
