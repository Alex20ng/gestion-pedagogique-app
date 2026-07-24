"use server"

// TODO: fois le backend branché, cette fonction  devrais  créer une vraie
// session de présence côté serveur (cours + créneau + horodatage) et
// retourner un identifiant unique à encoder dans le QR Code, au lieu
// d'un identifiant généré localement.

export async function generateSessionCode() {
  const sessionId = crypto.randomUUID();
  const timestamp = Date.now();

  return {
    sessionId,
    timestamp,
  };
}