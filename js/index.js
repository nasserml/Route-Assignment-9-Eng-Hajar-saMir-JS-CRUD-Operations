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
    
    displayBookmark();
}

function addBookmark() {


    if(validation(siteName)&&validation(siteURL)){
        var bookmarksObject={
            siteURL:siteURL.value.startsWith('http://') || siteURL.value.startsWith('https://') || siteURL.value.startsWith('ftp://') ? siteURL.value: 'https://' +siteURL.value,// 
            siteName:siteName.value
        }
    
        bookmarkList.push(bookmarksObject);
    
        localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
        clearBookmarkForm();
    }

    
}


function displayBookmark(){
    var box='';

    for(var i=0; i<bookmarkList.length; i++) {
        
        box += `<tr>
        <td>${i+1}</td>
        <td>${bookmarkList[i].siteName}</td>
        <td><button class="btn button-visit" onclick="window.open('${bookmarkList[i].siteURL}','_blank');">
        
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








function validation(ele){


    var regex={
        siteName:/^[A-Za-z]{3,}$/,
        siteURL:/^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+[^\s]*$/
    }


    if(regex[ele.id].test(ele.value)){

        ele.classList.add('is-valid');
        ele.classList.remove('is-invalid');
        ele.nextElementSibling.classList.replace('d-block','d-none');
        return true;
    }else{
        ele.classList.add('is-invalid');
        ele.classList.remove('is-valid');
        ele.nextElementSibling.classList.replace('d-none','d-block');
        return false;
    }
  

}


