import { Component, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
import { ItemModel, cartProductsModel } from 'src/app/models/cart.model';
import { StoreModel } from 'src/app/models/store.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService, DELIVERY_TYPE } from 'src/app/services/cart.service';
import { LocationModel, LocationService } from 'src/app/services/location.service';
import { MenuService } from 'src/app/services/menu.service';
import { TableService } from 'src/app/services/table.service';
import { Helper } from 'src/app/shared/helper';
import { environment } from 'src/environments/environment';
import { DEFAULT_IMAGE } from 'src/app/constants/constants';
import * as moment from 'moment-timezone';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Table, TableBookingModel } from 'src/app/models/table_booking.model';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { Subscription } from 'rxjs';
import { PRODUCT_SEO_TAGS, THEME_NO } from '../../constants/constants'
import { TranslateService } from '@ngx-translate/core';
import { NotifiyService } from 'src/app/services/notifier.service';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

declare var $;
declare var google;

export interface ProductGroup {
  image_url: string;
  name: string;
  product_ids: Array<string>;
  sequence_number: number;
  store_id: string
  _id: string
}

export interface Menu {
  products: Array<{
    items: Array<{
      name: string;
      details: string;
      specification: Array<any>;
      specifications_unique_id_count: number;
      unique_id: number;
      is_item_in_stock: boolean;
      is_visible_in_store: boolean;
      price: number;
      item_price_without_offer: number;
    }>
    _id: any;
  }>
}

export interface Promo {
  Promo: Array<any>;
}

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})


export class LandingComponent implements OnInit, OnDestroy {
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  valid = true;
  time = { hour: 13, minute: 30 };
  meridian = true;
  is_show :boolean=true;

  product_groups: Array<ProductGroup> = [];
  store: StoreModel = new StoreModel();
  products: any;
  paramSubscription;
  store_id = null;
  product_length: number = 0;
  selected_product: number = 0;
  selected_product_group_id: number = 0;
  filtered_product_item_list = [];
  filtered_item_list;
  selected_product_id;
  selected_item: any = '';
  product_name: string = '';
  product_unique_id: number = 0;
  IMAGE_URL = environment.IMAGE_URL;
  ITEM_DEFAULT_IMAGE = DEFAULT_IMAGE.PRODUCT
  DEFAULT_USER_PROFILE = DEFAULT_IMAGE.STORE_PROFILE;
  THEME_NO:any=THEME_NO;
  product_index: number = 0
  required_temp_count: number = 0;
  total: number = 0
  qty: number = 1
  required_count: number = 0
  note_for_item: any = '';
  private cartProducts: cartProductsModel = new cartProductsModel();
  private cartProductItems: ItemModel = new ItemModel();
  current_main_item;
  map: any;
  store_marker: any;
  store_detail: any = {
    name: '',
    user_rate: 0,
    user_rate_count: 0,
    order_cancellation_charge_value: 0,
    address: '',
    location: [0, 0],
    phone: '',
    country_phone_code: '',
    store_time: [],
    is_distance_unit_mile: false,
    currency_sign: ''
  };
  search_text: any = '';
  is_store_open: boolean = false;
  store_open_day: any;
  total_person = 0;
  table_no = 0;
  tableForm: FormGroup;
  persons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  current_date;
  current_time;
  table_booking: TableBookingModel = new TableBookingModel();
  table_max_date;
  table_max_date_2;
  tables: Array<Table> = [];
  item_price = 0;
  total_item_price = 0;
  imagesUrl = [];
  lightbox_images = []
  slot1: any;
  slot2: any;
  slot3: any;
  slot4: any;
  timezone: any;
  date_array: Array<any> = [];
  schedule_date: any;
  clicked_date: any;
  time_array: Array<any> = []
  is_store_have_table: boolean = false;
  total_tables: Array<any> = [];
  is_item_added_in_table_at_restaurant: Boolean = false;
  current_date_2 = new Date();
  table_id: any
  currentLanguageIndex = localStorage.getItem('selected_lang_index')

  clickTimeout = null;
  cartSubscription: Subscription;

  store_total_rate = 0;
  store_rating = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };
  store_rating_per = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };
  store_review_list = [];
  lastItemSpecifications: any
  theme_number: Number = 1
  dateIndex: number = 0;
  selected_time: any;
  schedule_time: any;
  schedule_time_hours_format:any
  schedule_time_error: boolean = false;
  temp_theme_number: Number = 1
  is_schedule_order: Boolean = false;
  is_table_slots: any;
  table_settings_details: any;
  @HostListener('window:resize', ['$event'])
  onResize(event){
    let width = event.target.innerWidth
    if(width < 768){
      this._helper.ngZone.run(()=> {
        this.theme_number = 1
      })
    } else {
      this.theme_number = this.temp_theme_number
    }
  }


  constructor(public _helper: Helper,
    private _menuService: MenuService,
    private _authService: AuthService,
    private route: ActivatedRoute,
    private _cartService: CartService,
    private tableService: TableService,
    private lightBox: Lightbox,
    private _locationService: LocationService,
    private _tabelService: TableService,
    private _meta: Meta,
    private _commonService: CommonService,
    private _titleService: Title,
    private _notifierService: NotifiyService,
    @Inject(DOCUMENT) private dom) {

    }

    ngOnInit(): void {

    this._commonService.is_location_show = true;
    this.current_date = new Date()
    console.log(this.current_date);
    // this.current_date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : ('0'+(new Date().getMonth() + 1))) + '-' + new Date().getDate()
    this.current_time = new Date().getHours() + ':' + new Date().getMinutes()
    this._helper._loader.isLoading = true
    this.route.queryParams.subscribe(param => {
      if (param.store_id) {
        this.store_id = param.store_id
        this._helper.is_qr_code_scanned = true
      } else {
        this.store_id = this.route.snapshot.paramMap.get('id');
        this._helper.is_qr_code_scanned = false
      }
      if (param.table_id) {
        // console.log(param.table_id)
        this.table_id = param.table_id
        let tableDetails
        this._tabelService.fetch_table({ table_id: param.table_id }).then(result => {
          if (result.success) {
            tableDetails = result.data.table
            this._cartService.user_cart.table_no = tableDetails.table_no
            this._cartService.user_cart.no_of_persons = tableDetails.table_max_person
            this._tabelService.tableCart = tableDetails
          }
        })
      }
    })
    // this.detectAndServe()
    this.tableForm = new FormGroup({
      table_book_date: new FormControl(this.current_date, Validators.required),
      table_book_time: new FormControl(this.current_time, Validators.required),
      no_of_person: new FormControl(null, Validators.required),
      table_no: new FormControl(null, Validators.required),
      booking_type: new FormControl(null, Validators.required),
      schedule_time: new FormControl(this.schedule_date, Validators.required)
    })
    this._helper.store_id = this.store_id
    this.get_store_details().then(() => {
      this.getSeoTags()
      this.get_table_details()
      this.setMap()
      this.get_product_group_list(this.store_id)
      this.getStoreRating()
    })

    this.cartSubscription = this._cartService.cartObservable.subscribe(() => {
      this._initCartItemQty();
    })
  }

  panelChange(event){
    this.product_item_detail(this.product_groups[Number(event.panelId)], this.THEME_NO.THEME_TWO)
  }

  detectDeviceOS() {
    var userAgent = navigator.userAgent || navigator.vendor;
    if (/windows phone/i.test(userAgent)) {
      return 'Windows'
    }
    if (/android/i.test(userAgent)) {
      return "Android"
    }
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      return "iOS"
    }
    return "unknown"
  }

  detectAndServe() {
    if (this.detectDeviceOS() === "Android") {
      window.location.href = `https://webappedeliverynew.appemporio.net/store?store_id=${this.store_id}&table_id=${this.table_id}`
    } else if (this.detectDeviceOS() === "iOS") {
      window.location.href = `edelivery://webappedeliverynew.appemporio.net/store?store_id=${this.store_id}&table_id=${this.table_id}`
      setTimeout(() => {
        window.location.href = `https://webappedeliverynew.appemporio.net/store?store_id=${this.store_id}&table_id=${this.table_id}`
      }, 1000);
    } else if (this.detectDeviceOS() === "Windows") {
      window.location.href = `https://webappedeliverynew.appemporio.net/store?store_id=${this.store_id}&table_id=${this.table_id}`
    } else if (this.detectDeviceOS() === "unknown") {
      window.location.href = `https://webappedeliverynew.appemporio.net/store?store_id=${this.store_id}&table_id=${this.table_id}`
    }
  }

  setMap() {
    var lat = this.store_detail.location[0];
    var lng = this.store_detail.location[1];
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: { lat, lng },
      draggable: false,
      zoomControl: true,
      scrollwheel: false,
      disableDoubleClickZoom: false,
      fullscreenControl: true
    });
    if (lat && lng) {
      this.store_marker = new google.maps.Marker({
        position: { lat, lng },
        map: this.map,
        draggable: false,
        icon: this.IMAGE_URL + 'map_pin_images/Admin/user_pin.png'
      });
      var user_location = new google.maps.LatLng(lat, lng);
      this.map.setCenter(user_location);
      // google.maps.event.addListener(this.store_marker, 'dragend', (marker) => {
      //   lat = marker.latLng.lat();
      //   lng = marker.latLng.lng();
      //   this.geocodePosition(marker.latLng.lat(), marker.latLng.lng());
      // });
    } else {
      // if (!this.store_marker) {
      //   this.store_marker.setMap(null);
      // }
    }
  }

  onSlotClick(){
    this._helper.openModel('table-book-slot', false)
    this.carousel.pause();
  }

  closeModel(id){
    $(`#${id}`).removeClass('model-open')
    $('body').removeClass('model-open')
  }

  set_time(time){
    this.selected_time = time;
    this.schedule_time = time.time_format;
    this.schedule_date = time.date.date;
    this.clicked_date = time.date.date_format;
    this.set_order_time(true);
    this.set_schedule(true);
    // $('#table-book-slot').removeClass('model-open')
    // $('body').removeClass('model-open')
  }

  set_schedule(bool) {
    if (bool) {
      if (this._cartService.user_cart.schedule_date) {
        this._cartService.user_cart.is_schedule_order = true;
        this._notifierService.showNotification('success', this._helper.trans.instant('schedule-time-select-successfully'));
        // $('.schedule-form').css('display', 'none');
        // setTimeout(() => {
        //   $('.schedule-form').css('display', '');
        // }, 100);
      } else {
        this._notifierService.showNotification('error', this._helper.trans.instant('please-select-time-to-schedule-order'));
      }
    } else {
      this._cartService.user_cart.is_schedule_order = false;
      this._cartService.user_cart.schedule_date = null;
      this.selected_time = null;

      let date: any = this._cartService.user_cart.server_time;
      date = new Date(date).toLocaleString("en-US", { timeZone: this.timezone })
      date = new Date(date);
      // this.check_open(date, true);
    }
  }

  set_order_time(boolean) {
    if (boolean) {
      if (this.schedule_date !== '' && this.schedule_time !== '') {

        let server_date: any = new Date(this._cartService.user_cart.server_time);
        server_date = new Date(server_date).toLocaleString("en-US", { timeZone: this.timezone })
        server_date = new Date(server_date);

        let date = JSON.parse(JSON.stringify(this.schedule_date.split('-')));
        var schedule_time = this.schedule_time.split('-');
        var schedule_table_date;
        let time = schedule_time[0].split(':')
        var selected_date1 = null;

        if (schedule_time[1] && schedule_time[1] != "") {
          let time1 = schedule_time[1].split(':')
          selected_date1 = new Date(Date.now());
          selected_date1 = new Date(selected_date1).toLocaleString("en-US", { timeZone: this.timezone })
          selected_date1 = new Date(selected_date1);
          selected_date1.setDate(date[2])
          selected_date1.setMonth(date[1] - 1)
          selected_date1.setFullYear(date[0])
          selected_date1.setHours(time1[0], time1[1], 0, 0);
        }
        let selected_date: any = new Date(Date.now());
        selected_date = new Date(selected_date).toLocaleString("en-US", { timeZone: this.timezone })
        selected_date = new Date(selected_date);
        selected_date.setDate(date[2])
        selected_date.setMonth(date[1] - 1)
        selected_date.setFullYear(date[0])
        selected_date.setHours(time[0], time[1], 0, 0);
   
        schedule_table_date = selected_date;

        let timeDiff = Math.round(selected_date.getTime() - server_date.getTime());

        if (timeDiff / 60000 >= 30) {
          this.schedule_time_error = false;
          this._cartService.user_cart.schedule_date = selected_date;
          this._cartService.user_cart.schedule_date1 = selected_date1;

          if (Number(schedule_time[0].split(":")[0]) > 12) {
            schedule_time[0] = this._helper.pad2(Number(schedule_time[0].split(":")[0]) - 12) + ':' + schedule_time[0].split(":")[1] + ' PM';
          } else {
            schedule_time[0] = schedule_time[0] + ' AM';

          }
          if (Number(schedule_time[1].split(":")[0]) > 12) {
            schedule_time[1] = this._helper.pad2(Number(schedule_time[1].split(":")[0]) - 12) + ':' + schedule_time[1].split(":")[1] + ' PM';
          } else {
            schedule_time[1] = schedule_time[1] + ' AM';
          }

 
          this.schedule_time = schedule_time[0] + "-" + schedule_time[1];
          this._cartService.user_cart.clicked_date = this.clicked_date + ' ' + schedule_time;
        } else {
          this.schedule_time_error = true;
          // this.helper.trans.instant('store_not_provide_service_at_this_time')
        }
      } else {
        this.schedule_time_error = true;
      }

    } else {
      this._cartService.user_cart.schedule_date = null;
      this.schedule_time_error = false;
      this.schedule_date = '';
      this.schedule_time = '';
    }

    this.check_valid_time();
    console.log('patch value')
    this.tableForm.patchValue({schedule_time: this.schedule_time , table_book_date:schedule_table_date});

  
  }

  check_valid_time() {

    this.is_schedule_order = this._cartService.user_cart.is_schedule_order;

    let server_date: any = new Date(this._cartService.user_cart.server_time);
    server_date = new Date(server_date).toLocaleString("en-US", { timeZone: this.timezone })
    server_date = new Date(server_date);

    let selected_date: any = this._cartService.user_cart.schedule_date

    let day_diff = selected_date.getDay() - server_date.getDay();
    let timeDiff = Math.round(selected_date.getTime() - server_date.getTime());


    if (timeDiff / 60000 >= 30) {
      this.schedule_time_error = false;
      if (day_diff > 0) {
        // this.check_open(selected_date, false);
      } else {
        // this.check_open(selected_date, true);
      }

    } else {
      this.schedule_time_error = true;
    }
  }

  lang_change_month_day() {
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let time_date = new Date();
    time_date.setHours(0, 0, 0, 0);
    for (var i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(date.getDate() + i);
      date = new Date(date);
      var day = this._helper.trans.instant(days[date.getDay()]);
      var month = this._helper.trans.instant(months[date.getMonth()]);
      var date_format = day + ', ' + month + ' ' + date.getDate();
      this.date_array[i] = { day: date.getDay(), date_format: date_format, isActive: false, date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() };
    }
    if (this.date_array.length > 0) {
      this.set_date(this.date_array[0]);
    }
    // this.open_check();
  }

  set_date(date) {
    this.slot1 = false;
    this.slot2 = false;
    this.slot3 = false;
    this.slot4 = false;
    var diff1 = String(parseInt(moment().tz(this.timezone).format("ZZ")) - parseInt(moment(new Date()).format("ZZ")));
    var hour = "0";
    var minute = "0";
    if (diff1[0]) {
      hour = diff1[0];
    }
    if (diff1[1]) {
      if (diff1[1] == '7') {
        minute = 3 + diff1[2];
      } else {
        minute = diff1[1] + diff1[2];
      }

    }
    var total_minute = ((Number(hour) * 60) + Number(minute)) * 60000;
    if (diff1[0] == "-") {
      total_minute = total_minute * -1;
    }
    var current_store_time = new Date(Number(new Date()) + total_minute);

    if (date == this.date_array[0]) {
      this.schedule_date = date.date;
    }
    this.clicked_date = date.date_format;
    let date_with_Delivery_time = new Date(new Date(Number(new Date()) + total_minute).getTime() + this.store.schedule_order_create_after_minute * 60000)
    date_with_Delivery_time = new Date(date_with_Delivery_time.setSeconds(0, 0))
    this.date_array.forEach((date_detail) => {
      date_detail.isActive = false;
      if (date_detail.date == date.date) {
        date_detail.isActive = true;
      }
    });
    let checkSelectedDate = new Date(date.date);
    checkSelectedDate.setHours(23, 59, 59, 0);
    var diff = (checkSelectedDate.getTime() - new Date(Number(new Date()) + total_minute).getTime()) / 1000;
    diff /= 60;
    diff = Math.abs(Math.round(diff));

    var n = checkSelectedDate.getDay();

    let time_date = new Date(date.date);
    let time_date_close = new Date(date.date);
    var date1 = new Date(date.date);
    this.time_array = [];
    var i = 0;

    //
    if (this._cartService.user_cart.is_user_pick_up_order == false && (!this.is_table_slots)) {
      console.log('1')

      if (this.store.is_table_reservation == true && this.store.table_booking_time[date.day].is_booking_open == true && this.store.store_delivery_time[date.day].is_store_open_full_time == false) {
        date1.setHours(0, 0, 0, 0);


        this.store.store_delivery_time[n].day_time.forEach((store_time, index) => {

            let x = date1.setHours(Math.floor(store_time.store_open_time / 60), store_time.store_open_time % 60, 0, 0)

            let x1 = new Date(x);
            let x2 = x1.getTime();

            time_date_close.setHours(Math.floor(store_time.store_open_time / 60), store_time.store_open_time % 60, 0, 0);
            time_date_close = new Date(time_date_close.setMinutes(time_date_close.getMinutes() + 60));
            time_date.setHours(Math.floor(store_time.store_open_time / 60), store_time.store_open_time % 60, 0, 0);
            time_date = new Date(time_date);

            let y = date1.setHours(Math.floor(store_time.store_close_time / 60), store_time.store_close_time % 60, 0, 0)
            let y1 = new Date(y);

            for (; time_date < y1;) {
              var hours = time_date.getHours();
              var am_pm = "AM";
              if (hours >= 12) {
                hours = hours > 12 ? hours - 12 : hours;
                am_pm = "PM";
              } else if (hours === 0) {
                hours = 12;
              }
              var hours_close = time_date_close.getHours();
              var am_pm_close = "AM";
              if (hours_close >= 12) {
                hours_close = hours_close > 12 ? hours_close - 12 : hours_close;
                am_pm_close = "PM";
              } else if (hours_close === 0) {
                hours_close = 12;
              }


              if (date_with_Delivery_time.getTime() <= time_date.getTime()) {
                if (time_date.getHours() < 6) {
                  var type = 1;
                  this.slot1 = true;
                } else if (time_date.getHours() < 12) {
                  var type = 2;
                  this.slot2 = true;
                } else if (time_date.getHours() < 18) {
                  var type = 3;
                  this.slot3 = true;
                } else {
                  var type = 4;
                  this.slot4 = true;
                }
                this.time_array[i] = { type: type, date: date, time_format: this._helper.pad2(time_date.getHours()) + ':' + this._helper.pad2(time_date.getMinutes()) + '-' + this._helper.pad2(time_date_close.getHours()) + ':' + this._helper.pad2(time_date_close.getMinutes()), time: this._helper.pad2(hours) + ':' + this._helper.pad2(time_date.getMinutes()) + " " + am_pm + ' - ' + this._helper.pad2(hours_close) + ':' + this._helper.pad2(time_date_close.getMinutes()) + " " + am_pm_close }
                i++;
              }
              time_date.setMinutes(time_date.getMinutes() + 60);
              time_date_close.setMinutes(time_date_close.getMinutes() + 60);
            }
            if (this.time_array.length > 0) {
              this.set_time(this.time_array[0])
            }
        });
      } else {

        if (this.store.table_booking_time[date.day].is_booking_open_full_time) {
          let x = date1.setHours(0, 0, 0, 0)
          let x1 = new Date(x);
          let x2 = x1.getTime();

          time_date_close.setHours(0, 0, 0, 0);
          time_date_close = new Date(time_date_close.setMinutes(time_date_close.getMinutes() + 60));
          time_date.setHours(0, 0, 0, 0);
          time_date = new Date(time_date);

          let y = date1.setHours(23, 59, 0, 0)
          let y1 = new Date(y);

          for (; time_date < y1;) {
            var hours = time_date.getHours();
            var am_pm = "AM";
            if (hours >= 12) {
              hours = hours > 12 ? hours - 12 : hours;
              am_pm = "PM";
            } else if (hours === 0) {
              hours = 12;
            }
            var hours_close = time_date_close.getHours();
            var am_pm_close = "AM";
            if (hours_close >= 12) {
              hours_close = hours_close > 12 ? hours_close - 12 : hours_close;
              am_pm_close = "PM";
            } else if (hours_close === 0) {
              hours_close = 12;
            }

            if (date_with_Delivery_time < time_date) {
              if (time_date.getHours() < 6) {
                var type = 1;
                this.slot1 = true;
              } else if (time_date.getHours() < 12) {
                var type = 2;
                this.slot2 = true;
              } else if (time_date.getHours() < 18) {
                var type = 3;
                this.slot3 = true;
              } else {
                var type = 4;
                this.slot4 = true;
              }
              this.time_array[i] = { type: type, date: date, time_format: this._helper.pad2(time_date.getHours()) + ':' + this._helper.pad2(time_date.getMinutes()) + '-' + this._helper.pad2(time_date_close.getHours()) + ':' + this._helper.pad2(time_date_close.getMinutes()), time: this._helper.pad2(hours) + ':' + this._helper.pad2(time_date.getMinutes()) + " " + am_pm + ' - ' + this._helper.pad2(hours_close) + ':' + this._helper.pad2(time_date_close.getMinutes()) + " " + am_pm_close }
              i++;
            }
            time_date.setMinutes(time_date.getMinutes() + 60);
            time_date_close.setMinutes(time_date_close.getMinutes() + 60);
          }
          if(this.time_array.length > 0){
            // this.set_time(this.time_array[0])
          }
        } else {
          this.slot1 = undefined
          this.slot2 = undefined
          this.slot3 = undefined
          this.slot4 = undefined
          this.schedule_date = '';
          this.time_array = [];
        }


      }
    } else if(this.is_table_slots) {
      console.log(this.table_settings_details)
      console.log(n)
      date1.setHours(0, 0, 0, 0);


      this.table_settings_details.booking_time[n].day_time.forEach((store_time, index) => {
        if (store_time.is_slot_available) {
          console.log(store_time.is_slot_available)
          console.log(store_time.store_open_time)

          let x = date1.setHours(Math.floor(store_time.booking_open_time / 60), store_time.booking_open_time % 60, 0, 0)

          let x1 = new Date(x);
          let x2 = x1.getTime();

          time_date_close.setHours(Math.floor(store_time.booking_open_time / 60), store_time.booking_open_time % 60, 0, 0);
          time_date_close = new Date(time_date_close.setMinutes(time_date_close.getMinutes() + 60));
          time_date.setHours(Math.floor(store_time.booking_open_time / 60), store_time.booking_open_time % 60, 0, 0);
          time_date = new Date(time_date);

          let y = date1.setHours(Math.floor(store_time.booking_close_time / 60), store_time.booking_close_time % 60, 0, 0)
          let y1 = new Date(y);

          for (; time_date < y1;) {
            var hours = time_date.getHours();
            var am_pm = "AM";
            if (hours >= 12) {
              hours = hours > 12 ? hours - 12 : hours;
              am_pm = "PM";
            } else if (hours === 0) {
              hours = 12;
            }
            var hours_close = time_date_close.getHours();
            var am_pm_close = "AM";
            if (hours_close >= 12) {
              hours_close = hours_close > 12 ? hours_close - 12 : hours_close;
              am_pm_close = "PM";
            } else if (hours_close === 0) {
              hours_close = 12;
            }


            if (date_with_Delivery_time.getTime() <= time_date.getTime()) {
              if (time_date.getHours() < 6) {
                var type = 1;
                this.slot1 = true;
              } else if (time_date.getHours() < 12) {
                var type = 2;
                this.slot2 = true;
              } else if (time_date.getHours() < 18) {
                var type = 3;
                this.slot3 = true;
              } else {
                var type = 4;
                this.slot4 = true;
              }
              this.time_array[i] = { type: type, date: date, time_format: this._helper.pad2(time_date.getHours()) + ':' + this._helper.pad2(time_date.getMinutes()) + '-' + this._helper.pad2(time_date_close.getHours()) + ':' + this._helper.pad2(time_date_close.getMinutes()), time: this._helper.pad2(hours) + ':' + this._helper.pad2(time_date.getMinutes()) + " " + am_pm + ' - ' + this._helper.pad2(hours_close) + ':' + this._helper.pad2(time_date_close.getMinutes()) + " " + am_pm_close }
              i++;
            }
            time_date.setMinutes(time_date.getMinutes() + 60);
            time_date_close.setMinutes(time_date_close.getMinutes() + 60);
          }
          if (this.time_array.length > 0) {
            this.set_time(this.time_array[0])
          }
        }
      });
    } else {


      if (this.store.store_time[n].is_store_open && this.store.store_time[n].is_store_open_full_time) {
        let x = date1.setHours(0, 0, 0, 0)
        let x1 = new Date(x);
        let x2 = x1.getTime();

        time_date_close.setHours(0, 0, 0, 0);
        time_date_close = new Date(time_date_close.setMinutes(time_date_close.getMinutes() + 30));
        time_date.setHours(0, 0, 0, 0);
        time_date = new Date(time_date);

        let y = date1.setHours(23, 59, 0, 0)
        let y1 = new Date(y);

        for (; time_date < y1;) {
          var hours = time_date.getHours();
          var am_pm = "AM";
          if (hours > 12) {
            hours -= 12;
            am_pm = "PM";
          } else if (hours === 0) {
            hours = 12;
          }
          var hours_close = time_date_close.getHours();
          var am_pm_close = "AM";
          if (hours_close > 12) {
            hours_close -= 12;
            am_pm_close = "PM";
          } else if (hours_close === 0) {
            hours_close = 12;
          }

          if (date_with_Delivery_time < time_date) {
            if (time_date.getHours() < 6) {
              var type = 1;
              this.slot1 = true;
            } else if (time_date.getHours() < 12) {
              var type = 2;
              this.slot2 = true;
            } else if (time_date.getHours() < 18) {
              var type = 3;
              this.slot3 = true;
            } else {
              var type = 4;
              this.slot4 = true;
            }
            this.time_array[i] = { type: type, date: date, time_format: this._helper.pad2(time_date.getHours()) + ':' + this._helper.pad2(time_date.getMinutes()) + '-' + this._helper.pad2(time_date_close.getHours()) + ':' + this._helper.pad2(time_date_close.getMinutes()), time: this._helper.pad2(hours) + ':' + this._helper.pad2(time_date.getMinutes()) + " " + am_pm + ' - ' + this._helper.pad2(hours_close) + ':' + this._helper.pad2(time_date_close.getMinutes()) + " " + am_pm_close }
            i++;
          }
          time_date.setMinutes(time_date.getMinutes() + 30);
          time_date_close.setMinutes(time_date_close.getMinutes() + 30);
        }
      } else if (this.store.table_booking_time[n].is_store_open && !this.store.table_booking_time[n].is_booking_open_full_time) {
        this.store.table_booking_time[n].day_time.forEach((table_booking_time, index) => {


          let x = date1.setHours(Math.floor(table_booking_time.booking_open_time / 60), table_booking_time.booking_open_time % 60, 0, 0)
          let x1 = new Date(x);
          let x2 = x1.getTime();

          time_date_close.setHours(Math.floor(table_booking_time.booking_open_time / 60), table_booking_time.booking_open_time % 60, 0, 0);
          time_date_close = new Date(time_date_close.setMinutes(time_date_close.getMinutes() + 30));
          time_date.setHours(Math.floor(table_booking_time.booking_open_time / 60), table_booking_time.booking_open_time % 60, 0, 0);
          time_date = new Date(time_date);

          let y = date1.setHours(Math.floor(table_booking_time.booking_close_time / 60), table_booking_time.booking_close_time % 60, 0, 0)
          let y1 = new Date(y);

          for (; time_date < y1;) {
            var hours = time_date.getHours();
            var am_pm = "AM";
            if (hours > 12) {
              hours -= 12;
              am_pm = "PM";
            } else if (hours === 0) {
              hours = 12;
            }
            var hours_close = time_date_close.getHours();
            var am_pm_close = "AM";
            if (hours_close > 12) {
              hours_close -= 12;
              am_pm_close = "PM";
            } else if (hours_close === 0) {
              hours_close = 12;
            }

            if (date_with_Delivery_time < time_date) {
              if (time_date.getHours() < 6) {
                var type = 1;
                this.slot1 = true;
              } else if (time_date.getHours() < 12) {
                var type = 2;
                this.slot2 = true;
              } else if (time_date.getHours() < 18) {
                var type = 3;
                this.slot3 = true;
              } else {
                var type = 4;
                this.slot4 = true;
              }
              this.time_array[i] = { type: type, date: date, time_format: this._helper.pad2(time_date.getHours()) + ':' + this._helper.pad2(time_date.getMinutes()) + '-' + this._helper.pad2(time_date_close.getHours()) + ':' + this._helper.pad2(time_date_close.getMinutes()), time: this._helper.pad2(hours) + ':' + this._helper.pad2(time_date.getMinutes()) + " " + am_pm + ' - ' + this._helper.pad2(hours_close) + ':' + this._helper.pad2(time_date_close.getMinutes()) + " " + am_pm_close }
              i++;
            }
            time_date.setMinutes(time_date.getMinutes() + 30);
            time_date_close.setMinutes(time_date_close.getMinutes() + 30);
          }
        });
      } else {
        this.slot1 = undefined
        this.slot2 = undefined
        this.slot3 = undefined
        this.slot4 = undefined
        this.schedule_date = '';
        this.time_array = [];
      }
    };
  }


  get_store_details() {
    return new Promise((resolve, rejects) => {
      this._menuService.get_store_data({ store_id: this.store_id }).then(res_data => {
        if (res_data.success) {
          this.store_detail = res_data.store_detail
          this.store_total_rate = Number(this.store_detail.user_rate.toFixed(0))
          this.temp_theme_number = this.store_detail.delivery_details.theme_number || 1
          this.theme_number = this.store_detail.delivery_details.theme_number || 1
          window.innerWidth < 768 ? this.theme_number = 1 : this.store_detail.delivery_details.theme_number || 1
          this._helper.is_tax_inclusive = res_data.store_detail.is_tax_included
          this._helper.is_use_item_tax = res_data.store_detail.is_use_item_tax
          this._helper.city_id = this.store_detail.city_id
          this._helper.timezone = this.store_detail.city_details.timezone
          this.timezone = this.store_detail.city_details.timezone
          this._helper.open_check(this.store_detail.store_time)
          this.store_detail.store_time.forEach((data) => {
            data.day_time.forEach((day_time_data) => {
              if (Math.floor(day_time_data.store_close_time / 60) > 12) {
                var hour = Math.floor(day_time_data.store_close_time / 60) - 12;

                day_time_data.store_close_time = this._helper.pad2(hour) + ":" + this._helper.pad2(day_time_data.store_close_time % 60) + " PM";
              } else {
                var hour = Math.floor(day_time_data.store_close_time / 60);
                day_time_data.store_close_time = this._helper.pad2(hour) + ":" + this._helper.pad2(day_time_data.store_close_time % 60) + " AM";
              }

              if (Math.floor(day_time_data.store_open_time / 60) > 12) {
                var hour = Math.floor(day_time_data.store_open_time / 60) - 12;
                day_time_data.store_open_time = this._helper.pad2(hour) + ":" + this._helper.pad2(day_time_data.store_open_time % 60) + " PM";
              } else {
                var hour = Math.floor(day_time_data.store_open_time / 60);
                day_time_data.store_open_time = this._helper.pad2(hour) + ":" + this._helper.pad2(day_time_data.store_open_time % 60) + " AM";
              }
            })
          })
          if (this.store_detail.store_time[new Date().getDay()].is_store_open) {
            this.is_store_open = true
          } else {
            this.is_store_open = false

          }
        }
        resolve(true);
      })
    })
  }

  onSlide(e) {
    this.dateIndex = parseInt(e.current.replace("slideId_", ""), 10);
     console.log("---------------slide--------------------");
    console.log(this.date_array[this.dateIndex]);
    this.set_date(this.date_array[this.dateIndex]);
  }

  async get_product_group_list(store_id) {
    this._menuService.get_product_group_list(store_id).then(res_data => {
      if (res_data.length) {
        this.product_groups = res_data;
      } else {
        this.product_groups.push({
          name: 'Main',
          _id: null,
          image_url: "",
          product_ids: [],
          sequence_number: 0,
          store_id: this.store_id
        })
        this.product_index = 0;
      }
      this.user_get_store_product_item_list()

    })
  }

  user_get_store_product_item_list() {
    var product_ids = null

    this._menuService.user_get_store_product_item_list({ product_ids, server_token: "", user_id: "", store_id: this.store_id }).then(res_data => {
      if (res_data.success) {

        if (!res_data.store.is_business ||
          !res_data.store.is_city_business ||
          !res_data.store.is_country_business ||
          !res_data.store.is_delivery_business)
          this._helper.openModel('business-off-popup')

        this.store = res_data.store
        this._cartService.currency = res_data.currency
        this.products = res_data.products || []
        if (this.product_groups.length) {
          this.product_groups.forEach((product_group, index) => {
            if (!product_group['products']) {
              product_group['products'] = [];
            }
            res_data.products.forEach((product, product_index) => {
              let index = product_group.product_ids.indexOf(product._id._id);
              if (index !== -1) {
                product_group['products'].push(product);
              } else if (this.product_groups[0]._id === null) {
                this.product_groups[0]['products'].push(product);
              }
            })
          })
          this.product_item_detail(this.product_groups[0], this.store_detail.theme_number);
        }
        this.products.forEach(product => {
          product.items.forEach(item => {
            // console.log(item)
            item.image = item.image_url[0]
            item.total_item_price = 0
            item.specifications.forEach(spec => {
              // console.log(spec.user_can_add_specification_quantity)
              spec.user_can_add_specification_quantity ? spec.user_can_add_specification_quantity = true : spec.user_can_add_specification_quantity = false
              spec.list.forEach(list => {
                if (list.is_default_selected) {
                  item.total_item_price = item.total_item_price + list.price
                }
              });
            });
            item.total_item_price = item.total_item_price + item.price
          });
        });
        this.product_length = this.products.length

      }
    }).finally(() => {
      this._helper._loader.isLoading = false
    })
  }

  calculate_is_required() {
    this.required_count = 0
    this.selected_item.specifications.forEach((specification_group) => {
      if(!specification_group.isAssociated){
        if (specification_group.is_required) {
          this.required_count++;
        }
      }
    })
  }

  onProductSelected(index) {
    this.selected_product = index
  }

  product_item_detail(product_group, theme_number) {

    console.log("---------------profuct group-----------");
    console.log(product_group._id);
    console.log(this.selected_product_group_id);
    if (this.selected_product_group_id == product_group._id) {

      if(theme_number==THEME_NO.THEME_ONE){
        this.selected_product_group_id = null
      }
      this.is_show = !this.is_show;
    } else {
      this.is_show = true;
      this.selected_product_group_id = product_group._id;
      product_group.products.forEach((product) => {
        product.items.forEach((item) => {
          item.temp_price = item.price;
          item.specifications.forEach((specification) => {
            if (!specification.isAssociated) {
              specification.list.forEach((list) => {
                if (list.is_default_selected) {
                  item.temp_price = item.temp_price + list.price;
                  item.specifications.forEach(associated_specifications => {
                    if (associated_specifications.modifierGroupId == specification._id &&
                      associated_specifications.modifierId == list._id) {
                      associated_specifications.list.forEach(associated_specification => {
                        if (associated_specification.is_default_selected) {
                          item.temp_price = item.temp_price + associated_specification.price;
                        }
                      })
                    }
                  });
                }
              });
            }
          });
        })
      })
      this.filtered_product_item_list = product_group.products;
      if (product_group.products.length > 0) {
        this.product_detail(product_group.products[0]._id._id, null);
      } else {
        this.filtered_item_list = [];
      }
      this._initCartItemQty()
    }
  }

  product_detail(products_id, e) {
    this.selected_product_id = products_id;
  }

  onAddProduct(item){
    this._helper.openModel('product-popup')
    this.product_name = this.products[this.selected_product]._id.name;
    this.product_unique_id = this.products[this.selected_product]._id.unique_id;
    this.current_main_item = item;
    this.selected_item = JSON.parse(JSON.stringify(item))
    this.selected_item.specifications.sort(function (a, b) {
      return a.sequence_number - b.sequence_number;
    });
    this.selected_item.specifications.forEach(element => {
      element.list.sort(function (a, b) {
        return a.sequence_number - b.sequence_number;
      });
    });
    this.imagesUrl = []
    this.selected_item.image_url.forEach(element => {
      this.imagesUrl.push({
        path: this.IMAGE_URL + element
      })
    });

    this.selected_item.specifications.forEach(specification => {
      var index = specification.list.findIndex(x => x.is_default_selected == true)
      if (index !== -1) {
        this.selected_item.specifications.forEach(associated_specification => {
          if (associated_specification.modifierGroupId == specification._id &&
            associated_specification.modifierId == specification.list[index]._id) {
              associated_specification.isAssociated = false;
              let common_modifier = this.selected_item.specifications.findIndex(i => (i._id == associated_specification._id && !i.modifierGroupId && !i.modifierId));
              if (common_modifier != -1) {
                this.selected_item.specifications[common_modifier].isAssociated = true;
              }
            }
          });
        }
        specification.list.forEach(spec => {
          spec.is_default_selected ? spec.quantity = 1 : spec.quantity = 0
        })
      });

    this.calculateTotalAmount(false);
    this.calculate_is_required()

    if ($('.carousel-container').length == 0) {
      $(document).on('click', '.carousel-container', () => {
        this.onLightBox()
      });
    }
  }

  onModelOpen(item) {
    // console.log(item)
    this.selected_item = JSON.parse(JSON.stringify(item))
    if(this._cartService.user_cart.cart_data.cart.length > 0 && item.specifications.length > 0){
      var index = this._cartService.user_cart.cart_data.cart[0].items.findIndex(_x => _x.item_id === item._id)
      index !== -1 ? this.openRepeatModal(item) : this.onAddProduct(item)
    } else {
      this.onAddProduct(item)
    }

  }


  openRepeatModal(item){
    this._helper.openModel('item-repeat-modal')
    this.handleOnModifiedItemIncreaseQty(item, false)
  }

  openReviewModal() {
    this._helper.openModel('review-content');
  }

  onProduct(index) {
    this.selected_product = 0;
    if (!this.product_groups[index]['is_show']) {
      this._helper._loader.isLoading = true;
      this.product_index = index
      // this.user_get_store_product_item_list()
    } else {
      this.product_groups[index]['is_show'] = false;
    }
  }

  changeradio(event, specification_group_index, specification_index) {
    var index = this.selected_item.specifications[specification_group_index].list.findIndex(x => x.is_default_selected == true)
    if (index !== -1) {
      this.selected_item.specifications[specification_group_index].list[index].is_default_selected = false;
      this.selected_item.specifications[specification_group_index].list[index].quantity = 0;

      this.selected_item.specifications.forEach(specification => {
        if (specification.modifierGroupId == this.selected_item.specifications[specification_group_index]._id &&
          specification.modifierId == this.selected_item.specifications[specification_group_index].list[index]._id) {
          let common_modifier = this.selected_item.specifications.findIndex(i => (i._id == specification._id && !i.modifierGroupId && !i.modifierId));
          if (common_modifier != -1) {
            this.selected_item.specifications[common_modifier].isAssociated = false;
          }
          specification.isAssociated = true;
          specification.list.forEach(specification_item => {
            specification_item.is_default_selected = false;
            specification_item.quantity = 0;
          });
        }
      });
    }
    this.selected_item.specifications[specification_group_index].list[specification_index].is_default_selected = true;
    this.selected_item.specifications[specification_group_index].list[specification_index].quantity = 1;

    this.selected_item.specifications.forEach(specification => {
      if (specification.modifierGroupId == this.selected_item.specifications[specification_group_index]._id &&
        specification.modifierId == this.selected_item.specifications[specification_group_index].list[specification_index]._id) {
        specification.isAssociated = false;
        let common_modifier = this.selected_item.specifications.findIndex(i => (i._id == specification._id && !i.modifierGroupId && !i.modifierId));
        if (common_modifier != -1) {
          this.selected_item.specifications[common_modifier].isAssociated = true;
        }
      }
    });
    this.calculateTotalAmount(true);
    this.calculate_is_required();
  }

  changecheckbox(event, specification_group_index, specification_index) {
    this.selected_item.specifications[specification_group_index].list[specification_index].is_default_selected = event.target.checked;
    event.target.checked ? this.selected_item.specifications[specification_group_index].list[specification_index].quantity = 1 : this.selected_item.specifications[specification_group_index].list[specification_index].quantity = 0
    this.calculateTotalAmount(true);
  }

  incerase_qty() {
    this.qty++;
    this.calculateTotalAmount(true);
  }

  decrease_qty() {
    if (this.qty > 1) {
      this.qty--;
      this.calculateTotalAmount(true);
    }
  }

  calculateTotalAmount(boolean) {
    this.total = this.selected_item.price;
    this.required_temp_count = 0;
    this.selected_item.specifications.forEach((specification_group, specification_group_index) => {
      var default_selected_count = 0
      if (!specification_group.isAssociated) {
        specification_group.list.forEach((specification, specification_index) => {
          if (specification.is_default_selected) {
            // specification.quantity = 1
            this.total = this.total + (specification.price * specification.quantity);
            default_selected_count++;
          }
          specification_group.default_selected_count = default_selected_count;
        });
        if (specification_group.type == 1 && specification_group.is_required) {
          if (specification_group.range) {
            if (default_selected_count >= specification_group.range) {
              this.required_temp_count++;
            }
          } else {
            if (default_selected_count >= 1) {
              this.required_temp_count++;
            }
          }
        } else if (specification_group.type == 2 && specification_group.is_required) {
          if (specification_group.range) {
            if (default_selected_count >= specification_group.range) {
              this.required_temp_count++;
            }
          } else {
            if (default_selected_count >= 1) {
              this.required_temp_count++;
            }
          }
        }
      }
    });

    this.total = this.total * this.qty;
  }

  async clearCart() {
    await this._cartService.clear_cart()
    $('#close-clear-cart').click()
    this.handleClickOnAddToCart()
  }

  async handleClickOnAddToCart() {
    console.log("--------------------item -----------------------");
    console.log(this._cartService.user_cart.cart_data.cart);
    console.log(this._cartService.user_cart.cart_data.selectedStoreId);
    console.log(this.store_id);
    if (this._cartService.user_cart.cart_data.cart.length > 0 && this._cartService.user_cart.cart_data.selectedStoreId !== this.store_id) {
      this._helper.openModel('clear-cart-content')
      return;
    }

    if(this.selected_item.specifications.length == 0){
      if (this._cartService.user_cart.cart_data.cart[0]) {
        let item_exists = this._cartService.user_cart.cart_data.cart[0].items.findIndex(i => i.item_id == this.selected_item._id);
        if (item_exists != -1) {
          this.onItemIncreaseQty(this.selected_item, this.qty);
          return;
        }
      }
    }

    var location: LocationModel = this._locationService.current_location
    var user_details = {
      name: "",
      country_phone_code: "",
      phone: "",
      email: ""
    }
    var all_taxes = []

    if (this._authService.user) {
      user_details = {
        name: `${this._authService.user.first_name} ${this._authService.user.last_name}`,
        country_phone_code: `${this._authService.user.country_phone_code}`,
        phone: `${this._authService.user.phone}`,
        email: `${this._authService.user.email}`
      }
    }

    this._cartService.user_cart.cart_data.destination_addresses[0] = {
      address: location.address,
      address_type: 'destination',
      flat_no: '',
      street: '',
      landmark: '',
      city: location.city_name,
      delivery_status: 1,
      location: [location.latitude, location.longitude],
      note: "",
      user_details: user_details,
      user_type: this._authService.user ? this._authService.user.user_type : 1
    }


    let specificationPriceTotal = 0;
    let specificationPrice = 0;
    let specificationList = [];
    var y_name = "";

    this.selected_item.specifications.forEach((specification_group, specification_group_index) => {
      let specificationItemCartList = [];
      specification_group.list.forEach((specification, specification_index) => {
        y_name = specification.name;
        if (typeof specification.name == "object") {
          y_name = specification.name[0];
          if (!y_name) {
            y_name = specification.name[0];
          }
        }
        specification.name = y_name;
        if (specification.is_default_selected) {
          // console.log(specification.price * specification.quantity)
          specification.name = y_name
          specificationPrice = specificationPrice + specification.price;
          specificationPriceTotal = specificationPriceTotal + (specification.price * specification.quantity);  // specification quantity calculation added
          specificationItemCartList.push(specification)
        }
      });
      // console.log(specificationItemCartList)
      // console.log(specificationPriceTotal)
      y_name = specification_group.name;
      if (typeof specification_group.name == "object") {
        y_name = specification_group.name[0];
        if (!y_name) {
          y_name = specification_group.name[0];
        }
      }
      specification_group.name = y_name;
      if (specificationItemCartList.length > 0) {
        let specificationsItem_json = {
          list: specificationItemCartList,
          unique_id: specification_group.unique_id,
          name: y_name,
          price: specificationPrice,
          type: specification_group.type,
          range: specification_group.range,
          max_range: specification_group.max_range,
          is_required: specification_group.is_required,
          modifierId: specification_group.modifierId,
          modifierGroupId: specification_group.modifierGroupId,
          isAssociated: specification_group.isAssociated,
          isParentAssociate: specification_group.isParentAssociate
        }

        specificationList.push(specificationsItem_json);
      }
      specificationPrice = 0;

    });
    this.selected_item.tax_details.forEach(tax => {
      tax.tax_amount = 0
    });

    this.cartProductItems.item_id = this.selected_item._id;
    this.cartProductItems.unique_id = this.selected_item.unique_id;
    this.cartProductItems.item_name = this.selected_item.name;
    this.cartProductItems.tax_details = this.selected_item.tax_details;
    this.cartProductItems.quantity = this.qty;
    this.cartProductItems.image_url = this.selected_item.image_url;
    this.cartProductItems.details = this.selected_item.details;
    this.cartProductItems.specifications = specificationList;
    this.cartProductItems.item_price = this.selected_item.price;
    this.item_price = this.cartProductItems.item_price;
    this.total_item_price = this.item_price + specificationPriceTotal;
    this.cartProductItems.total_specification_price = specificationPriceTotal;
    this.cartProductItems.total_item_price = this.total;
    this._cartService.user_cart.is_tax_inclusive = this.store_detail.is_tax_included
    this._cartService.user_cart.is_use_item_tax = this.store_detail.is_use_item_tax

    // if (this.store.is_use_item_tax == true) {
    //     this.cartProductItems.tax = this.selected_item.tax;
    // } else {
    //     this.cartProductItems.tax = this.store.item_tax;
    // }

    if (this.store.is_use_item_tax == true) {
      this.selected_item.tax_details.forEach(tax => {
        this.cartProductItems.tax = this.cartProductItems.tax + tax.tax
        all_taxes.push(tax)
      });
      if (this.store_detail.is_tax_included) {
        this.cartProductItems.item_price = (100 * this.cartProductItems.item_price) / (100 + this.cartProductItems.tax)
      }

    } else {
      this.store_detail.store_taxes.forEach(tax => {
        all_taxes.push(tax)
        this.cartProductItems.tax = this.cartProductItems.tax + tax.tax
      });
      if (this.store_detail.is_tax_included) {
        this.cartProductItems.item_price = (100 * this.cartProductItems.item_price) / (100 + this.cartProductItems.tax)
      }
      // this.cartProductItems.tax = this.store.item_tax;
    }

    if (this.store_detail.is_tax_included) {
      this.cartProductItems.total_specification_tax = specificationPriceTotal - (100 * specificationPriceTotal) / (100 + Number(this.cartProductItems.tax));
    } else {
      this.cartProductItems.total_specification_tax = specificationPriceTotal * Number(this.cartProductItems.tax) * 0.01;
    }


    this.cartProductItems.item_tax = (Number(this.cartProductItems.tax) * Number(this.cartProductItems.item_price) * 0.01);
    this.cartProductItems.total_tax = (Number(this.cartProductItems.item_tax) + Number(this.cartProductItems.total_specification_tax));
    this.cartProductItems.total_item_tax = (Number(this.cartProductItems.total_tax) * Number(this.cartProductItems.quantity));
    this.cartProductItems.note_for_item = this.note_for_item;

    all_taxes.forEach(tax => {

      var total_price = Number(this.selected_item.price) + specificationPriceTotal
      total_price = total_price * this.cartProductItems.quantity

      if (this.store_detail.is_tax_included) {
        tax.tax_amount = (total_price - ((100 * total_price) / (100 + tax.tax)))

      } else {
        tax.tax_amount = Number(Number(tax.tax) * Number(total_price) * 0.01).toFixed(2)
      }
    })

    // if (this.store_detail.is_tax_included) {
    //   this.cartProductItems.total_item_price = this.cartProductItems.total_item_price
    // }
    // this.cartProductItems.total_specification_price = this.cartProductItems.total_specification_price

    this._cartService.user_cart.cart_main_item.push(this.current_main_item);
    this._cartService.user_cart.total_cart_amount = this._cartService.user_cart.total_cart_amount + this.cartProductItems.total_item_price;
    this._cartService.user_cart.total_item_tax = Number(this._cartService.user_cart.total_item_tax) + Number(this.cartProductItems.total_item_tax);


    if (this.isProductExistInLocalCart(this.cartProductItems)) {
      let itemIndex = this._cartService.user_cart.cart_data.cart[0].items.findIndex(_x => _x.item_id === this.cartProductItems.item_id)
      this._cartService.user_cart.cart_data.cart[0].items[itemIndex].quantity = this._cartService.user_cart.cart_data.cart[0].items[itemIndex].quantity + this.cartProductItems.quantity;
      this.addItemInServerCart()
    } else {
      let cartProductItemsList = [];
      cartProductItemsList.push(this.cartProductItems)
      this.cartProducts.items = cartProductItemsList;
      this.cartProducts.product_id = this.selected_item.product_id;
      this.cartProducts.product_name = this.product_name
      this.cartProducts.unique_id = this.product_unique_id
      this.cartProducts.total_item_price = 0;
      this.cartProducts.total_item_tax = 0;
      this.cartProducts.items.forEach((item) => {
        this.cartProducts.total_item_price += item.total_item_price;
        this.cartProducts.total_item_tax += item.total_item_tax;
      });
      this._cartService.user_cart.cart_data.cart.push(this.cartProducts);
      localStorage.setItem('cartStoreId', this.store_id);
      this._cartService.user_cart.cart_data.selectedStoreId = this.store_id;
      this._cartService.user_cart.cart_data.max_item_quantity_add_by_user = this.store.max_item_quantity_add_by_user;
      this._cartService.user_cart.cart_data.pickup_addresses[0].location = this.store.location;
      this._cartService.user_cart.cart_data.pickup_addresses[0].address = this.store.address;
      this._cartService.user_cart.cart_data.pickup_addresses[0].user_type = this.store.user_type;
      this._cartService.user_cart.cart_data.pickup_addresses[0].user_details = {
        "name": this.store.name,
        "country_phone_code": this.store.country_phone_code,
        "phone": this.store.phone,
        "email": this.store.email
      }
      this._cartService.user_cart.cart_data.total_item++;
      this._cartService.user_cart.total_taxes = all_taxes
      this.cartProductItems.item_price = this.item_price
      // this.cartProductItems.total_item_price = this.total_item_price
      this.addItemInServerCart();

    }
  }

  gotoDirection() {
    window.open(`https://www.google.com/maps/dir/${this._locationService.current_location.address}/${this.store.address}/`);
  }

  isProductExistInLocalCart(cartProductItems) {
    let bool = false;
    this._cartService.user_cart.cart_data.cart.forEach((cart_item) => {
      // if (cart_item.product_id == this.products[this.selected_product].product_id && bool == false) {
      //   cart_item.items.push(cartProductItems);
      //   cart_item.total_item_price = cart_item.total_item_price + this.total;
      //   this.addItemInServerCart();
      //   this._cartService.user_cart.cart_data.total_item++;
      //   bool = true;
      // }
      let itemIndex = this._cartService.user_cart.cart_data.cart[0].items.findIndex(_x => _x.item_id === this.cartProductItems.item_id)
      if (itemIndex !== -1) {
        if (this._cartService.user_cart.cart_data.cart[0].items[itemIndex].specifications.length === this.cartProductItems.specifications.length){
          if(this.cartProductItems.specifications.length > 0){
            this.cartProductItems.specifications.forEach(specification => {
              let specificationGroupIndex = this._cartService.user_cart.cart_data.cart[0].items[itemIndex].specifications.findIndex(_x => _x.unique_id === specification.unique_id)
              if(specificationGroupIndex !== -1){
                if(this._cartService.user_cart.cart_data.cart[0].items[itemIndex].specifications[specificationGroupIndex].list.length === specification.list.length){
                  specification.list.forEach(spec => {
                    let specificationIndex = this._cartService.user_cart.cart_data.cart[0].items[itemIndex].specifications[specificationGroupIndex].list.findIndex(_x => _x._id === spec._id)
                    if(specificationIndex !== -1){
                      if(this._cartService.user_cart.cart_data.cart[0].items[itemIndex].specifications[specificationGroupIndex].list[specificationIndex].quantity === spec.quantity){
                        bool = true
                      } else {
                        return bool = false;
                      }
                    } else {
                      return bool = false;
                    }
                  })
                } else {
                  return bool = false;
                }
              } else {
                return bool = false;
              }
            })
          } else {
            console.log('already added')
          }
        } else {
          return bool = false;
        }
      } else {
        return bool = false;
      }
    });
    return bool;
  }

  onLightBox() {
    var total_images = this.imagesUrl.length
    this.lightbox_images = [];
    for (let i = 0; i < total_images; i++) {
      const src = this.imagesUrl[i].path;
      const album = {
        src: src
      };
      this.lightbox_images.push(album)

    }
    // $('#close_item_model').click();

    this.lightBox.open(this.lightbox_images, 0, { centerVertically: true, positionFromTop: 0, disableScrolling: true, wrapAround: true })
  }

  addItemInServerCart() {
    this.cartProducts = new cartProductsModel();
    this.cartProductItems = new ItemModel();
    this._cartService.add_to_cart();
    this.note_for_item = '';
    this.qty = 1;
    $('#close_item_model').click();
  }


  // Table Booking Flow


  openTableBookModel() {
    setTimeout(() => {
      this.tableService.is_table_booked = false;
    }, 100);
    this._helper.openModel('table-book')
    this.lang_change_month_day()
  }

  closeTableBooking() {
    $('close-table-book').click();
  }

  closeTimeSlotPopup(){
    $('#table-book-slot').removeClass('model-open');
  }

  reservetableBook() {
    if (this.tableForm.invalid || !this.is_store_have_table) {
      this.tableForm.markAllAsTouched();
      return;
    }
    var time = this.tableForm.value.table_book_time.split(':');
  
    this.tableForm.value.table_book_date = new Date(this.tableForm.value.table_book_date);
    this.tableForm.value.table_book_date.setHours(time[0]);
    this.tableForm.value.table_book_date.setMinutes(time[1]);

    if (new Date().getTime() > new Date(this.tableForm.value.schedule_time).getTime()) {
      alert('Invalid Date Time');
    } else {
      if (this._cartService.user_cart.cart_data.cart.length > 0 && Number(this.tableForm.value.booking_type) === 1) {
        this.is_item_added_in_table_at_restaurant = true
      } else {
        this.is_item_added_in_table_at_restaurant = false
        this.checkSlotAvailable().then(isSlotAvailable => {
          if (isSlotAvailable) {
            this.tableService.is_table_booked = true;
            $("#table-book").removeClass('model-open')
            $("body").removeClass('model-open');
            var location: LocationModel = this._locationService.current_location

            var user_details = {
              name: "",
              country_phone_code: "",
              phone: "",
              email: ""
            }
            var all_taxes = []

            if (this._authService.user) {
              user_details = {
                name: `${this._authService.user.first_name} ${this._authService.user.last_name}`,
                country_phone_code: `${this._authService.user.country_phone_code}`,
                phone: `${this._authService.user.phone}`,
                email: `${this._authService.user.email}`
              }
            }



            this._cartService.user_cart.cart_data.destination_addresses[0] = {
              address: location.address,
              address_type: 'destination',
              city: location.city_name,
              flat_no: '',
              street: '',
              landmark: '',
              delivery_status: 1,
              location: [location.latitude, location.longitude],
              note: "",
              user_details: user_details,
              user_type: this._authService.user ? this._authService.user.user_type : 1
            }

            this._cartService.user_cart.is_tax_inclusive = false;
            this._cartService.user_cart.is_use_item_tax = this.store_detail.is_use_item_tax
            this._cartService.user_cart.table_no = this.tableForm.value.table_no
            this._cartService.user_cart.no_of_persons = this.tableForm.value.no_of_person
            this._cartService.user_cart.booking_type = Number(this.tableForm.value.booking_type)
            this._cartService.user_cart.is_schedule_order = true
            if(this._cartService.user_cart.cart_data.cart.length >0)
            {

              if(this._cartService.user_cart.cart_data.selectedStoreId == this.store_id)
            {
              this._cartService.user_cart.cart_data.selectedStoreId = this.store_id
            }
           }
           else
           {
            this._cartService.user_cart.cart_data.selectedStoreId = this.store_id;

           }
           
            this._cartService.add_to_cart(DELIVERY_TYPE.TABLE).then(result => {
              if(result){
                this._helper.is_table_booking = true
            
                if (this.tableForm.value.booking_type === '1') {
                  this._helper._route.navigate(['/checkout'])
                }
              } else {
                alert('Slot Not Available');
              }
            })
          } else {
            alert('Slot Not Available');
          }
        })
      }
    }
  }

  get_table_details() {
    this.tableService.fetch_table_details({
      store_id: this.store_detail._id,
      server_token: this.store_detail.server_token
    }).then(table_booking_details => {

      this.table_booking = table_booking_details;
      if (this.table_booking.is_table_reservation) {
        this.tableForm.patchValue({ booking_type: '1' })
      } else if (this.table_booking.is_table_reservation_with_order) {
        this.tableForm.patchValue({ booking_type: '2' })
      }

      this.table_max_date = new Date(new Date().setDate(new Date().getDate() + Number(this.table_booking.reservation_max_days)));
      // this.table_max_date = new Date(this.table_max_date).getFullYear() + '-' + (new Date(this.table_max_date).getMonth() + 1 > 9 ? new Date(this.table_max_date).getMonth() + 1 : ('0'+(new Date(this.table_max_date).getMonth() + 1))) + '-' + (new Date(this.table_max_date).getDate() > 9 ? new Date(this.table_max_date).getDate() : ('0'+new Date(this.table_max_date).getDate()));
      this.tableService.list_table({ store_id: this.store_detail._id, server_token: this.store_detail.server_token }).then(tables => {
        this.tables = tables;

        if (this.tables.length) {
          this.tableForm.patchValue({
            table_no: this.tables[0].table_no
          })
          this.selectTable(this.tables[0]);
        }
      })
    })

  }


  selectTable(table) {
    this._cartService.user_cart.table_id = table._id;
    // console.log(this.tableForm.value.table_no)
  }

  selectPerson(person) {
    this.total_tables = []
    this.tables.forEach(table => {
      if (person >= table.table_min_person && person <= table.table_max_person && table.is_bussiness && table.is_user_can_book) {
        this.total_tables.push(table)
      }
    })
    if (this.total_tables.length > 0) {
      this.tableForm.patchValue({ table_no: this.total_tables[0].table_no })
      this.is_store_have_table = true
    } else {
      // this.tableForm.patchValue({table_no: null})
      this.is_store_have_table = false
    }
  }


  checkSlotAvailable(): Promise<boolean> {
    return new Promise((resolve, rejects) => {
      var booking_time = this.tableForm.value.table_book_time;
      booking_time = booking_time.split(':')[0] * 60;
      var flag = false;
      var idx = new Date(this.tableForm.value.table_book_date).getDay();
      var booking_date = this.table_booking.booking_time[idx];
      if (booking_date.is_booking_open_full_time) {
        resolve(true);
      } else {
        booking_date.day_time.forEach(time => {
          if (booking_time >= time.booking_open_time && booking_time < time.booking_close_time) {
            flag = true;
          }
        });
        if (flag) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    })
  }
  disableDate() {
    return false;
  }

  number_of_people_count() {
    var people = []
    // for(var i = min; i <= max; i++){
    //   people.push(i)
    // }
    return false
  }

  isValid(event: boolean): void {
    this.valid = event;
  }
  // tslint:disable-next-line:typedef
  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  likeReview(review) {
    if (this._authService.logginUser) {
      let dislike_idx = review.id_of_users_dislike_store_comment.findIndex(i => i == this._authService.logginUser._id);
      if (dislike_idx != -1) {
        review.is_user_dislike_store_comment = false;
        review.id_of_users_dislike_store_comment.splice(dislike_idx, 1)
      }
      let like_idx = review.id_of_users_like_store_comment.findIndex(i => i == this._authService.logginUser._id);
      if (like_idx != -1) {
        review.is_user_like_store_comment = false;
        review.id_of_users_like_store_comment.splice(like_idx, 1);
      } else {
        review.is_user_like_store_comment = true;
        review.id_of_users_like_store_comment.push(this._authService.logginUser._id)
      }
      this.userLikeDislikeStoreReview(review._id, review.is_user_like_store_comment, review.is_user_dislike_store_comment);
    }
  }

  dislikeReview(review) {
    if (this._authService.logginUser) {
      let like_idx = review.id_of_users_like_store_comment.findIndex(i => i == this._authService.logginUser._id);
      if (like_idx != -1) {
        review.is_user_like_store_comment = false;
        review.id_of_users_like_store_comment.splice(like_idx, 1);
      }
      let dislike_idx = review.id_of_users_dislike_store_comment.findIndex(i => i == this._authService.logginUser._id);
      if (dislike_idx != -1) {
        review.is_user_dislike_store_comment = false;
        review.id_of_users_dislike_store_comment.splice(dislike_idx, 1)
      } else {
        review.is_user_dislike_store_comment = true;
        review.id_of_users_dislike_store_comment.push(this._authService.logginUser._id)
      }
      this.userLikeDislikeStoreReview(review._id, review.is_user_like_store_comment, review.is_user_dislike_store_comment);
    }
  }

  getSeoTags() {
    this._commonService.getSeoTags(2).then((result) => {
      if (result.success) {
        let meta_data = result.data[0]
        let follow = meta_data.metaRobotsFollow ? 'follow' : 'nofollow'
        let index = meta_data.metaRobotsIndex ? 'index' : 'noindex'
        this._meta.updateTag({ name: 'description', value: meta_data.seoDescription })
        // this._meta.updateTag({ property: 'og:type', content: meta_data.ogType })
        this._meta.updateTag({ property: 'og:description', content: meta_data.ogDescription[0] })
        this._meta.updateTag({ property: 'og:image', content: meta_data.ogImage })
        this._meta.updateTag({ property: 'og:title', content: meta_data.ogTitle[0] })
        this._meta.updateTag({ name: 'twitter:card', content: meta_data.twitterCard })
        this._meta.updateTag({ name: 'twitter:title', content: meta_data.twitterTitle[0] })
        this._meta.updateTag({ name: 'twitter:description', content: meta_data.twitterDescription[0] })
        this._meta.updateTag({ name: 'twitter:site', content: meta_data.twitterUrl })
        this._meta.updateTag({ name: 'twitter:image', content: meta_data.twitterImage })
        this._meta.updateTag({ name: 'description', content: meta_data.seoDescription })
        this._meta.updateTag({ name: 'robots', content: `${follow}, ${index}` })

        // https://apiedeliverynew.appemporio.net/web_images/logo.png

        let link: HTMLLinkElement = this.dom.createElement('link');
        link.setAttribute('rel', 'canonical');
        this.dom.head.appendChild(link);
        link.setAttribute('href', this.dom.URL);
        this.loadTitleTag(meta_data)
        this.loadTitle(meta_data)
      }
    })
  }

  loadTitleTag(meta_data) {
    // console.log(this.store_detail)
    let delivery = this.store_detail.delivery_details.delivery_name[Number(localStorage.getItem('selected_lang_index'))] || this.store_detail.delivery_details.delivery_name[0]
    let titleStoreNameReplace = meta_data.seoTitleTag.replace('[StoreName]', this.store_detail.name)
    let deliveryNameReplace = titleStoreNameReplace.replace('[DeliveryName]', delivery)
    let titleName = deliveryNameReplace.replace('[CityName]', this.store_detail.city_details.city_name)
    let title = meta_data.seoTitleTag ? titleName : PRODUCT_SEO_TAGS.NAME
    this._meta.updateTag({ name: 'title', content: title })
    this._titleService.setTitle(title)
    document.title = title
  }

  loadTitle(meta_data){

    let menu = document.querySelector('#menuTitle')
    if(meta_data.menuTitle[this.currentLanguageIndex]){
      menu.outerHTML = `<${meta_data.menuTitleHtmlTag}>${meta_data.menuTitle[this.currentLanguageIndex]}</${meta_data.menuTitleHtmlTag}>`
    } else {
      menu.outerHTML = `<${meta_data.menuTitleHtmlTag}>${meta_data.menuTitle[0]}</${meta_data.menuTitleHtmlTag}>`
    }

    let address = document.querySelector('#addressTitle')
    if(meta_data.menuTitle[this.currentLanguageIndex]){
      address.outerHTML = `<${meta_data.addressTitleHtmlTag}>${meta_data.addressTitle[this.currentLanguageIndex]}</${meta_data.addressTitleHtmlTag}>`
    } else {
      address.outerHTML = `<${meta_data.addressTitleHtmlTag}>${meta_data.addressTitle[0]}</${meta_data.addressTitleHtmlTag}>`
    }

    let hours = document.querySelector('#hourTitle')
    if(meta_data.menuTitle[this.currentLanguageIndex]){
      hours.outerHTML = `<${meta_data.hoursTitleHtmlTag}>${meta_data.hoursTitle[this.currentLanguageIndex]}</${meta_data.hoursTitleHtmlTag}>`
    } else {
      hours.outerHTML = `<${meta_data.hoursTitleHtmlTag}>${meta_data.hoursTitle[0]}</${meta_data.hoursTitleHtmlTag}>`
    }
  }

  onItemAddButtonClick(item){
    console.log("--------add to cart----------------");
    console.log(item);
    this.qty = 1;
    this.product_name = this.products[this.selected_product]._id.name;
    this.product_unique_id = this.products[this.selected_product]._id.unique_id;
    this.current_main_item = item;
    this.selected_item = JSON.parse(JSON.stringify(item))
    this.selected_item.specifications.sort(function (a, b) {
      return a.sequence_number - b.sequence_number;
    });
    this.selected_item.specifications.forEach(element => {
      element.list.sort(function (a, b) {
        return a.sequence_number - b.sequence_number;
      });
    });
    this.imagesUrl = []
    this.selected_item.image_url.forEach(element => {
      this.imagesUrl.push({
        path: this.IMAGE_URL + element
      })
    });
    this.calculateTotalAmount(false);
    this.calculate_is_required()

    console.log(this._cartService.user_cart.cart_data.cart);

    if (this._cartService.user_cart.cart_data.cart[0]) {
      console.log("-----------------item added-----------");
      let item_exists = this._cartService.user_cart.cart_data.cart[0].items.findIndex(i => i.item_id == item._id);
      console.log(item_exists);
      if (item_exists == -1) {
        this.handleClickOnAddToCart()
      }
    } else {
      this.handleClickOnAddToCart()
    }
  }

  onItemIncreaseQty(item, update_qty = 1) {
    item.qty += update_qty;
    if (this.clickTimeout) {
      this.setClickTimeout(() => this.handleOnItemIncreaseQty(item));
    } else {
      this.setClickTimeout(() => this.handleOnItemIncreaseQty(item));
    }
  }

  setClickTimeout(callback) {
    clearTimeout(this.clickTimeout);
    this.clickTimeout = setTimeout(() => {
      this.clickTimeout = null;
      callback();
    }, 1000);
  }

  handleOnItemIncreaseQty(item) {
    const item_index = this._cartService.user_cart.cart_data.cart[0].items.findIndex(i => i.item_id == item._id);
    const update_qty = item.qty - this._cartService.user_cart.cart_data.cart[0].items[item_index].quantity;
    this._cartService.increase_qty(this._cartService.user_cart.cart_data.cart[0].product_id, item_index, update_qty);

    $('#close_item_model').click();
    this.qty = 1;
  }

  onItemDecreaseQty(item) {
    if (item.qty > 0) {
      item.qty--;
    } else {
      item.qty = 0;
    }

    if (this.clickTimeout) {
      this.setClickTimeout(() => this.handleOnItemDecreaseQty(item));
    } else {
      this.setClickTimeout(() => this.handleOnItemDecreaseQty(item));
    }
  }

  handleOnItemDecreaseQty(item) {
    const item_index = this._cartService.user_cart.cart_data.cart[0].items.findIndex(i => i.item_id == item._id);
    const update_qty = this._cartService.user_cart.cart_data.cart[0].items[item_index].quantity - item.qty;
    this._cartService.decrease_qty(this._cartService.user_cart.cart_data.cart[0].product_id, item_index, update_qty);
  }

  onIncreaseQty( specification_group_index, specification_index){
    this.selected_item.specifications[specification_group_index].list[specification_index].quantity ++
    this.calculateTotalAmount(true);
  }

  onDecreaseQty( specification_group_index, specification_index){
    if(this.selected_item.specifications[specification_group_index].list[specification_index].quantity === 1){
      this.selected_item.specifications[specification_group_index].list[specification_index].is_default_selected = false
    } else {
      this.selected_item.specifications[specification_group_index].list[specification_index].quantity --
    }
    this.calculateTotalAmount(true);
  }

  _initCartItemQty() {
    this.filtered_product_item_list.forEach(product => {
      product.items.forEach(item => {
        item.qty = 0;
        item.is_qty_mismatch = null;
      });
    });

    this.filtered_product_item_list.forEach(product => {
      product.items.forEach(item => {
        if (this._cartService.user_cart.cart_data.cart[0]) {
          this._cartService.user_cart.cart_data.cart[0].items.forEach(cart_item => {
            if (cart_item.item_id == item._id) {
              if (item.qty != 0) {
                item.is_qty_mismatch = true;
              }
              item.qty = item.qty + cart_item.quantity;
            }
          })
        }
      });
    });
  }

  getStoreRating() {
    this._menuService.get_review_data({ store_id: this.store_id }).then(res_data => {
      if (res_data.success) {
        this.store_rating_per = res_data.store_rating_per;
        this.store_rating = res_data.store_rating;
        this.store_review_list = res_data.store_review_list;
        if (this._authService.logginUser) {
          this.store_review_list.forEach((review) => {
            review.is_user_like_store_comment = false;
            review.is_user_dislike_store_comment = false;
            let like_idx = review.id_of_users_like_store_comment.findIndex(i => i == this._authService.logginUser._id);
            if (like_idx != -1) {
              review.is_user_like_store_comment = true;
            }
            let dislike_idx = review.id_of_users_dislike_store_comment.findIndex(i => i == this._authService.logginUser._id);
            if (dislike_idx != -1) {
              review.is_user_dislike_store_comment = true;
            }
          })
        }
      }
    })
  }

  userLikeDislikeStoreReview(review_id, is_user_clicked_like_store_review, is_user_clicked_dislike_store_review) {
    let json = {
      is_user_clicked_like_store_review,
      review_id,
      is_user_clicked_dislike_store_review,
      user_id: this._authService.logginUser._id,
      server_token: this._authService.logginUser.server_token
    }
    this._menuService.user_like_dislike_store_review(json).then(() => { })
  }

  ngOnDestroy(): void {
    this._commonService.is_location_show = false;
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  onRepeatLastItemDecreaseQty(item) {
    if (item.is_qty_mismatch) {
      this._helper.openModel('item-removal-modal')
    } else {
      this.onItemDecreaseQty(item);
    }
  }

  onCustomize() {
    this.onAddProduct(this.selected_item)
  }

  closeItemRemovalModal() {
    $('#close_item_removal_model').click();
  }

  onRepeat() {
    this.onRepeatLastItemIncreaseQty(this.selected_item, this.qty + 1)
  }

  onRepeatLastItemIncreaseQty(item, update_qty = 1) {
    item.qty += update_qty;
    if (this.clickTimeout) {
      this.setClickTimeout(() => this.handleOnModifiedItemIncreaseQty(item, true));
    } else {
      this.setClickTimeout(() => this.handleOnModifiedItemIncreaseQty(item, true));
    }
  }

  handleOnModifiedItemIncreaseQty(item, isUpdate = false) {
    const lastIndexOf = (array, item_id) => {
      for (let i = array.length - 1; i >= 0; i--) {
        if (array[i].item_id === item_id)
          return i;
      }
      return -1;
    };

    const item_index = lastIndexOf(this._cartService.user_cart.cart_data.cart[0].items, item._id);
    if(isUpdate){
      this._cartService.increase_qty(this._cartService.user_cart.cart_data.cart[0].product_id, item_index, 1);
      $('#close_item_model').click();
    } else {
      this.lastItemSpecifications =  this._cartService.user_cart.cart_data.cart[0].items[item_index].specifications;
      console.log(this.lastItemSpecifications)
    }

    this.qty = 1;
  }
}