import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MultiRequiredValidator } from 'src/app/shared/components/formly/formly-validation-config';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate/custom-translate.service';
import { TooltipService } from 'src/app/shared/services/tooltip/tooltip.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  private passwordRules = {
    textPassMinLength: 6,
    textPassMaxLength: 10,
    textPassMinNum: 1,
    textPassMaxNum: 5,
    textPassMinSpecChars: 1,
    textPassMaxSpecChars: 5,
    textPassMinCaps: 1,
  };
  private numericRegex = /([0-9])/g;
  private specialCharactersRegex = /([^0-9A-Za-z])/g;
  private capitalLettersRegex = /([A-Z])/g;

  private tippyInstancePasswordSet;

  personalDataForm = new FormGroup({});
  careerForm = new FormGroup({});
  contactForm = new FormGroup({});

  professionForm = new FormGroup(
    {
      medicalAsistant: new FormControl(false),
      nurse: new FormControl(false),
      caretaker: new FormControl(false),
      other: new FormControl(false),
      profession: new FormControl(null),
    },
    MultiRequiredValidator
  );

  finalizationForm = new FormGroup({
    agreement: new FormControl(false, Validators.requiredTrue),
    gdpr: new FormControl(false, Validators.requiredTrue),
  });

  personalDataFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row-layout',
      key: 'name',
      type: '',
      fieldGroup: [
        {
          key: 'fName',
          type: 'input',
          templateOptions: {
            label: this.customTranslateService.getTranslation(
              'preview.register.firstName'
            ),
            placeholder: this.customTranslateService.getTranslation(
              'preview.register.firstNamePlaceholder'
            ),
          },
          validators: {
            validation: [Validators.required],
          },
        },
        {
          key: 'lName',
          type: 'input',
          templateOptions: {
            label: this.customTranslateService.getTranslation(
              'preview.register.lastName'
            ),
            placeholder: this.customTranslateService.getTranslation(
              'preview.register.lastNamePlaceholder'
            ),
          },
          validators: {
            validation: [Validators.required],
          },
        },
      ],
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: this.customTranslateService.getTranslation('general.email'),
        placeholder: this.customTranslateService.getTranslation(
          'preview.register.emailPlaceholder'
        ),
      },
      validators: {
        validation: [Validators.required, 'email'],
      },
    },
    {
      key: 'password',
      type: 'input',
      id: 'password',
      templateOptions: {
        type: 'password',
        label: this.customTranslateService.getTranslation(
          'preview.register.password'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'preview.register.passwordPlaceholder'
        ),
      },
      validators: {
        validation: [Validators.required],
        passwordMatchCriteria: {
          expression: (control) => this.validateInputPasswordSet(control),
        },
      },
    },
    {
      key: 'confirmPassword',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: this.customTranslateService.getTranslation(
          'preview.register.confirmPassword'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'preview.register.confirmPasswordPlaceholder'
        ),
      },
      validators: {
        validation: [Validators.required],
        passwordMatchCriteria: {
          expression: (control) => this.validateInputPasswordCheck(control),
          message: this.customTranslateService.getTranslation(
            'preview.managePassword.passwordsMatch'
          ),
        },
      },
    },
    {
      key: 'phone',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: this.customTranslateService.getTranslation(
          'preview.register.phoneNumber'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'preview.register.phoneNumberPlaceholder'
        ),
      },
      validators: {
        validation: [Validators.required],
      },
    },
  ];

  careerFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row-layout',
      key: 'employerName',
      type: 'input',
      templateOptions: {
        label: this.customTranslateService.getTranslation(
          'preview.register.employerName'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'preview.register.employerNamePlaceholder'
        ),
        appearence: 'outline',
      },
      validators: {
        validation: [Validators.required],
      },
    },
    {
      key: 'employerCity',
      type: 'input',
      templateOptions: {
        label: this.customTranslateService.getTranslation(
          'preview.register.employerCity'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'preview.register.employerCityPlaceholder'
        ),
        appearence: 'outline',
      },
      validators: {
        validation: [Validators.required],
      },
    },
    {
      key: 'employerCountry',
      type: 'input',
      templateOptions: {
        label: this.customTranslateService.getTranslation(
          'preview.register.employerCountry'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'preview.register.employerCountryPlaceholder'
        ),
        appearence: 'outline',
      },
      validators: {
        validation: [Validators.required],
      },
    },
  ];

  contactFields: FormlyFieldConfig[] = [
    {
      key: 'comunication',
      type: '',
      fieldGroup: [
        {
          key: 'emailContact',
          type: 'checkbox',
          templateOptions: {
            label: this.customTranslateService.getTranslation('general.email'),
          },
        },
        {
          key: 'phoneContact',
          type: 'checkbox',
          templateOptions: {
            label: this.customTranslateService.getTranslation(
              'preview.register.phone'
            ),
          },
        },
      ],
      validators: {
        validation: ['multiRequired'],
      },
    },
  ];

  constructor(
    private tooltipService: TooltipService,
    private customTranslateService: CustomTranslateService
  ) {}

  validateInputPasswordSet(control) {
    let valid = true;
    let message = '';
    const element = document.getElementById('password');

    if (control.value) {
      if (
        control.value.length < this.passwordRules.textPassMinLength ||
        control.value.length > this.passwordRules.textPassMaxLength
      ) {
        message += `<div>${this.customTranslateService.getTranslation(
          'preview.managePassword.length'
        )}</div>`;
        valid = false;
      }

      const matchNumberLength = control.value.match(this.numericRegex)
        ? control.value.match(this.numericRegex).length
        : null;
      if (
        this.passwordRules.textPassMinNum > matchNumberLength ||
        this.passwordRules.textPassMaxNum < matchNumberLength
      ) {
        message += `<div>${this.customTranslateService.getTranslation(
          'preview.managePassword.numberOfNumericCharacters'
        )}</div>`;
        valid = false;
      }

      const matchSpecialCharactersLength = control.value.match(
        this.specialCharactersRegex
      )
        ? control.value.match(this.specialCharactersRegex).length
        : null;
      if (
        this.passwordRules.textPassMinSpecChars >
          matchSpecialCharactersLength ||
        this.passwordRules.textPassMaxSpecChars < matchSpecialCharactersLength
      ) {
        message += `<div>${this.customTranslateService.getTranslation(
          'preview.managePassword.numberOfSpecialCharacters'
        )}</div>`;
        valid = false;
      }

      const matchCapitalLettersLength = control.value.match(
        this.capitalLettersRegex
      )
        ? control.value.match(this.capitalLettersRegex)
        : null;
      if (this.passwordRules.textPassMinCaps > matchCapitalLettersLength) {
        message += `<div>${this.customTranslateService.getTranslation(
          'preview.managePassword.numberOfCapitalLetters'
        )}</div>`;
        valid = false;
      }
    }

    if (!valid) {
      this.initTooltipTippyInstancePasswordSet(element, message);
      this.tippyInstancePasswordSet.show();
    } else if (valid && this.tippyInstancePasswordSet) {
      this.tippyInstancePasswordSet.hide();
    }

    return valid;
  }

  private validateInputPasswordCheck(control) {
    return control.value === this.personalDataForm.get(['password']).value;
  }

  private initTooltipTippyInstancePasswordSet(element, message) {
    if (this.tippyInstancePasswordSet) {
      this.tippyInstancePasswordSet.setContent(message);
    } else {
      this.tippyInstancePasswordSet = this.tooltipService.init(element, {
        content: `<div>${message}</div>`,
        trigger: 'manual',
      });
    }
  }
}
