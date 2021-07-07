import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../services/account.service';


@Component({ 
  
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    loading = false;
    submitted = false;
    url: string | ArrayBuffer;
    returnUrl: string;

    public resolved(captchaResponse: string) {
      console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        
    ) { }

    ngOnInit(): void {


        this.registerForm = this.formBuilder.group({
            firstName: [null, Validators.required, Validators.maxLength(10)],
            lastName: [null, Validators.required, Validators.maxLength(10)],
            customername: [null, Validators.required, Validators.maxLength(10)],
            password: [null, Validators.required, Validators.minLength(6), Validators.maxLength(20)],
            email: [null, Validators.required,],
            telephon: [null, Validators.required],
            address: [null, Validators.required,],
            city: [null, Validators.required,],
            country: [null, Validators.required,],
            postal: [null, Validators.required,],
            image: [null, Validators.required,],

        });

               // get return url from route parameters or default to '/'
               this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }


    onSubmit() {

        this.submitted = true;



        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                   
                    this.router.navigate(['./login']);
                },
                error => {
                    this.loading = false;
                });


    }

    private imageSrc: string = '';

    handleInputChange(e) {
      var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
      
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
      file = file[0].getAsDataURL();
    }
    _handleReaderLoaded(e) {
      let reader = e.target;
      this.imageSrc = reader.result;
      this.url = reader.result;
      console.log(this.imageSrc)
    }
    
}