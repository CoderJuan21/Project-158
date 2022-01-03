AFRAME .registerComponent("cursor-listener",{
    schema: {
        selectedItemId: { default: "", type: "string" },
      },
      init: function () {
        this.handleMouseEnterEvents();
        this.handleMouseLeaveEvents();
        this.handleClickEvents();
      },
    
      handleClickEvents:function () {
         this.el.addEventListener("click",evt=>{
           const placeContainer = document.querySelector("#places-container")
           const {state} = placeContainer.getAttribute("tour")
           if(state === "places-list"){
             const id = this.el.getAttribute("id")
             const placesId = ["doctorstrange", "hulk", "ironman", "spidey"]
             if(placesId.includes(id)){
               placeContainer.setAttribute("tour",{state:"view",selectedCard:id})
             }
           }
         })
      },
    handlePlacesListState:function(){
        const id = this.el.getAttribute("id")
        const placesId = ["doctorstrange","hulk","ironman","spidey"]
        if(placesId.includes(id)){
            const placeContainer = document.querySelector("#places-container")
            placeContainer.setAttribute("cursor-listener",{
                selectedItemId:id
            })
            this.el.setAttribute("material",{color:"#da620f",opacity:1})
        }
    },
    handleMouseEnterEvents:function(){
        this.el.addEventListener("mouseenter",()=>{
            this.handlePlacesListState()
        })
    },
    handleMouseLeavesEvents:function(){
        this.el.addEventListener("mouseleave",()=>{
            const {selectedItemId} = this.data
            if(selectedItemId){
                const el = document.querySelector(`#${selectedItemId}`)
                const id = el.getAttribute("id")
                if(id == selectedItemId){
                    el.setAttribute("material",{color:"green",opacity:1})
                }
            }
        })
    }
})