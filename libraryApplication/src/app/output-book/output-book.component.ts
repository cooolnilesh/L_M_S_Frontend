import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../model/Book';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-output-book',
  templateUrl: './output-book.component.html',
  styleUrls: ['./output-book.component.css'],
})
export class OutputBookComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  Books: Book[] = [];
  length: number = 0;
  isAdmin: Boolean = false;
  showResult: boolean = true;
  ngOnInit(): void {
    const admin = sessionStorage.getItem('admin');
    this.isAdmin = admin && admin === 'yes' ? true : false;
    this.loadData();
  }

  public loadData() {
    this.Books = [];
    this.route.params.subscribe((parameters) => {
      if (String(parameters['searchtype']).localeCompare('byname') == 0) {
        this.bookService
          .findByName(String(parameters['bookname']))
          .subscribe((allbook) => {
            this.Books = allbook;
            if (allbook.length == 0) this.showResult = false;
          });
      } else if (
        String(parameters['searchtype']).localeCompare('byauthor') == 0
      ) {
        this.bookService
          .findByAuthor(parameters['author'])
          .subscribe((allbook) => {
            this.Books = allbook;
            if (allbook.length == 0) this.showResult = false;
          });
      } else if (
        String(parameters['searchtype']).localeCompare('bycategory') == 0
      ) {
        this.bookService
          .findByCategory(parameters['category'])
          .subscribe((allbook) => {
            this.Books = allbook;
            if (allbook.length == 0) this.showResult = false;
          });
      }
    });
  }

  public checkAvailability(returnD: Date): String {
    let d = new Date();

    let returnDate = new Date(returnD);
    if (d < returnDate) return 'Unavailable';
    else if (d > returnDate) return 'Available';
    else if (d == returnDate) return 'Unavailable';
    else return 'Unavailable';
  }

  myPix = new Array(
    '../../assets/gif/noresult.gif',
    '../../assets/gif/noresult2.gif',
    '../../assets/gif/noresult3.gif',
    '../../assets/gif/noresult4.gif',
    '../../assets/gif/noresult5.gif'
  );
  randomNum = Math.floor(Math.random() * this.myPix.length);
  src = this.myPix[this.randomNum];

  editBook(book: Book) {
    console.log(book);
    let action: String = 'edit';
    this.router.navigate([`editBook/${JSON.stringify(book)}/${action}`]);
  }

  borrowBook(book: Book) {
    console.log(book);
    let action: String = 'edit';
    this.router.navigate([`editBook/${JSON.stringify(book)}/${action}`]);
  }

  deleteBook(book: Book) {
    this.bookService.deleteBook(book).subscribe((data) => {
      //this.loadData();
    }); 
  }
  reloadPage() {
    window.location.reload();
 }
  logout() {
    sessionStorage.removeItem('admin');
    this.router.navigateByUrl('/userLogin');
  }
}
