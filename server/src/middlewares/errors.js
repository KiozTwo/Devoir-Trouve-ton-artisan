export function apiNotFound(_req, res) {
  res.status(404).json({ message: 'Ressource introuvable.' });
}

export function handleError(error, _req, res, _next) {
  console.error(error);
  res.status(500).json({ message: 'Erreur interne du serveur.' });
}
