import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})

// type toastType = 'warn'|'success'|'error';

export class AlertServiceService {

constructor() {


}

toastfire(toasttype:SweetAlertIcon, message:any){
  console.log(toasttype)
  Swal.fire(
   {
     toast:true,
     position: 'top-right',
    //  color:'white',
     title: message,
     timerProgressBar: true,
    //  background: '#88ba2f',
     showConfirmButton:false,
     timer: 2000,
     icon: toasttype,
   }
 )
}

// alertDialog(toasttype:SweetAlertIcon,titleData){

// }
}
