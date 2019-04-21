import { UserService } from './service/user.service';
import { Directive, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appLogout]'
})
export class LogoutDirective {

  constructor(private userService:UserService) { }

  @HostBinding('style.visibility') eleVisibility;

  ngOnInit() {
    if (this.userService.getUser === null) {
      this.eleVisibility = 'hidden'
    } else {
      this.eleVisibility = 'none'
    }

  }



}
