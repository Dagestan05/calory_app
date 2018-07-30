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
      {id: 0, name: 'Pizza', calories: 800},
      {id: 1, name: 'Cookies', calories: 350},
      {id: 2, name: 'Soup', calories: 640},
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
    itemNameInput: document.querySelector("#item-name"),
    itemCaloriesInput: document.querySelector("#item-calories"),
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
      //Add item to datat struct
      ItemCtrl.addItem(input.name, input.calories);


    }


    e.preventDefault();
  }



  //Public Methods
  return {
    init: function(){
      console.log("Initializing App ...")
      //Fetch items from data structure
      const items = ItemCtrl.getItems();

      //Populate list with items
      UICtrl.populateItemList(items)

      loadEventListeners();
    }
  }
})(ItemCtrl, UICtrl)

AppCtrl.init()