const add_book = document.getElementById('add_book');
const info = document.getElementById('book_info');
const cancel = document.querySelector('.Cancel');
const Form = document.querySelector('#main_dialog');
const output = document.querySelector(".book_shelf");
// const del = document.querySelector(".remove");

function Book(title,author,page,status){
    this.title = title;
    this.author = author;
    this.no = page;
    this.status = status;
};

function resetForm(){
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('pages').value = "";
    document.querySelector('#status').checked = false;
}

function render(){
    output.innerHTML = "";
    library.forEach((item,index)=>{
        let StatusText = item.status ?"Read":"Not Read";
        let Element = document.createElement('div');
        Element.innerHTML = `<div class="card">
                                <div class="card_name">
                                <div>Title</div><div>${item.title}</div></div>
                                <div class="card_author">
                                <div>Author</div><div>${item.author}</div></div>
                                <div class="card_page">
                                <div>Pages</div><div>${item.no}</div></div>
                                <div class="card_footer">
                                <div class="remove" onclick = "remove_book(${index})">
                                 <img src="./assets/dustbin.png" att="delete">
                                </div>
                                <div class="card_status" onclick = status_changer(${index})>${StatusText}</div></div>
                                </div>`;
    let cardstatus = Element.querySelector('.card_status');
    console.log(cardstatus)
    if(item.status){
        cardstatus.style.backgroundColor = '#86efac';
    }
    else {
        cardstatus.style.backgroundColor = '#fcd34d';
    }
    output.appendChild(Element);
    })
}

const library = [];

add_book.addEventListener('click',()=>{
    info.showModal();
});
cancel.addEventListener('click',()=>{
    resetForm();
    info.close();
});

Form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let Title = document.getElementById('title').value;
    let Author = document.getElementById('author').value;
    let pno = document.getElementById('pages').value;
    let status = document.querySelector('#status').checked;
    const newbook = new Book(Title,Author,pno,status);
    library.push(newbook);
    console.log(library);
    resetForm();
    info.close();
    render();
})

function remove_book(i){
    library.splice(i,1);
    render();
}

function status_changer(i){
   const item = library[i];
   item.status = !item.status;
   render(); 
}