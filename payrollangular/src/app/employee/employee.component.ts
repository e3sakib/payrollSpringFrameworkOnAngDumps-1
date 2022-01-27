import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employee:Employee= new Employee();
  employees:Employee[] = [];
  isSave:boolean= true
  empIndex:number= -1

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.load();
  }
  load() {
    this.http.get<any>('http://localhost:8080/employee/getAll').subscribe(employees=>{
      console.log(employees+"M");
      
      this.employees=employees;
    }
    )
  }
  addEmployee(){
    console.log(this.employee);
    this.employees.push(this.employee)
    console.log(this.employee);

    const headers = {"content-Type":"application/json"}

    this.http.post<any>("http://localhost:8080/employee/save", JSON.stringify(this.employee), { 'headers': headers }).subscribe(data=> {
     
     console.log(data);
 
     }
 
     )

    
  }

  resetForm() {
    this.employee = new Employee();
  }

  editEmployee(i: number) {
    this.empIndex = i
    this.employee.name = this.employees[i].name
    this.employee.phone = this.employees[i].phone
    this.employee.salary = this.employees[i].salary 
    this.employee.address = this.employees[i].address
    this.isSave = false
  }
  updateEmployee() {
    this.isSave = true
    this.employees[this.empIndex] = this.employee;
    this.resetForm()
  }
  deleteEmployee(i: number) {
    this.employees = this.employees.filter((p, index) => i != index)
  }

}
