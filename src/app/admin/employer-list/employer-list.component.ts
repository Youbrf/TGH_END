import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/_service/user/user.service';
import { User } from 'src/app/models/model';

@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.css']
})
export class EmployerListComponent implements OnInit{
  employers: User[] = [];

  constructor(private userS: UserService){}

  ngOnInit(): void {
      this.loadEmployers();
    }
  loadEmployers() {
    this.userS.getAllUsers().subscribe(employers =>{
      for (const employer of employers) {
        if (employer.role === 'EMPLOYEE') {
          this.employers.push(employer);
        }
      }
    });
  }

  deleteEmployer(idEmployer: number) {
    this.userS.deleteUser(idEmployer);
  }

}
