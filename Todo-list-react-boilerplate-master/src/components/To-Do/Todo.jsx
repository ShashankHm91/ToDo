import React, { useState } from 'react'
import './toDo.css'

const Todo = () => {

    const [inputData, setInputData] = useState('')
    const [items, setItems] = useState([])
    const [toggleSubmit, setToggleSubmit] = useState(true)
    const [editItems, setEditItems] = useState(null)

    const addItem = () => {
        if (!inputData){
            return
        }
        else if (inputData && !toggleSubmit) {
            setItems(
                items.map((ele) => {
                    if (ele.id === editItems) {
                        return { ...ele, name: inputData }
                    }
                    return ele
                })
            )
            setToggleSubmit(true)
            setInputData('')
            setEditItems(null)
        }
        else {
            const allData = { id: new Date().getTime().toString(), name: inputData }
            setItems([...items, allData])
            setInputData('')

        }
    }

    const deleteItem = (data) => {
        const updateItems = items.filter((ele) => {
            return (data !== ele.id)
        })
        setItems(updateItems)
    }

    const editItem = (id) => {
        let newEditItem = items.find((ele) => {
            return ele.id === id
        })
        // console.log(newEditItem);
        setToggleSubmit(false)
        setInputData(newEditItem.name)
        setEditItems(id)
    }



    return (
        <div>
            <div className='container'>
                <div className=''>
                    <h2>To-Do List</h2>
                </div>
                <div className='inputFields'>
                    <input id='task' type='text' placeholder='Enter here...' onChange={(e) => { setInputData(e.target.value) }} value={inputData} />
                    {
                        toggleSubmit ? <input id='btn' type='submit' value='Add To-Do' onClick={addItem} /> : <input id='btn' type='submit' value='Ok' onClick={addItem} />
                    }
                </div>
                <div className='list'>
                    {
                        items.map((ele) => {
                            return (
                                <div className='item-container' key={ele.id}>
                                    <li >{ele.name}</li>

                                    <i className="fas fa-edit" title='Edit item' onClick={() => { editItem(ele.id) }}></i>

                                    <i className="fas fa-trash-alt" title='Delete item' onClick={() => { deleteItem(ele.id) }}></i>
                                </div>

                            )
                        })
                    }

                </div>
            </div>


        </div>
    )
}

export default Todo
