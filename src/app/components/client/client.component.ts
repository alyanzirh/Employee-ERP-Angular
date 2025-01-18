import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/class/client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/interface/role';
import { AsyncPipe, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Constant } from '../../constant/Constant';
import { AlertComponent } from "../../reusableComponent/alert/alert.component";
import { AButtonComponent } from "../../reusableComponent/a-button/a-button.component";

@Component({
  selector: 'app-client',
  imports: [FormsModule, UpperCasePipe, DatePipe, JsonPipe, AsyncPipe, AlertComponent, AButtonComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  required_msg: String = Constant.VALIDATION_MESSAGE.REQUIRED;

  currentDate:Date = new Date();

  clientObj: Client = new Client();
  clientList: Client[] = [];
  clientService = inject(ClientService);

  // for asyncpipe example

  // naming convention
  userList$: Observable<any> = new Observable<any>;

  ngOnInit(): void {
    this.loadClient();

    this.userList$ = this.clientService.getAllUser();
  }

  loadClient() {
    this.clientService.getAllClients().subscribe((res:APIResponseModel)=>{
      this.clientList = res.data;
    })
  }

  onSaveClient(data: string) {
    debugger;
    this.clientService.addUpdate(this.clientObj).subscribe((res:APIResponseModel)=>{
      if(res.result) {
        alert("Client successfully created")
        this.loadClient()
        this.clientObj = new Client();
      } else {
        alert(res.message)
      }
    })
  }

  onEdit(data: Client) {
    this.clientObj = data;
  }

  onDelete(id: number){
    const isDelete = confirm("Are you sure?");
    if(isDelete) {
      this.clientService.deleteClientByID(id).subscribe((res:APIResponseModel)=>{
        if(res.result) {
          alert("Client successfully deleted")
          this.loadClient()
        } else {
          alert(res.message)
        }
      })
    }
  }

}
