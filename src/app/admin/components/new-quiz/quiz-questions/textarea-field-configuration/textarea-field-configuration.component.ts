import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { GLOBALS } from "../../../../../shared/core/globals";

@Component({
  selector: 'app-textarea-field-configuration',
  templateUrl: './textarea-field-configuration.component.html',
  styleUrls: ['./textarea-field-configuration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextareaFieldConfigurationComponent implements OnInit {
  @Input() label: string;
  @Input() limit: number;

  public readonly TEXTAREA_MAX_ROWS = GLOBALS.TEXTAREA.MAX_ROWS;
  public readonly TEXTAREA_MIN_ROWS = GLOBALS.TEXTAREA.MIN_ROWS;

  constructor() { }

  ngOnInit(): void {
  }

}
