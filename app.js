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
    logData: function() {
      return data;
    },
  }
})()

////////////////
//UI Controller
////////////////
const UICtrl = (function() {
  
  //Public methods
  return{

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
    }
  }
})(ItemCtrl, UICtrl)

AppCtrl.init()