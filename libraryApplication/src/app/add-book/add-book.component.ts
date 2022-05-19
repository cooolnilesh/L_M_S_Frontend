import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../model/Book';
import { BookService } from '../service/book.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  currentdate: Date = new Date();
  book: Book;
  isAdmin: boolean = false;
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.book = new Book(0, '', '', '',this.currentdate,'');
  }
  showstatus: boolean = true;
  ngOnInit(): void {
    const admin =  sessionStorage.getItem('admin');
    this.isAdmin = admin && admin === 'yes' ? true : false;
    this.route.params.subscribe((parameters) => {
      if (String(parameters['action']).localeCompare('edit') == 0) {
        this.book = JSON.parse(parameters['book']);
        this.showstatus = false;
      }
    });
  }
  errorstatus: boolean = false;
  addstatus: boolean = false;
  borrowstatus: boolean = false;
  editStatus: boolean = false;
  onSubmit(book: Book) {
    if (!this.showstatus) {
      if (this.isAdmin) {
        this.editStatus = true;
      }
      return true;
    }
    if (this.isAdmin) {
      if (
        // book.id == 0 ||
        book.name == '' ||
        book.author == '' ||
        book.category == ''
      ) {
        this.errorstatus = true;
      } else {
        this.errorstatus = false;
          delete book['id'];
          this.bookService.addBook(book).subscribe((data) => {
            this.addstatus = true;
          });
      }
    } else {
      if (book.name == '') {
        this.errorstatus = true;
      } else {
          this.errorstatus = false;
          this.borrowstatus = true;
      }
    }

  }

  onEdit(book: Book) {
    if (book.name == null || book.author == null || book.category == null) {
      this.errorstatus = true;
    } else {
      console.log(book.author);
      this.bookService.editBook(book).subscribe((data) => {});
    }
  }
  
  onBorrow(book: Book) {
    if (book.name == null) {
      this.errorstatus = true;
    } else {
      this.borrowstatus = true;
    }
  }
}
