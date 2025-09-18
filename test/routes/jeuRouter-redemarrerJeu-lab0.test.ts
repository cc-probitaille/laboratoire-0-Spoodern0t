// Vous devez insérer les nouveaux tests ici
import supertest from 'supertest'
import app from '../../src/app';
import { assert } from 'console';
import 'jest-extended';
import { jeuRoutes } from "../../src/routes/jeuRouter";

const request = supertest(app);

const testNom1 = "Alexis";
const testNom2 = "Sixela";

describe('GET /api/v1/jeu/redemarrerJeu', () => {

  beforeAll(async () => {

    //créer deux joueurs
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom1 });
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom2 });

  });

  it("devrait répondre avec succès à l'appel de la route GET /api/v1/jeu/redemarrerJeu", async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });

  it("devrait rendre 0 pour le nombre de joueurs après redémarrage du jeu", async () => {
    const joueursJSON = jeuRoutes.controleurJeu.joueurs;
    const joueursArray = JSON.parse(joueursJSON);
    expect(joueursArray.length).toBe(0);
  });

  it(`devrait répondre avec une mauvaise demande quand le joueur supprimé ${testNom1} tente de jouer`, async () => {
      const response = await request.get("/api/v1/jeu/jouer/" + testNom1);
      expect(response.status).toBe(404);
    });

});
