import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { EcommService } from '../ecomm.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit {
  @Input() productAdded: any;
  total = 0;

  @ViewChild('htmlData') htmlData!: ElementRef;
  @Output() onOrderFinished = new EventEmitter();

  stripeAPIKey: string =
    'pk_test_51OJ2m1EsMJreTcapmubRuM7P9EE6qQMa48297cSREdgFas78rIDNcKzdqkaC0mmLgeB35XZxTObOaYbrBK5tfm1P00zStuLTW3';
  paymentHandler: any = null;

  constructor(private ecommService: EcommService) {}
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null;
  }
  ngOnInit() {
    // Calculate the initial total based on the products added
    this.calculateTotal();
    this.invokeStripe();
  }

  calculateTotal() {
    // Sum the prices of all products added
    this.total = this.productAdded.reduce(
      (sum: any, order: any) => sum + order.product.prix * order.quantity,
      0
    );
  }

  openPDF() {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 100;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 20;
      PDF.addImage(FILEURI, 'PNG', 50, position, fileWidth, fileHeight);
      PDF.save('cart.pdf');
    });
  }

  checkoutProduct() {
    this.makePayment();
  }

  makePayment() {
    let amount = this.total;
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripeAPIKey,
      locale: 'auto',
      token: (stripeToken: any) => {
        this.processPayment(amount, stripeToken);
      },
    });
    paymentHandler.open({
      name: 'ItSolutionStuff.com',
      description: '3 widgets',
      amount: amount * 100,
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripeAPIKey,
          locale: 'auto',
          token: (stripeToken: any) => {
            console.log(stripeToken);
            alert('Payment has been successful!');
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }

  processPayment(amount: any, stripeToken: any) {
    console.log(stripeToken);
    const data = {
      amount: amount * 100,
      token: stripeToken,
    };

    this.ecommService.sendPayment(data).subscribe({
      next: (res: any) => {
        console.log(res);
        alert('Operation successfully done');
        this.openPDF();
        this.onOrderFinished.emit(false);
        this.total = 0;
      },
      error: (e) => {
        console.log(e);
        alert('Error: Operation not done');
      },
    });
  }
}
