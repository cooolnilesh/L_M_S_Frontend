import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/User';
import { BookService } from '../service/book.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
  EncryptPassword: string = '';
  user: User;
  confirmPassword: string = '';
  missmatch: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {
    this.user = new User();
  }

  encrypt(password: String) {
    this.EncryptPassword = CryptoJS.AES.encrypt(
      this.user.password.trim(),
      'Encryption'
    ).toString();
    return this.EncryptPassword;
  }
  registrationStatus: string = '';
  onSubmit() {
    let cryptuser: User = this.user;
    cryptuser['userName'] = this.user.userid;
    delete cryptuser['userid'];
    if (this.user.password == this.confirmPassword) {
      this.missmatch = '';
      cryptuser.password = this.encrypt(this.user.password);
      this.bookService.registerUser(cryptuser).subscribe((data) => {
        this.registrationStatus = data;
        console.log('in user r ' + data);
        this.gotoLogInPage();
      });
    } else {
      this.missmatch = '*Password confirmation does not match.';
    }
  }
  confrm: string = 'fromRegistration';
  name: string = '';

  gotoLogInPage() {
    this.name = this.user.firstName + ' ' + this.user.lastName;
    this.router.navigate([
      `/userLogin/${this.confrm}/${this.name}/${this.registrationStatus}`,
    ]);
  }
  ngOnInit(): void {}
  confirmpass(confirm: string) {
    if (this.user.password == confirm) {
      this.missmatch = '';
    } else this.missmatch = '*Password confirmation does not match.';
  }
}
