import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
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

  registerForm = new FormGroup({});
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'field-wrapper',
      key: 'personalData',
      wrappers: ['panel'],
      templateOptions: {
        label: this.customTranslateService.getTranslation(
          'preview.register.presonalData'
        ),
      },
      fieldGroup: [
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
      ],
    },

    {
      fieldGroupClassName: 'field-wrapper',
      key: 'career',
      wrappers: ['panel'],
      templateOptions: {
        label: this.customTranslateService.getTranslation(
          'preview.register.career'
        ),
      },

      fieldGroup: [
        {
          className: 'form-checkbox',
          key: 'profession',
          wrappers: ['panel'],
          templateOptions: {
            label: this.customTranslateService.getTranslation(
              'preview.register.profession'
            ),
          },
          fieldGroup: [
            {
              key: 'medicalAssistant',
              type: 'checkbox',
              templateOptions: {
                label: this.customTranslateService.getTranslation(
                  'preview.register.medicalAssistant'
                ),
              },
            },
            {
              key: 'nurse',
              type: 'checkbox',
              templateOptions: {
                label: this.customTranslateService.getTranslation(
                  'preview.register.nurse'
                ),
              },
            },
            {
              key: 'careTaker',
              type: 'checkbox',
              templateOptions: {
                label: this.customTranslateService.getTranslation(
                  'preview.register.caretaker'
                ),
              },
            },
            {
              key: 'other',
              type: 'checkbox',
              templateOptions: {
                label: this.customTranslateService.getTranslation(
                  'preview.register.other'
                ),
              },
            },
            // {
            //   key: 'otherInput',
            //   type: 'input',
            //   templateOptions: {
            //     placeholder: this.customTranslateService.getTranslation(
            //       'preview.register.other'
            //     )
            //   },
            // },
          ],
          validators: {
            validation: ['multiRequired'],
          },
        },

        {
          key: 'employer',
          wrappers: ['panel'],
          templateOptions: {
            label: this.customTranslateService.getTranslation(
              'preview.register.employer'
            ),
          },

          fieldGroup: [
            {
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
          ],
        },
      ],
    },

    {
      fieldGroupClassName: 'field-wrapper',
      key: 'contact',
      wrappers: ['panel'],
      templateOptions: {
        label: this.customTranslateService.getTranslation(
          'preview.register.contact'
        ),
      },
      fieldGroup: [
        {
          className: 'form-checkbox',
          key: 'comunication',
          type: '',
          fieldGroup: [
            {
              key: 'emailContact',
              type: 'checkbox',
              templateOptions: {
                label: this.customTranslateService.getTranslation(
                  'general.email'
                ),
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
      ],
    },

    {
      type: 'checkbox',
      key: 'agreement',
      templateOptions: {
        label: this.customTranslateService.getTranslation(
          'preview.register.agreement'
        ),
        required: true,
      },
      validators: {
        validation: [Validators.requiredTrue],
      },
    },
  ];

  constructor(
    private customTranslateService: CustomTranslateService,
    private tooltipService: TooltipService
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
    return (
      control.value ===
      this.registerForm.get(['personalData', 'password']).value
    );
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
  public onRegister(f) {
    console.log(f);
  }
}
