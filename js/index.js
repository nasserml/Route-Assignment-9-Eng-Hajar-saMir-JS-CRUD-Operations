var siteName=document.getElementById('siteName');
var siteURL=document.getElementById('siteURL');
var submitButton=document.getElementById('submitButton');
var bookMarkTableRow=document.getElementById('bookmarkTableRow');


var bookmarkList = [];
if(localStorage.getItem('bookmarkList') == null) {
    bookmarkList=[];
} else{

    bookmarkList=JSON.parse(localStorage.getItem('bookmarkList'));
    displayBookmark();
}

submitButton.onclick=function(){
    addBookmark();
    clearBookmarkForm();
    displayBookmark();
}

function addBookmark() {

    var bookmarksObject={
        siteURL:siteURL.value,
        siteName:siteName.value
    }

    bookmarkList.push(bookmarksObject);

    localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
}


function displayBookmark(){
    var box='';

    for(var i=0; i<bookmarkList.length; i++) {
        box += `<tr>
        <td>${i+1}</td>
        <td>${bookmarkList[i].siteName}</td>
        <td><button class="btn button-visit" onclick="window.open('https://${bookmarkList[i].siteURL}','_blank');">
        
            <i class="fa-solid fa-eye"></i> Visit
        </button></td>
        <td><button class="btn button-delete" onclick="deleteBookmark(${i})">
            <i class="fa-solid fa-trash-can"></i> Delete
        </button></td>
    </tr>`;
    }

    bookMarkTableRow.innerHTML=box;

}


function clearBookmarkForm(){
    siteName.value=null;
    siteURL.value=null;
}

function deleteBookmark(index){
    bookmarkList.splice(index,1);
    localStorage.setItem('bookmarkList',JSON.stringify(bookmarkList));
    displayBookmark();
}