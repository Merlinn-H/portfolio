/**
 * Le back-office n'est exposé que :
 *  - en développement (stockage local, écrit dans les fichiers du repo) ;
 *  - ou en production si le mode GitHub est activé (authentification GitHub obligatoire).
 * En production avec le stockage local, /keystatic et /api/keystatic renvoient 404 :
 * sinon on publierait un point d'écriture non authentifié.
 */
export const adminEnabled =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github";
