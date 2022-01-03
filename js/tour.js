AFRAME .registerComponent("tour",{
    schema:{
        state:{type:"string",default:"places-list"},
        selectedCard:{type:"string",default:"#card1"}
        },
          init: function () {
            this.placesContainer = this.el;
            this.createCards();
          },
        
          tick:function(){
        const {state} = this.el.getAttribute("tour")
        if(state === "view"){
          this.hideEl([this.placesContainer])
          this.showView()
        }
          },
        
          hideEl:function(elList){
        elList.map(el=>{
          el.setAttribute("visible",false)
        })
          },
        
          showView:function(){
        const {selectedCard} = this.data;
        const skyEl = document.querySelector("#main-container")
        skyEl.setAttribute("material",{src:`./assets/360_images/${selectedCard}/place-0.jpg`,color:"white"})
          },
        
    createCards:function(){
        const thumbnailsRef = [
            {
                id:"doctorstrange",
                title:"Doctor Strange",
                url:"./assets/thumbnails/doctorstrange.png"
            },
            {
                id:"hulk",
                title:"Hulk",
                url:"./assets/thumbnails/hulk.jpeg"
            },
            {
                id:"ironman",
                title:"Ironman",
                url:"./assets/thumbnails/ironman.jpg"
            },
            {
                id:"spidey",
                title:"Spidey",
                url:"./assets/thumbnails/spidey.jpg"
            },
        ];
        let previousXPosition = -60
        for(var item of thumbnailsRef){
            const posX=previousXPosition+25
            const posY=10
            const posZ=-40
            const position={x:posX,y:posY,z:posZ}
            previousXPosition = posX

            const borderEl = this.createBorder(position,item.id)
            const thumbnail = this.createThumbnail(item)
            borderEl.appendChild(thumbnail)

            const titleEl = this.createTitleEl(position,item)
            borderEl.appendChild(titleEl)
            this.placesContainer.appendChild(borderEl)
        }
    },
    createBorder:function(position,id){
const entityEl = document.createElement("a-entity")
entityEl.setAttribute("id",id)
entityEl.setAttribute("visible",true)
entityEl.setAttribute("position",position)
entityEl.setAttribute("geometry",{primitive:"ring",radiusInner:9,radiusOuter:10})
entityEl.setAttribute("material",{color:"#da620f",opacity:1,})
entityEl.setAttribute("cursor-listener",{})
return entityEl
    },
    createThumbnail:function(item){
        const entityEl = document.createElement("a-entity")
      //  entityEl.setAttribute("id",id)
        entityEl.setAttribute("visible",true)
        entityEl.setAttribute("geometry",{primitive:"circle",radius:9})
        entityEl.setAttribute("material",{src:item.url})
        return entityEl
            },
            createTitleEl:function(position,item){
                const entityEl = document.createElement("a-entity")
               // entityEl.setAttribute("id",id)
                entityEl.setAttribute("visible",true)
                const elPosition = position
                elPosition.y = -20
                entityEl.setAttribute("position",elPosition)
                entityEl.setAttribute("text",{font:"exo2bold",align:'center',width:70,color:"black",value:item.title})
                return entityEl
                    }
})