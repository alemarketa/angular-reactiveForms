import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  singupForm: FormGroup;
  forbiddenUsernames = ['Username', 'MarketaS']

  ngOnInit() {
    this.singupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.checkForbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.checkForbiddenEmails)
      }),
      'gender': new FormControl('female'),
      'hobbies': new FormArray([]),
    });

    this.singupForm.statusChanges.subscribe((status) => console.log(status));
    this.singupForm.setValue({
      'userData': {
        'username': 'Max',
        'email': 'max@test.com'
      },
      'gender': 'male',
      'hobbies': []
    });
    this.singupForm.patchValue({
      'userData': {
        'username': 'Anna',
      }});
  }


  onSubmit() {
    console.log(this.singupForm);
    this.singupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.singupForm.get('hobbies')).push(control);
  }

  checkForbiddenNames(control: FormControl): {[key: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return{'nameIsForbidden': true};
    }
    return null; // don't pass false!
  }

  checkForbiddenEmails(control: FormControl): Observable<any> | Promise<any> {
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({emailIsForbidden: true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  // for later angular version:
  // getControls(){
  //   return (<FormArray>this.singupForm.get('hobbies')).controls;
  // }

  // *ngFor="let hobbyControl of getControls(); let i = index"
}
