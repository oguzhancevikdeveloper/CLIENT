import { Component,OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private alertify: AlertifyService) {}

  ngOnInit(): void {
    
  }

  m(){
    this.alertify.message("Merhaba",{
       delay :3,
       messageType : MessageType.Success,
       position : Position.TopRight,
      
    })
  }
  d(){
    this.alertify.dismiss();
  }
}
