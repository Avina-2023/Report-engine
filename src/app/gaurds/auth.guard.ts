import { state } from '@angular/animations';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppConfigService } from '../utils/app-config.service';
import { APP_CONSTANTS } from '../utils/app-constants.service';


export const loginGaurd: CanActivateFn = (route, state) => {
  const authService = inject(AppConfigService)
  const router = inject(Router)
console.log(route)
  if(!authService.isLoggedin()){
      router.navigate([APP_CONSTANTS.ENDPOINTS.ROOT])
      return false
  }else{
    if(authService.getUserRole()){}
    return true;
  }
};



export const roleGuard:CanActivateFn=(route,state)=>{
  const authService = inject(AppConfigService)
  const router = inject(Router)

if(authService.isLoggedin() && authService.getUserRole()== route.data?.['role']){
return true
}
else{
  if(!authService.isLoggedin()){
    router.navigate([APP_CONSTANTS.ENDPOINTS.ROOT])
      return false
  }else{
    router.navigate(['/error'])
  return false
  }
  
}
}


export const rootGaurd: CanActivateFn = (route, state) => {
  const authService = inject(AppConfigService)
  const router = inject(Router)
  if(authService.isLoggedin()){
    router.navigate([APP_CONSTANTS.ENDPOINTS.DASHBOARD])
    
    
  }
return true
}
