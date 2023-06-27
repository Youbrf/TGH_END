import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class Reservation {  
  id!: number;
  dateReservation!: Date;
  heureDebut!: string;
  heureFin!: string;
  remarquesSpeciales!: string;
  statutReservation!: string;
  montantTotal!: number;
  modePaiement!: string;
  dateCreation!: string;
  dateModification!: string;
  dateAnnulation!: string;
  etatPaiement!: string;
  client!: Client; 
  estheticienne!: Estheticienne; 
  services!: Service[];
}


export class Client {
  id!: number;
  nom!: string;
  prenom!: string;
  email!: EmailValidator;
  gsm!:number;
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
  categorie!: CategorieService;
}

export class CategorieService {
  id!: number;
  nom!: string;
  description!: string;
}
export class Register {
  firstname!: string;
  lastname!: string;
  email!: string;
  password!: string;
  role!: string;
}
export class Signin{
  email!: string;
  password!: string;
}