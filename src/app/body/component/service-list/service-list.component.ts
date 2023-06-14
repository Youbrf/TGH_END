import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieServiceService } from 'src/app/core/_service/categorie-service/categorie-service.service';
import { Categorie } from 'src/app/models/model';
import { Service } from 'src/app/models/model';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit{
  categories!: Categorie[];
  services!: Service[];
  servicesByCategorie: { [idCategorie: number]: Service[] } = {};
  selectedServices: Service[] = [];

  constructor(private categorieService: CategorieServiceService, private router : Router) { }

  ngOnInit() {
    this.loadCategories();
  }
  loadCategories(): void {
    this.categorieService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      for (const categorie of categories) {
        this.loadServices(categorie);
      }
    });
  }

  loadServices(categorie: Categorie): void {
    this.categorieService.getServicesByCategorie(categorie.id).subscribe(services => {
      this.servicesByCategorie[categorie.id] = services;
    });
  }

  selectCategorie(categorie: Categorie): void {
    this.services = this.servicesByCategorie[categorie.id];
  }

  toggleSelection(service: Service): void {
    const index = this.selectedServices.indexOf(service);
    if (index !== -1) {
      this.selectedServices.splice(index, 1);
    } else {
      if (this.selectedServices.length < 2) {
        this.selectedServices.push(service);
      }
    }
  }

  isSelected(service: Service): boolean {
    return this.selectedServices.indexOf(service) !== -1;
  }

  isDisabled(service: Service): boolean {
    return this.selectedServices.length === 2 && !this.isSelected(service);
  }

  getButtonText(service: Service): string {
    if (this.isSelected(service)) {
      return 'Sélectionné';
    } else if (this.isDisabled(service)) {
      return 'Max. 2 services';
    } else {
      return 'Sélectionner';
    }
  }

  hasSelectedServices(): boolean {
    return this.selectedServices.length > 0;
  }

  goToReservation(): void {
    if (this.selectedServices.length === 0) {
      alert("Veuillez sélectionner au moins un service.");
      return;
    }
    this.router.navigate(['/reservation'], { queryParams: { services: JSON.stringify(this.selectedServices) } });
  }
  






















/* 
  selectionnerCategorie(categorie: Categorie) {
    this.categorieService.getServicesByCategorie(categorie.id).subscribe(services => {
      this.services = services;
      console.log(this.services);
    });
  }

  toggleSelection(service: Service): void {
    const index = this.selectedServices.indexOf(service);
    if (index !== -1) {
      this.selectedServices.splice(index, 1);
    } else {
      this.selectedServices.push(service);
    }
  }

  isSelected(service: Service): boolean {
    return this.selectedServices.indexOf(service) !== -1;
  }

  isDisabled(service: Service): boolean {
    return this.selectedServices.length === 2 && !this.isSelected(service);
  }

  getButtonText(service: Service): string {
    if (this.isSelected(service)) {
      return 'Sélectionné';
    } else if (this.isDisabled(service)) {
      return 'Max. 2 services';
    } else {
      return 'Sélectionner';
    }
  }

  hasSelectedServices(): boolean {
    return this.selectedServices.length > 0;
  }

  goToReservation(): void {
    // rediriger l'utilisateur vers le composant de réservation avec les services sélectionnés
  }
   */

}
