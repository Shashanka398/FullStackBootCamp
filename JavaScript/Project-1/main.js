console.log('Check');
const tableBody = document.getElementById('tableBody');
const searchButton = document.querySelector('.search');
const buttonAdd = document.querySelector('.btn-add');
const alert=document.querySelector("#alert");
const api="https://cbook-server-app.onrender.com/api/contact";
var flag1=0;


buttonAdd.addEventListener('click', () => {
  document.querySelector('.addContact').style.display = 'block'
  document.querySelector(".container").style.opacity='0.5';
 
})





const update = (id, name, mob, email) => {
  // console.log(email, mob)
  document.querySelector('#updateId').value = id
  document.querySelector('#updateName').value = name
  document.querySelector('#updateMobile').value = mob
  document.querySelector('#updateEmail').value = email
  document.querySelector('.update-btn').addEventListener('click', async e => {
    e.preventDefault()

    const updateId = document.querySelector('#updateId').value
    const updateName = document.querySelector('#updateName').value
    const updateMobile = document.querySelector('#updateMobile').value
    const updateEmail = document.querySelector('#updateEmail').value
    const updatedResponse = await fetch(
      `${api}?id=${updateId}&name=${updateName}&mobile=${updateMobile}&email=${updateEmail}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    console.log(updatedResponse.status)
    if (updatedResponse.status === 200) {
      alert('Updated Successfully');
      location.reload();
    }
  })
}





const insertIntoTable = item => {
  const row = document.createElement('tr')


  const nameCell = document.createElement('td')
  nameCell.textContent = item.name
  row.appendChild(nameCell)

  const mobileCell = document.createElement('td')
  mobileCell.textContent = item.mobile
  row.appendChild(mobileCell)

  const emailCell = document.createElement('td')
  emailCell.textContent = item.email
  row.appendChild(emailCell)

  const deleteButton = document.createElement('button')
  deleteButton.setAttribute('type', 'button')
  deleteButton.classList.add('btn', 'dlt-btn', 'btn-danger')
  deleteButton.textContent = 'Delete'
  const deleteCell = document.createElement('td')
  deleteCell.appendChild(deleteButton)

  const updateButton = document.createElement('button')
  updateButton.setAttribute('type', 'button')
  updateButton.classList.add('btn', 'udte-btn', 'btn-success')
  updateButton.textContent = 'Update'
  const updateButtonCell = document.createElement('td')
  updateButtonCell.appendChild(updateButton)
  row.appendChild(updateButtonCell)

  row.appendChild(deleteCell)

  updateButton.addEventListener('click', () => {
    document.querySelector('.updateContact').style.display = 'block'
    document.querySelector(".container").style.opacity='0.5';
    update(item.id, item.name, item.mobile, item.email)
  })
  const performDelete = async () => {
    try {
      const response = await fetch(
        `${api}/${item.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      row.remove()
    } catch (error) {
      console.error('Error:', error)
    }
  }
  deleteButton.addEventListener('click', () => {
    document.querySelector(".alert").style.display="block";
    document.querySelector(".container").style.opacity='0.2';
    document.querySelector("#alert-text").textContent=`Are you sure you want to delete ${item.name}`;
    document.querySelector("#alert-yes").addEventListener("click",()=>{
      document.querySelector(".alert").style.display="none";
      document.querySelector(".container").style.opacity='1';
      performDelete()
    })
    document.querySelector("#alert-no").addEventListener("click",()=>{
     location.reload();
    })
    
  })
  tableBody.appendChild(row)
}

let currentPage=0;
let last=9;

let allContact=[];
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');


  prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage=currentPage-10;
      last-=10;
      displayAllData();
    }
  });



nextPageButton.addEventListener('click', () => {
  if (last < allContact.length) {
    currentPage=currentPage+10;
    last+=10;
    displayAllData();
  }
});


const displayAllData =  () => {
  tableBody.innerHTML="";

 for(let i =currentPage;i<=last;i++)
 {
  insertIntoTable(allContact[i]);
 }
}




const fetchAll = async () => {
  const allData = await fetch(
    `${api}/all`
  )
  const allDataJson = await allData.json();
  allContact=allDataJson;
  console.log(allContact);
  tableBody.innerHTML="";
  displayAllData()
  // displayAllData(allDataJson)
}



const searchApi = async input => {
  const searchApi = await fetch(
    `${api}/search?str=${input}`
  )
  const searchJson = await searchApi.json()
  tableBody.innerHTML = ''
  searchJson.map(info => {
    insertIntoTable(info)
  })
}





searchButton.addEventListener('input', e => {
  let value = ''
  value = e.target.value
  if (value != ' ') {
    tableBody.innerHTML = ''
    searchApi(value)
  } else {
    tableBody.innerHTML = ''
    location.reload();
  }
})



async function postDataToServer (name, mobile, email) {
  const postData = {
    name: `${name}`,
    mobile: `${mobile}`,
    email: `${email}`
  }
  console.log(postData)
  try {
    const response = await fetch("https://cbook-server-app.onrender.com/api/contact",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      }
    )
    console.log(response.status)
    if (response.status === 200) {
      alert('Contact added Successfully')
      location.reload()
    }
  } catch (e) {
    console.log('Not done')
  }
}





document.querySelector('.submit-btn').addEventListener('click', e => {
  e.preventDefault()
  const cntName = document.querySelector('#name').value
  const cntMobile = document.querySelector('#mobile').value
  const cntEmail = document.querySelector('#email').value
  if (cntMobile.length < 10) {
    alert('Please Enter 10 numbers')
  } else {
    postDataToServer(cntName, cntMobile, cntEmail)
  }
})




document.querySelector('.back-btn').addEventListener('click', () => {
  location.reload()
})
fetchAll()

const updateContactButton = document.querySelector('.udte-btn'); 
const popupForm = document.getElementById('popupForm');

updateContactButton.addEventListener('click', () => {
  popupForm.style.display = 'block';
});



const backButtons = popupForm.querySelectorAll('.back-btn');
backButtons.forEach(backButton => {
  backButton.addEventListener('click', () => {
    popupForm.style.display = 'none';
  });
});




