
/*
 * MODEL Class 
 * @Ib
 */


export class Book {

	id:  Number ;
	name: String ;
    author: String ;
    category: String ;
    returnDate :Date;
	edition:String;



	constructor(id :Number ,name: String ,author: String ,category: String ,returnDate :Date ,edition:String) {
		this.id = id;
		this.name = name;
		this.author = author;
		this.category = category;
		this.returnDate = returnDate;
		this.edition=edition;
	}

}