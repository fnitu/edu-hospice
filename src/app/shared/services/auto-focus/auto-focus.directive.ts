import {AfterContentInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterContentInit {

  constructor(private el: ElementRef) { }

  ngAfterContentInit(): void {
    this.el.nativeElement.focus();
  }
}
