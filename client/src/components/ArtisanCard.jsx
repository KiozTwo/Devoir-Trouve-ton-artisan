import { Link } from 'react-router-dom';

export function Stars({ value }) {
  return (
    <span className="rating" aria-label={`Note : ${value} sur 5`}>
      <span aria-hidden="true">★★★★★</span>{' '}
      <strong>{Number(value).toFixed(1)}</strong>
    </span>
  );
}

export default function ArtisanCard({ artisan }) {
  return (
    <article className="artisan-card">
      <Link
        to={`/artisan/${artisan.id}`}
        aria-label={`Voir la fiche de ${artisan.name}`}
      >
        <img
          className="avatar"
          src={artisan.image || '/artisan-placeholder.svg'}
          alt=""
        />
        <div>
          <h3>{artisan.name}</h3>
          <Stars value={artisan.rating} />
          <p>{artisan.specialty?.name}</p>
          <p className="location">Localisation : {artisan.city}</p>
        </div>
      </Link>
    </article>
  );
}
