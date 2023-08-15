import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieServiceService } from 'src/app/core/_service/categorie-service/categorie-service.service';
import { CategorieService, Service } from 'src/app/models/model';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit{
  isCollapsedCategories = false;
  isCollapsedServices = true;
  categories!: CategorieService[];
  services!: Service[];
  categorieToUpdate: CategorieService = new CategorieService();
  serviceToUpdate: Service = new Service();
  newCategorie: CategorieService = new CategorieService();

  constructor(private serviceS: CategorieServiceService, private modalService: NgbModal){};

  ngOnInit(): void {
      this.serviceS.getAllCategories().subscribe(categories=>{
        this.categories = categories;
      })
      this.serviceS.getAllServices().subscribe(services=>{
        this.services = services
      })
    }

  open(content: any,categorie: CategorieService) {
    this.categorieToUpdate = {...categorie};
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  openService(contents:any, service: Service) {
    this.serviceToUpdate = {...service};
    this.modalService.open(contents, { ariaLabelledBy: 'modal-basic-title' });
  }

  openNewCategorie(contentC: any){
    this.modalService.open(contentC, { ariaLabelledBy: 'modal-basic-title' });
  }

  addCategorie(){
    this.serviceS.createCategorieService(this.newCategorie);
  }

  updateCategorie() {
    this.serviceS.updateCategorieService(this.categorieToUpdate);
  }

  deleteCategorie(idCategorie: any) {
    this.serviceS.deleteCategorieService(idCategorie);
  }

  updateService() {
    this.serviceS.updateService(this.serviceToUpdate);
  }

  deleteService(idService: any) {
    this.serviceS.deleteService(idService);
  }

  clickCatg(){
    this.isCollapsedServices=true;
  }
  clickServ(){
    this;this.isCollapsedCategories=true;
  }
}
