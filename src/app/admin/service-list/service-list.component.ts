import { Component } from '@angular/core';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent {
  categories = [
    { nom: 'Soins des ongles' },
    { nom: 'Maquillage des ongles' },
    { nom: 'Soins du visage' }
  ];

  services = [
    {
      nom: 'Manucure',
      description: 'Traitement des ongles des mains',
      duree: 60,
      prix: 30.0,
      categorie: this.categories[0]
    },
    {
      nom: 'Pédicure',
      description: 'Traitement des ongles des pieds',
      duree: 90,
      prix: 40.0,
      categorie: this.categories[0]
    },
    {
      nom: 'Pose de vernis',
      description: 'Application de vernis à ongles',
      duree: 30,
      prix: 20.0,
      categorie: this.categories[1]
    }
  ];

  newCategorie = { nom: '' };
  newService = { nom: '', description: '', duree: 0, prix: 0.0, categorie: { nom: '' } };

  editCategorie(categorie: any) {
    // Logic to edit the category
    console.log(this.categories);
    console.log(this.services);
    
    
  }

  deleteCategorie(categorie: any) {
    // Logic to delete the category
  }

  addCategorie() {
    // Logic to add a new category
    this.categories.push({ nom: this.newCategorie.nom });
    this.newCategorie.nom = '';
  }

  editService(service: any) {
    // Logic to edit the service
  }

  deleteService(service: any) {
    // Logic to delete the service
  }

  addService() {
    // Logic to add a new service
    this.services.push({
      nom: this.newService.nom,
      description: this.newService.description,
      duree: this.newService.duree,
      prix: this.newService.prix,
      categorie: { nom: this.newService.categorie.nom }
    });
    this.newService.nom = '';
    this.newService.description = '';
    this.newService.duree = 0;
    this.newService.prix = 0.0;
    this.newService.categorie = { nom: '' };
  }
}
