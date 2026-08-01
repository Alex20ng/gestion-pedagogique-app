"use server"

// TODO: le backend générera ici l'identifiant de session (cours + créneau + horodatage). 
//Cette fonction sera complétée lors de l'intégration du nouveau backend.

export async function generateSessionCode() {
  const sessionId = crypto.randomUUID();

  return {
    sessionId
  };
  // À compléter par le backend
}