import { Component, OnInit } from '@angular/core';
import { CategorieServiceService } from 'src/app/core/_service/categorie-service/categorie-service.service';
import { CategorieService, Service } from 'src/app/models/model';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.css']
})
export class ServiceCreateComponent implements OnInit{
  newService:Service = new Service();
  categories!:CategorieService[];

  constructor(private serviceS: CategorieServiceService){}

  ngOnInit(): void {
    this.serviceS.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  addService(){
    this.serviceS.createService(this.newService);
  }
}
