import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import jsondata from '../../assets/JSON/item_data.json';
import { setupTestingRouterInternal } from '@angular/router/testing';
import { fakeAsync, flush } from '@angular/core/testing';
import { count, identity, max, noop } from 'rxjs';
import { Call } from '@angular/compiler';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css']
})
export class CartCheckoutComponent implements OnInit {
  products: any = [];
  name:any;
  list_radio: any;
  r_btn_price: any;
  spgid: any;
  showdata: any;
  addcard: any;
  a: any;
  show: any;
  no = 1;
  tot_no1=1;
  // is_default_selected=false;
  no1 = 1;
  aaa: any;
  modid: any;
  activeIndex: any;
  count:any;
  total_amt:any;
  final_amt:any;

  aptnm:any;

  private _jsonURL = 'assets/JSON/item_data.json';
  constructor(private httpClient: HttpClient) { }

  displayStyle = "none";
  viewcard="none";
  displaymsg="none";
  displayqty_box="none";
  displaycusom_btn="block";
  displaycard="none";
  displaycheckout="none";
  // qty_box="none";

  ngOnInit(): void {
      this.httpClient.get(this._jsonURL).subscribe(data => {
      console.log(data);
      this.products = data;
      this.modid = this.products.specifications[0].list[0]._id;
      this.addcard = this.products.specifications[0].list[0].price;
      this.list_radio = this.products.specifications[0].list;
      this.name=this.products.specifications[0].list[0].name;
      console.log(this.list_radio);
      this.r_btn_price = this.products.specifications[0].list[0].price;
    })
  }

  changedata(data: any) {
    console.log(data);
    this.modid = data._id;
    this.addcard = data.price;
    this.r_btn_price = data.price;    
    this.no1=1; 
    this.no=1;
    data.max_range=1;
    this.name=data.name;
    this.show = false;
    
    // data.is_default_selected = true;  
  }
  
  chkbox(i: any, q1: any) {       
    console.log(i);
    console.log(q1);            
    i.list.forEach((x: { price: any; _id: any; is_default_selected: boolean; qty:number; total:number}) => {      
      // console.log(i.list);
      if (x._id == q1._id) {
        this.no1=1;
          // x.qty=1;
          // x.total=x.qty*x.price;
          // this.no1=x.qty;
        x.is_default_selected = !x.is_default_selected;
        console.log(x.price);
        i.max_range = 2;
        if (x.is_default_selected == true) {
          x.qty=1;
          // x.total=x.qty*x.price;
          // this.no1=x.qty;
          // this.addcard=this.r_btn_price;
          this.no1=x.qty;
          this.addcard = this.addcard + x.price;
          this.total_amt=this.addcard;
          this.show = true;
        }
        else {
          console.log(x.qty);
          console.log(x.qty*x.price);
                    
          console.log(this.r_btn_price);
          console.log(this.addcard);
          if(this.r_btn_price<this.addcard){
            this.addcard = this.addcard - (x.qty*x.price);
          }
          // this.total_amt=this.addcard;
          this.show = false;
          console.log(x);
          i.max_range = 1;
        }
        this.show=true;
        console.log(x);
      }
    })
  }

  openPopup() {
    // this.displaycheckout="block";
    this.displayStyle = "block";
    this.displaymsg="none";
  }
  ClosePopup() {
    this.displayStyle = "none";
    this.displaymsg="none";
    this.displaycard="none";
    this.displaycheckout="none";
  }

  tot_qty: any;

  inc_qty1(q_price: any,q1:any) {
    // console.log(q_price*this.no1);
    console.log(q1.qty);
    
    q1.qty = q1.qty + 1;
    q1.total=q1.qty*q1.price;

    this.no1=q1.qty;
    console.log(q1,'qty');
    
    // this.tot_no1=this.no1;
    // this.tot_qty = q_price * this.no1;
    // console.log(this.tot_qty,'total qty');
    
    console.log(this.total_amt);
    
    this.addcard=this.addcard+q_price;
    console.log(this.addcard);
    // this.addcard = this.r_btn_price + this.tot_qty;
    // console.log(this.addcard = this.r_btn_price + this.tot_qty);

    // this.total_amt=this.addcard;

    // this.addcard=this.addcard;
    // console.log(this.addcard+this.tot_qty);
    // console.log(this.r_btn_price+this.tot_qty);    
    // this.addcard=this.addcard+(q_price*this.no1);
    // console.log(this.addcard);
  }

  dec_qty1(q_price: any, q1:any) {
    q1.qty=q1.qty-1;
    q1.total=q1.qty*q1.price;

    this.no1=q1.qty;
    console.log(q1,'qty');
    
    this.addcard=this.addcard-q_price;
    console.log(this.total_amt);
    console.log(q_price);
    console.log(this.addcard);
   
    // this.no1 = this.no1 - 1;
    // this.tot_qty = q_price * this.no1;

    // console.log(this.tot_qty,'total qty');

    // console.log(this.addcard);
    // console.log(this.total_amt=this.addcard+this.tot_qty-q_price ,"final total");

    // this.addcard = this.addcard + this.tot_qty;
    // console.log(this.addcard = this.r_btn_price + this.tot_qty);
    
    if (this.no1 == 0) {
      this.no1 = 1;
      this.show = false;
      // this.addcard = this.addcard + q_price;
      this.addcard = this.addcard;
    }
  }

  inc_qty() {
    this.no = this.no + 1;
    console.log(this.no);
  }

  dec_qty() {
    this.no = this.no - 1;
    if (this.no == 0) {
      this.no = 1;
    }
    console.log(this.no);
  }

  qty1:any;
  chk_name:any;
  chk_qty:any;
  addtocard(total_amount:any){
    this.displaycusom_btn="none";
    this.displayqty_box="flex"; 
    this.displayStyle = "none";
    this.viewcard="flex";
    console.log(total_amount);    
    // console.log( this.name);

    // for(let i of this.products.specifications){      
    //   // console.log(i);      
    //   if(i.max_range==2)
    //   {
    //     // console.log( this.name);
    //     this.aptnm=i.modifierName;
    //     console.log(i);                
    //     i.list.forEach((x: { price: any; _id: any; is_default_selected: boolean; qty:number; name:any}) => {
    //       if(x.is_default_selected==true){
    //         console.log(i.name, x.price , x.qty, x.name);            
    //         x.qty=x.qty;
    //         this.chk_name=x.name;
    //         this.chk_qty=x.qty;
    //       }
    //     })
    //     // console.log(i.list);
    //   }
    // }
    // console.log(this.aptnm);        
  }
  edit_card(){
    if(this.displayqty_box=="flex"){
      this.displaymsg="block";       
    }    
    // for(let i of this.products.specifications){
    //   // console.log(i);
    //   if(i.max_range==2)
    //   {
    //     this.aptnm=i.modifierName;
    //     console.log(i);                
    //     i.list.forEach((x: { price: any; _id: any; is_default_selected: boolean; qty:number; name:any}) => {
    //       if(x.is_default_selected==true){
    //         console.log(i.name, x.price , x.qty, x.name);
    //         x.qty=x.qty;
    //       }
    //     })
    //     // console.log(i.list);
    //   }
    // }
    // console.log(this.aptnm);   
  }
  repeat(){    
    // this.ngOnInit()    
    this.no=this.no+1;
    this.displaymsg="none";
  }

  customize_package(){
    this.displaymsg="none";
    this.displayStyle="block";            
    for(let i of this.products.specifications){
      // console.log(i);
      if(i.max_range==2)
      {
        this.aptnm=i.modifierName;
        console.log(i);                
        i.list.forEach((x: { price: any; _id: any; is_default_selected: boolean; qty:number; name:any}) => {
          if(x.is_default_selected==true){
            console.log(i.name, x.price , x.qty, x.name);
            x.qty=x.qty;
          }
        })
        // console.log(i.list);
      }
    }
    console.log(this.aptnm);   
    // this.no=1;
    
    // this.ngOnInit();    
  }

  viewcard_data(){
      this.displaycard="block";
  }

  checkout(){    
    this.final_amt=this.addcard*this.no;
    this.displaycheckout="block";    
  }  
  deleteorder(){    
    this.ClosePopup();
    // this.displaycard="none";
    this.viewcard="none";
    this.displaycusom_btn="block";
    this.displayqty_box="none";
    this.no=1;
    this.ngOnInit();    
  }
}

