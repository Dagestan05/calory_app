//Storage Controller

//////////////////
//Item Controller
//////////////////
const ItemCtrl = (function() {
  // Item Constructor
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //Data structure / State
  const data = {
    items: [
      // {id: 0, name: 'Pizza', calories: 800},
      // {id: 1, name: 'Cookies', calories: 350},
      // {id: 2, name: 'Soup', calories: 640},
    ],
    currentItem: null,
    totalCalories: 0,
  }

  //Public MEthods
  return {
    getItems: function(){
      return data.items;
    },
    addItem: function(name, calories){
      //Create ID
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length -1].id + 1;
      } else {
        ID = 0;
      }
      calories = parseInt(calories);
      //Create new item with our constructor
      newItem = new Item(ID, name, calories);
      data.items.push(newItem);

      return newItem;
    },
    getTotalCalories: function(){
      let total = 0;
      data.items.forEach(item =>{
        total += item.calories;
      })
      //set total calories in data structure
      data.totalCalories = total;
      //return total calories
      return data.totalCalories;
    }
    ,
    logData: function() {
      return data;
    },
  }
})()

////////////////
//UI Controller
////////////////
const UICtrl = (function() {
  const UISelectors = {
    itemList: document.querySelector('#item-list'),
    addBtn: document.querySelector(".add-btn"),
    updateBtn: document.querySelector(".update-btn"),
    deleteBtn: document.querySelector(".delete-btn"),
    backBtn: document.querySelector(".back-btn"),
    itemNameInput: document.querySelector("#item-name"),
    itemCaloriesInput: document.querySelector("#item-calories"),
    totalCalories: document.querySelector(".total-calories"),
  }
  //Public methods
  return{
    populateItemList: function(items){
      let html = '';
      items.forEach(item => {
        html += `
        <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="fa fa-pencil edit-item"></i></a>
      </li>
        `
      });
      //Insert list items
      UISelectors.itemList.innerHTML = html
    },
    getItemInput: function(){
      return{
        name: UISelectors.itemNameInput.value,
        calories: UISelectors.itemCaloriesInput.value
      }
    },
    addListItem: function(newItem){
      UISelectors.itemList.style.display = 'block';
      //Create li element
      const newLi = document.createElement("li");
      newLi.className = 'collection-item';
      newLi.id = `item-${newItem.id}`;
      // Add html
      newLi.innerHTML = `
      <strong>${newItem.name}:</strong> <em>${newItem.calories} Calories</em>
      <a href="#" class="secondary-content"><i class="fa fa-pencil edit-item"></i></a>
      `
      //insert to ul
      UISelectors.itemList.insertAdjacentElement('beforeend', newLi)
      
    },
    clearInputFields: function(){
      UISelectors.itemNameInput.value = '';
      UISelectors.itemCaloriesInput.value = '';
    },
    hideEmptyList: function(){
      UISelectors.itemList.style.display = 'none';
    },
    showTotalCalories: function(totalCalories){
      UISelectors.totalCalories.textContent = totalCalories;
    },
    setInitialUIState: function(){ //func to initially hide edit mode of app
      UICtrl.clearInputFields();
      UISelectors.addBtn.style.display = 'inline';
      UISelectors.updateBtn.style.display = 'none';
      UISelectors.deleteBtn.style.display = 'none';
      UISelectors.backBtn.style.display = 'none';
    },
    getUISelectors: function(){
      return UISelectors;
    }
  }
})()

/////////////////
// App Controller
/////////////////
const AppCtrl = (function(ItemCtrl, UICtrl) {

  //Load event Listeners
  const loadEventListeners = function(){
    //Get UISelectors from UICtrl module & store in var
    const UISelectors = UICtrl.getUISelectors();

    // Add item events
    UISelectors.addBtn.addEventListener("click", itemAddSubmit);
  }
  //Add item submit func
  const itemAddSubmit = function(e){
    // get from input from UICtrl
    const input = UICtrl.getItemInput();
    //check for not empty inputs
    if (input.name !== '' && input.calories !== '') {
      //Add item to data struct
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      //Add item to UI list
      UICtrl.addListItem(newItem);
      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //Add total calores to UI
      UICtrl.showTotalCalories(totalCalories);
      //clear input fields
      UICtrl.clearInputFields();
    }


    e.preventDefault();
  }



  //Public Methods
  return {
    init: function(){
      console.log("Initializing App ...")
      //clear edit state
      UICtrl.setInitialUIState();
      //Fetch items from data structure
      const items = ItemCtrl.getItems();
      //check if any items in data
      if (items.length < 1) {
        UICtrl.hideEmptyList();
      } else {
        //Populate list with items
        UICtrl.populateItemList(items)
      }

      //Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      //Add total calores to UI
      UICtrl.showTotalCalories(totalCalories);

      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl)

AppCtrl.init()