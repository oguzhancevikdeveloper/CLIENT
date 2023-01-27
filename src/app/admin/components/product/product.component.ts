import { Component, OnInit, } from '@angular/core';
import { ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends BaseComponent implements OnInit {
  constructor(private alertify: AlertifyService, spinner: NgxSpinnerService) {
    super(spinner)
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom)
  }
  @ViewChild(ListComponent) listComponents: ListComponent
  createdProduct(create_product: Create_Product) {
    this.listComponents.getProducts();
  }
}
