import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/_service/user/user.service';
import { User } from 'src/app/models/model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['lastname', 'firstname', 'email', 'gsm', 'actions'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatSort, { static: true }) sort!: MatSort | null;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator | null;

  constructor(private userService : UserService,private router:Router){}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.dataSource = new MatTableDataSource<User>(users.filter(user => user.role === "USER"));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(idUser: number) {
    this.userService.deleteUser(idUser);
  }

}
