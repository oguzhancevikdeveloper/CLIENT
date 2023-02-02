import { Directive, ElementRef, HostListener, Renderer2, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';

declare var $: any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef, private _renderer: Renderer2, private httpClientService: HttpClientService, public dialog: MatDialog,
    private spinner: NgxSpinnerService, private alertifyService: AlertifyService) {

    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png")
    img.setAttribute("style", "cursor:pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img)
  }

  @Input() id: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();
  @Input() controller: string;

  @HostListener("click")
  async onclick() {

    this.openDialog(async () => {
      this.spinner.show(SpinnerType.BallAtom);
      const td: HTMLTableCellElement = this.element.nativeElement;
      this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(data => {
        $(td.parentElement).animate({
          opacity: 0,
          left: "+=50",
          height: "toogle"
        }, 700, () => {
          this.callback.emit();
          this.alertifyService.message("Ürün başariyla silinmiştir.", {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight
          })
        });
      }, (errorResponse: HttpErrorResponse) => {
        this.spinner.hide(SpinnerType.BallAtom);
        this.alertifyService.message("Ürün silinirken beklenmeyen bir hatayla karşilaşilmiştir.", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      });
    });
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }







}
