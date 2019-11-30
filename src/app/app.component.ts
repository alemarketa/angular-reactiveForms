import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  singupForm: FormGroup;
  forbiddenUsernames = ["Username", "MarketaS"]

  ngOnInit() {
    this.singupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.checkForbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('female'),
      'hobbies': new FormArray([]),
    });
  }

  onSubmit() {
    console.log(this.singupForm)
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.singupForm.get('hobbies')).push(control);
  }

  checkForbiddenNames(control: FormControl): {[key: string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return{'nameIsForbidden': true};
    }
    return null; // don't pass false!
  }

  // for later angular version:
  // getControls(){
  //   return (<FormArray>this.singupForm.get('hobbies')).controls;
  // }

  // *ngFor="let hobbyControl of getControls(); let i = index"
}
