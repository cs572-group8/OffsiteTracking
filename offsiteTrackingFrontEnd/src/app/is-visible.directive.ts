import { UserService } from './service/user.service';
import { Directive, OnChanges, HostBinding, OnInit } from '@angular/core';

@Directive({
  selector: '[appIsVisible]'
})
export class IsVisibleDirective implements OnInit {
  constructor(private userService: UserService) { }
  @HostBinding('style.visibility') eleVisibility;
  ngOnInit() {
    this.userService.emitter.subscribe(
      data => {
        if (this.userService.getUserPreviledge() === "admin") {
          this.eleVisibility = 'hidden'
        } else {
          this.eleVisibility = 'none';
        }
      }
    )
  }
}