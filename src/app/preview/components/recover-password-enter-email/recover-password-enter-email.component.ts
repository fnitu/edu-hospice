import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CustomTranslateService } from '../../../shared/services/custom-translate/custom-translate.service';
import { TooltipService } from '../../../shared/services/tooltip/tooltip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecoverPasswordEnterEmailService } from './recover-password-enter-email.service';
import { GLOBALS } from '../../../shared/core/globals';
import { MatSnackBar } from '@angular/material/snack-bar';

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
                private matSnackBar: MatSnackBar,
                private recoverPasswordEnterEmailService: RecoverPasswordEnterEmailService) {
    }

    ngOnInit(): void {
    }

    public resetPassword() {
        const emailInput = this.form.get('email');
        const url = GLOBALS.dataURL.sendEmailForRecoverPassword;

        const data = {
            email: emailInput.value,
            subject: 'Reset your Edu Hospice password',
            body: 'Please follow this link to reset your password on our Edu Hospice platform:\nhttps://edu-hospice.herokuapp.com/preview/recover-or-change-password?token={token}'
        };

        this.recoverPasswordEnterEmailService.sendEmailForRecoverPassword(url, data).subscribe((result) => {
            if (result.success) {

                this.matSnackBar.open(result.message, GLOBALS.constants.NOTIFICATIONS.INFO, {
                    duration: GLOBALS.constants.NOTIFICATIONS.DURATION_IN_SECONDS * 1000,
                    verticalPosition: 'top'
                });

            }
        });
    }
}
