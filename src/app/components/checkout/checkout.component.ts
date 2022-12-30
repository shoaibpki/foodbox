import { Cart } from './../../interfaces/cart';
import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @ViewChild('pdfdata') pdfdata!: ElementRef
  cart: Cart[] = []
  gTotal: number = 0
  date!: Date
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCart().forEach(c => {
      this.date = c.saleDate
      this.cart.push(c)
      this.gTotal = this.gTotal + (c.subtotal ?? 0)
    })
  }

  sendEmail(){
    let DATA: any = document.getElementById("pdfdata")
    html2canvas(DATA).then((canvas) => {
      let filewidth = 208
      let fileheight = (canvas.height * filewidth) / canvas.width
      const FILEURI = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4')
      let position = 0
      pdf.addImage(FILEURI,'png',0,position,filewidth,fileheight)
      pdf.save('bill.pdf')
    })
  }
}
