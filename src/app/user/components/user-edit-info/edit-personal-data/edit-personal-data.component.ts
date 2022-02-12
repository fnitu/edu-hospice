import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { RegisterService } from 'src/app/preview/components/register/register.service';
import { MultiRequiredValidator } from 'src/app/shared/components/formly/formly-validation-config';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { GLOBALS } from 'src/app/shared/core/globals';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate/custom-translate.service';
import { UserEditInfoService } from '../user-edit-info.service';

@Component({
  selector: 'app-edit-personal-data',
  templateUrl: './edit-personal-data.component.html',
  styleUrls: ['./edit-personal-data.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditPersonalData {
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
    agreement: new FormControl(
      { value: true, disabled: true },
      Validators.requiredTrue
    ),
    gdpr: new FormControl(
      { value: true, disabled: true },
      Validators.requiredTrue
    ),
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
        disabled: true,
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
        validation: [Validators.required, 'phoneNumber'],
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
    private customTranslateService: CustomTranslateService,
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private userEditInfoService: UserEditInfoService
  ) {}

  ngOnInit() {
    this.userEditInfoService.getUserDetails().subscribe((user) => {
      this.personalDataForm
        .get('name')
        .setValue({ fName: user['firstName'], lName: user['lastName'] });
      this.personalDataForm.get('email').setValue(user['email']);
      this.personalDataForm.get('phone').setValue(user['phoneNumber']);

      this.professionForm
        .get('NURSE')
        .setValue(user['professions'].includes('NURSE'));
      this.professionForm
        .get('CARE_ASSISTANT')
        .setValue(user['professions'].includes('CARE_ASSISTANT'));
      this.professionForm
        .get('CARETAKER')
        .setValue(user['professions'].includes('CARETAKER'));
      this.professionForm.get('OTHER').setValue(!!user['otherProfessions']);
      !!user['otherProfessions'] &&
        this.professionForm
          .get('other_profession')
          .setValue(user['otherProfessions']);

      this.careerForm.get('employerName').setValue(user['employerName']);
      this.careerForm.get('employerCity').setValue(user['employerCity']);
      this.careerForm.get('employerCountry').setValue(user['employerCounty']);
      this.contactForm.get('comunication').setValue({
        emailContact: user['communicationViaEmail'],
        phoneContact: user['communicationViaPhone'],
      });
      this.enableStepper();
    });
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

  public onEditUserInfo() {
    let editUserDetails = {
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

    this.registerService.editUserData(editUserDetails).subscribe(
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
