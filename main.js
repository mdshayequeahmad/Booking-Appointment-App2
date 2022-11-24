//
class Appointment {
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

//
class UI {
  static displayLists() {
    axios.get('https://crudcrud.com/api/aa15c3d1c3a843aa8c29b4f65549ed70/abooking')
         .then((response) => {
            console.log(response);
            for (var i=0; i<response.data.length; i++) {
              UI.addAppToList(response.data[i]);
            }
         })
         .catch((err) => {
            console.log(err);
         })

    // const lists = Store.getLists();

    // lists.forEach((list) => UI.addAppToList(list));
  }

  static addAppToList(list) {
    const elist = document.querySelector("#AppList");

    const row = document.createElement("ul");

    row.innerHTML = `
        <li>${list.name}  --  
        ${list.email}  --  
        ${list.phone}  --  
        <button class="edit">Edit</button>
        <button class="delete">Delete</button></li>
      `;

    elist.appendChild(row);
  }

  static deleteList(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  

  static clearFields() {
    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#phone").value = "";
  }
}

//
class Store {
  static getLists() {
    let lists;
    if (localStorage.getItem("lists") === null) {
      lists = [];
    } else {
      lists = JSON.parse(localStorage.getItem("lists"));
    }

    return lists;
  }

  static addApp(list) {
    const lists = Store.getLists();
    lists.push(list);
    // localStorage.setItem("lists", JSON.stringify(lists));
  }

  static removeApp(phone) {
    const lists = Store.getLists();

    lists.forEach((list, index) => {
      if (list.phone === phone) {
        lists.splice(index, 1);
      }
    });

    localStorage.setItem("lists", JSON.stringify(lists));
  }

  
}

//
document.addEventListener("DOMContentLoaded", UI.displayLists);

//
document.querySelector("#AppForm").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;

  //
  const list = new Appointment(name, email, phone);

  axios.post('https://crudcrud.com/api/aa15c3d1c3a843aa8c29b4f65549ed70/abooking', list)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        })

  //
  UI.addAppToList(list);

  //
  Store.addApp(list);

  //
  UI.clearFields();
});

//
document.querySelector("#AppList").addEventListener("click", (e) => {
  //
  UI.deleteList(e.target);

  //
  Store.removeApp(e.target.parentElement.previousElementSibling.textContent);
});
