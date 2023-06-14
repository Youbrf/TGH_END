import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RendezVous {
  id!: number;
  dateReservation!: Date;
  heureDebut!: string;
  heureFin!: string;
  client!: Client;
  estheticienne!: Estheticienne;
  service!: Service;
}

export class Client {
  id!: number;
  nom!: string;
  prenom!: string;
}

export class Estheticienne {
  id!: number;
  nom!: string;
  prenom!: string;
}

export class Service {
  id!: number;
  nom!: string;
  description!: string;
  duree!: number;
  prix!: number;
}


export class Categorie {
  nom!: string;
  description!: string;
  id!: number;
}

