import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/User';
import { BookService } from '../service/book.service';
import { LocationStrategy } from '@angular/common';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  title = 'Library';
  status: boolean = false;
  error: boolean = false;
  users: User[] = [];
  name: string | undefined;

  public formData: any = {};
  decryptedPassword: string = '';
  msg: string = '';

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  registrationStatus: boolean = false;
  regname: string = '';
  ngOnInit(): void {
    this.bookService
      .getAllUser()
      .subscribe((alluser) => (this.users = alluser));

    this.route.params.subscribe((parameters) => {
      if (
        String(parameters['confirm']).localeCompare('fromRegistration') == 0
      ) {
        if (String(parameters['status']) == 'true') {
          this.regname = String(parameters['name']);
          this.msg = `Welcome! ${this.regname}  Thank you for Registration ! Please Login to Proceed !`;
          this.registrationStatus = true;
        } else if (String(parameters['status']) == 'false') {
          this.msg = `I'm Sorry! Userid already Exists. Please Try Again With Different User ID`;
          this.registrationStatus = true;
        }
      }
    });
  }

  decrypt(password: String) {
    this.decryptedPassword = CryptoJS.AES.decrypt(
      password.trim(),
      'Encryption'
    ).toString(CryptoJS.enc.Utf8);
    return this.decryptedPassword;
  }

  userLogin(formdata: NgForm) {
    this.formData = formdata.value;

    this.users.forEach((user) => {
      console.log(this.decrypt(user.password));
      if (
        user.userName == this.formData.userName &&
        this.decrypt(user.password) == this.formData.password
      ) {
        this.status = true;
        this.name = user.firstName + ' ' + user.lastName;
      }
    });
    sessionStorage.removeItem('admin');
    if (this.name && this.name.toLowerCase() === 'nilesh kumar') {
      sessionStorage.setItem('admin', 'yes');
    }
    if (this.status == true) {
      this.router.navigate([`libraryhome/${this.name}`]);
    } else {
      this.error = true;
    }
  }

  Register() {
    this.router.navigate([`userRegistration`]);
  }
}
