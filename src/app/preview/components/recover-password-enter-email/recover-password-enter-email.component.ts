import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CustomTranslateService } from '../../../shared/services/custom-translate/custom-translate.service';
import { TooltipService } from '../../../shared/services/tooltip/tooltip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoverPasswordEnterEmailService } from './recover-password-enter-email.service';
import { GLOBALS } from '../../../shared/core/globals';

@Component({
  selector: 'app-recover-password-enter-email',
  templateUrl: './recover-password-enter-email.component.html',
  styleUrls: ['./recover-password-enter-email.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecoverPasswordEnterEmailComponent implements OnInit {

  public string;

  form = new FormGroup({});
  formModel = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: this.customTranslateService.getTranslation('general.email'),
        placeholder: this.customTranslateService.getTranslation('preview.login.loginPlaceholder'),
      },
      validators: {
        validation: [Validators.required, 'email']
      }
    }
  ];

  constructor(private customTranslateService: CustomTranslateService,
              private tooltipService: TooltipService,
              private router: Router,
              private route: ActivatedRoute,
              private recoverPasswordEnterEmailService: RecoverPasswordEnterEmailService) {
  }

  ngOnInit(): void {
  }

  public resetPassword() {
    const emailInput = this.form.get('email');
    // FIXME use server request to see if email adres exist
    const url = GLOBALS.dataURL.verifyEmail;

    this.recoverPasswordEnterEmailService.verifyPassword(url, {email: emailInput.value}).subscribe((result) => {
      if (result.payload.emailExist){
        const extras = {
          relativeTo: this.route.parent,
          state: {
            data: {
              email: emailInput.value
            }
          }
        };
        this.router.navigate(['recover-or-change-password'], extras );
      } else {
        emailInput.setErrors({ emailDoesNotExist: { message: this.customTranslateService.getTranslation('field.emailNotExist') } });
      }
    });
  }
}
