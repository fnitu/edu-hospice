import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MultiRequiredValidator } from 'src/app/shared/components/formly/formly-validation-config';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { GLOBALS } from 'src/app/shared/core/globals';
import { AuthService } from 'src/app/shared/services/authentication/auth.service';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate/custom-translate.service';
import { TooltipService } from 'src/app/shared/services/tooltip/tooltip.service';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit, AfterViewInit {
  isAuth = this.authService.isAuthenticated();
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
      NURSE: new FormControl(false),
      CARE_ASSISTANT: new FormControl(false),
      CARETAKER: new FormControl(false),
      OTHER: new FormControl(false),
      other_profession: new FormControl(null),
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
      hideExpression: this.isAuth,
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
      hideExpression: this.isAuth,
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
        type: 'text',
        label: this.customTranslateService.getTranslation(
          'preview.register.phoneNumber'
        ),
        placeholder: this.customTranslateService.getTranslation(
          'preview.register.phoneNumberPlaceholder'
        ),
        minLength: 10,
        maxLength: 14,
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
            indeterminate: false,
          },
        },
        {
          key: 'phoneContact',
          type: 'checkbox',
          templateOptions: {
            label: this.customTranslateService.getTranslation(
              'preview.register.phone'
            ),
            indeterminate: false,
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
    private customTranslateService: CustomTranslateService,
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.isAuth) {
      this.authService.currentUser.then((user) => {
        console.log(user);
        this.personalDataForm
          .get('name')
          .setValue({ fName: user.firstName, lName: user.lastName });
      });
    }
  }
  ngAfterViewInit() {
    this.disableStepper();
  }

  validationChange() {
    this.disableStepper();
    this.enableStepper();
  }

  disableStepper() {
    let steps = document.querySelectorAll('.mat-step-header');
    let limit = this.checkForms();
    for (let i = 3; i > limit; i--) {
      if (steps.item(i)) {
        steps.item(i).classList.add('enabled');
      }
    }
  }

  enableStepper() {
    let steps = document.querySelectorAll('.mat-step-header');

    let limit = this.checkForms();
    for (let i = 0; i <= limit; i++) {
      if (steps.item(i)) {
        steps.item(i).classList.remove('enabled');
      }
    }
  }

  checkForms() {
    let personalDataFormCheck = this.personalDataForm.valid;
    let careerFormCheck = this.careerForm.valid && this.professionForm.valid;

    if (!personalDataFormCheck) return 0;
    if (careerFormCheck) return 2;
    return 1;
  }

  getProfessionChoise(f) {
    let exceptions = ['OTHER', 'other_profession'];
    let profession: string[] = [];

    for (let choise in f['controls']) {
      if (
        f['controls'][choise]['value'] &&
        !exceptions.some((item) => item === choise)
      ) {
        profession.push(choise);
      }
    }
    return profession;
  }

  getOtherProfessionChoise(f) {
    let checkValue = f['controls']['other_profession']['value'];
    return checkValue ? checkValue : '';
  }

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

  public onRegister() {
    let registerFormDetails = {
      firstName: this.personalDataForm.value['name']['fName'],
      lastName: this.personalDataForm.value['name']['lName'],
      email: this.personalDataForm.value['email'],
      password: this.personalDataForm.value['password'],
      confirmPassword: this.personalDataForm.value['confirmPassword'],
      phoneNumber: this.personalDataForm.value['phone'],
      professions: this.getProfessionChoise(this.professionForm),
      otherProfessions: this.getOtherProfessionChoise(this.professionForm),
      employerCity: this.careerForm.value['employerCity'],
      employerCounty: this.careerForm.value['employerCountry'],
      employerName: this.careerForm.value['employerName'],
      communicationViaPhone:
        this.contactForm.value.comunication['phoneContact'],
      communicationViaEmail:
        this.contactForm.value.comunication['emailContact'],
      gdpr: this.finalizationForm.value['gdpr'],
      termsAndConditions: this.finalizationForm.value['agreement'],
    };

    !this.isAuth &&
      this.registerService.registerUser(registerFormDetails).subscribe(
        (response) => {
          this.matSnackBar.openFromComponent(SnackBarComponent, {
            verticalPosition: 'top',
            data: {
              content: this.customTranslateService.getTranslation(
                response['message']
              ),
              type: GLOBALS.NOTIFICATIONS.INFO,
            },
          });
          setTimeout(() => {
            this.router.navigate(['login'], {
              relativeTo: this.route.parent,
            });
          }, 3000);
        },
        (err) => {
          console.log(err);
        }
      );
    this.isAuth &&
      this.registerService.editUserData(registerFormDetails).subscribe(
        (response) => {
          this.matSnackBar.openFromComponent(SnackBarComponent, {
            verticalPosition: 'top',
            data: {
              content: this.customTranslateService.getTranslation(
                response['message']
              ),
              type: GLOBALS.NOTIFICATIONS.INFO,
            },
          });
          setTimeout(() => {
            this.router.navigate(['dashboard'], {
              relativeTo: this.route.parent,
            });
          }, 3000);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
