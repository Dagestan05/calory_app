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
    itemList: '#item-list'
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
      document.querySelector(UISelectors.itemList).innerHTML = html
    }
  }
})()

/////////////////
// App Controller
/////////////////
const AppCtrl = (function(ItemCtrl, UICtrl) {

  //Public Methods
  return {
    init: function(){
      console.log("Initializing App ...")
      //Fetch items from data structure
      const items = ItemCtrl.getItems();

      //Populate list with items
      UICtrl.populateItemList(items)
    }
  }
})(ItemCtrl, UICtrl)

AppCtrl.init()