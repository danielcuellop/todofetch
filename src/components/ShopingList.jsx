import { useState, useEffect } from "react";
import ShoppingItem from "./ShopingItem.jsx";





const ShoppingList = () => {

    
    const [list, setList] = useState([])
    useEffect(() => {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/cuellop')
      .then((response) => response.json())
      .then((name) => setList(name))
      console.log(list)
      
  }, []);
    
     const [item, setItem] = useState([])
     
    

    const handleInputChange = (event) => {
        setItem(event.target.value)
        console.log('handleInputChange')
    }

    // cuando apriete el boton de agregar el valor del input lo vamos a añadir a un array



    async function putFunction(newList) {
        try {
          const url = 'https://assets.breatheco.de/apis/fake/todos/user/cuellop';
          const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(newList),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error:', error);
        }
      }
      
      
      const handleAddItem = () => {
        const newTask = { label: item, done: false };
        const newList = [...list, newTask];
        setList(newList);
        putFunction(newList);
        setItem('');
      };
    

    const handleDeleteItem = (index) => {
        //list.splice(index, 1)
        setList((previousList) => {
            const auxList = [...previousList]
            auxList.splice(index, 1)
            putFunction(auxList)
            return auxList
        })
    }
 
    window.addEventListener("keydown", (e)=>{
        if(e.keyCode===13){
            handleAddItem();
        }
    })

    return (
        
        <div className="container row justify-content-center">
            <h1>TODO</h1>
            <div className="col-6">
            <p className="list-group">
                {<input type="text" className="bg-light" value={item} onChange={handleInputChange} placeholder="Whats need to be done?" onClick={handleInputChange}/>
                }
                {
                    list.map((item, index) => (
                        <ShoppingItem
                        name={item.label}
                        posicion={index}
                        deleteItem={() => { handleDeleteItem(index)}}
                    />
                    ))
                }
            </p>
            </div>
            
        </div>
    )
}

export default ShoppingList
