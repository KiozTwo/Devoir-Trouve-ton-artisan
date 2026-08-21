import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api';
import { Stars } from '../components/ArtisanCard';

const emptyForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: ''
};

export default function ArtisanDetail() {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.artisan(id)
      .then((result) => {
        setArtisan(result);
        document.title = `${result.name} | Trouve ton artisan`;
        document.querySelector('meta[name=description]').content =
          `Contactez ${result.name}, ${result.specialty.name} à ${result.city}.`;
      })
      .catch((requestError) => setError(requestError.message));
  }, [id]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setStatus('Envoi en cours…');

    try {
      const result = await api.contact(id, form);
      setForm(emptyForm);
      setStatus(result.message);
    } catch (requestError) {
      setStatus(requestError.message);
    }
  }

  if (error) {
    return (
      <section className="container section">
        <h1>Artisan introuvable</h1>
        <p>{error}</p>
        <Link to="/">Retour à l’accueil</Link>
      </section>
    );
  }

  if (!artisan) {
    return <p className="container section" role="status">Chargement…</p>;
  }

  return (
    <section className="container section detail">
      <div className="profile">
        <img
          className="avatar large"
          src={artisan.image || '/artisan-placeholder.svg'}
          alt=""
        />
        <div>
          <p className="eyebrow">{artisan.specialty.category.name}</p>
          <h1>{artisan.name}</h1>
          <Stars value={artisan.rating} />
          <p>{artisan.specialty.name} · {artisan.city}</p>
          {artisan.website && (
            <a href={artisan.website} target="_blank" rel="noopener noreferrer">
              Visiter le site web
            </a>
          )}
        </div>
      </div>

      <div className="detail-grid">
        <article>
          <h2>À propos</h2>
          <p>{artisan.about}</p>
        </article>

        <form className="contact-card" onSubmit={submit}>
          <h2>Contacter l’artisan</h2>
          <p>Tous les champs sont obligatoires.</p>

          <label htmlFor="name">Nom</label>
          <input id="name" name="name" className="form-control" required minLength="2" maxLength="100" value={form.name} onChange={updateField} />

          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" className="form-control" type="email" required maxLength="254" value={form.email} onChange={updateField} />

          <label htmlFor="subject">Objet</label>
          <input id="subject" name="subject" className="form-control" required minLength="3" maxLength="150" value={form.subject} onChange={updateField} />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" className="form-control" required minLength="10" maxLength="3000" rows="5" value={form.message} onChange={updateField} />

          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Site web</label>
            <input id="website" name="website" tabIndex="-1" autoComplete="off" value={form.website} onChange={updateField} />
          </div>

          <button className="btn btn-primary" type="submit">Envoyer le message</button>
          {status && <p className="form-status" role="status">{status}</p>}
        </form>
      </div>
    </section>
  );
}
