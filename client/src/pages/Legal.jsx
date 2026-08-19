import { useEffect } from 'react';

const pages = {
  'Mentions légales': (
    <>
      <h2>Éditeur du site</h2>
      <p>Ce site est un projet pédagogique réalisé par Simon CLEMENT dans le cadre de sa formation de développeur web et web mobile.</p>
      <p>Le service présenté concerne la Région Auvergne-Rhône-Alpes.</p>
      <h2>Hébergement</h2>
      <p>Le frontend et l’API sont hébergés par Render. La base de données est hébergée par Aiven.</p>
    </>
  ),
  'Données personnelles': (
    <>
      <p>Le formulaire demande un nom, une adresse e-mail, un objet et un message afin de transmettre une demande à un artisan.</p>
      <p>Ces informations ne doivent pas être utilisées dans un autre but. Dans la version de démonstration, aucun compte utilisateur n’est créé.</p>
      <p>Pour demander la suppression d’une information, contactez le responsable du site.</p>
    </>
  ),
  'Accessibilité': (
    <>
      <p>Le site a été conçu avec une navigation au clavier, des titres structurés, des libellés de formulaire et des contrastes lisibles.</p>
      <p>Si vous rencontrez une difficulté d’accès à un contenu, vous pouvez la signaler au responsable du site.</p>
    </>
  ),
  Cookies: (
    <>
      <p>Ce site n’utilise pas de cookie publicitaire ni d’outil de suivi d’audience.</p>
      <p>Des données techniques peuvent être traitées par les hébergeurs pour assurer le fonctionnement et la sécurité du service.</p>
    </>
  )
};

export default function Legal({ title }) {
  useEffect(() => {
    document.title = `${title} | Trouve ton artisan`;
  }, [title]);

  return (
    <section className="container section legal">
      <h1>{title}</h1>
      {pages[title]}
    </section>
  );
}

