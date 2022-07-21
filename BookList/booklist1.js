class Books{
    constructor(title,author,dPublish,bNumber){
        this.id = 0;
        this.title = title;
        this.author = author;
        this.dPublish = dPublish;
        this.bNumber = bNumber;
    }

}


class Store{
    static getIt(){
        let ownerBook;
        if(localStorage.getItem("ownerBook") == null){
            ownerBook = []
        }else{
            ownerBook = JSON.parse(localStorage.getItem("ownerBook"))
        }
        return ownerBook;
    }
    static addIt(book){
        const books = Store.getIt()
        if(books.push(book)){ 
            books.forEach((item, index) => {
               item.id = index;
            })
        } 
        localStorage.setItem("ownerBook", JSON.stringify(books))
        
    }
    static editBook(bookId, book){

        const books = Store.getIt();

        for(let product of books){
            if(bookId == product.id){
                product.title = book[0]
                product.author = book[1]
                product.dPublish = book[2]
                product.bNumber = book[3]

            }
        }
        localStorage.setItem("ownerBook", JSON.stringify(books))
    }   
    static removebook(bookNumber){
        let books = Store.getIt()
        books.forEach((book,index) =>{
            if(book.bNumber == bookNumber){
                books.splice(index, 1)  
            }
        })
        localStorage.setItem("ownerBook", JSON.stringify(books))
    }
}
window.onload = function(){

    let btn = document.getElementById("button");
   
    btn.onclick = function(e){
        

        let title = document.getElementById("title").value;
        let author = document.getElementById("author").value;
        let dPublish = document.getElementById("datePublish").value;
        let bNumber = document.getElementById("bookNumber").value;
        
        if(title == '' || author == '' || dPublish == '' || bNumber ==''){
            showAlert('Please fill all the blank', 'danger')
        }else{
            const book = new Books(title,author,dPublish,bNumber);  

            showAlert('Book has added', 'green')
            addIt(book)
            Store.addIt(book)
            
            document.getElementById("title").value = '';
            document.getElementById("author").value = '';
            document.getElementById("datePublish").value = '';
            document.getElementById("bookNumber").value = '';
        }

    };

 
}

function displayBooks(){
    const books = Store.getIt()
    books.forEach(function(book){
        addIt(book)
    })
}
document.addEventListener('DOMContentLoaded', displayBooks())

function showAlert(message, className){
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(message));
    div.setAttribute('class',className);
    let body = document.getElementsByTagName('body');
    body = body[0]
    const container = document.getElementById("container");
    body.insertBefore(div, container)
    setTimeout(() => {
        const elem = document.querySelector(`.${className}`)
        elem.remove()
    }, 3000)
}

function addIt(book){
    let container = document.getElementById("container");
    let docFang = document.createElement("div");
    docFang.setAttribute("class","row")
    docFang.innerHTML = `   
    <h1>${book.title}</h1>
    <h4>${book.author}</h4>
    <h4>${book.dPublish}</h4>
    <h4>${book.bNumber}</h4>
    <div><button class="remove2">Delete</button></div>
    <button class="edit">Edit</button>
    `
    
    container.appendChild(docFang)

    docFang.addEventListener('click',function(e){
        let el = e.target
        console.log()
        if(el.classList.contains("remove2")){
            el.parentElement.parentElement.remove();
            showAlert('Book Removed', 'green')

            Store.removebook(e.target.parentElement.previousElementSibling.textContent);

        
        }



        if(el.classList.contains("edit")){
            docFang.setAttribute("class","row style")

            let books = JSON.parse(localStorage.getItem("ownerBook"))
            
            books.forEach(elem => {
                if(book.id == elem.id){
                    docFang.innerHTML = `
                    <h1><input class="input-title" type='text' value='${elem.title}'></h1>
                    <h4><input class="input-author" type='text' value='${elem.author}'></h4>
                    <h4><input class="input-datePublish" type='text' value='${elem.dPublish}'></h4>
                    <h4><input class="input-bookNumber" type='text' value='${elem.bNumber}'></h4>
                    <div><button class="remove2">Delete</button></div>
                    <button class="edit">Edit</button>
                    <button class="ok">ok</button>
                    `  
                }
            })
            // docFang.innerHTML = `
            // <h1><input class="input-title" type='text' value='${book.title}'></h1>
            // <h4><input class="input-author" type='text' value='${book.author}'></h4>
            // <h4><input class="input-datePublish" type='text' value='${book.dPublish}'></h4>
            // <h4><input class="input-bookNumber" type='text' value='${book.bNumber}'></h4>
            // <div><button class="remove2">Delete</button></div>
            // <button class="edit">Edit</button>
            // <button class="ok">ok</button>
            // `

            
        }
        if(el.classList.contains("ok")){
            let title = document.querySelector(".input-title").value;
            let author = document.querySelector(".input-author").value;
            let dPublish = document.querySelector(".input-datePublish").value;
            let bNumber = document.querySelector(".input-bookNumber").value;

            let bookEdit = [title,author,dPublish,bNumber]

            docFang.innerHTML = `
            <h1>${title}</h1>
            <h4>${author}</h4>
            <h4>${dPublish}</h4>
            <h4>${bNumber}</h4>
            <div><button class="remove2">Delete</button></div>
            <button class="edit">Edit</button>
            `

            
            Store.editBook(book.id, bookEdit)
        }
    })
}
