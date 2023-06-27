import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppConfigService } from '../utils/app-config.service';
import { APP_CONSTANTS } from '../utils/app-constants.service';


export const loginGaurd: CanActivateFn = (route, state) => {
  const authService = inject(AppConfigService)
  const router = inject(Router)

  if(!authService.isLoggedin()){
    
      router.navigate([APP_CONSTANTS.ENDPOINTS.ROOT])
      return false
    
  }else{
    
    return true;
  }
};
export const rootGaurd: CanActivateFn = (route, state) => {
  const authService = inject(AppConfigService)
  const router = inject(Router)
  if(authService.isLoggedin()){
    router.navigate([APP_CONSTANTS.ENDPOINTS.DASHBOARD])
    return false
  }
return true
}
