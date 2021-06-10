import React, {useState, useRef, useEffect} from 'react';
import './Home.css'
import http from "../plugins/Fetch";


const Home = () => {


    const addItem = useRef()

    const [items, addItems] = useState([])


    useEffect(() => {
        const itemData2 = {
            loginEmail: localStorage.getItem("keyBase")
        }
        http.post('/getItems', itemData2).then(res => {
            addItems(res.findItems)
            console.log(res)
        })
    }, [])

    function itemValue() {
        const itemData = {
            item: addItem.current.value,
            loginEmail: localStorage.getItem("keyBase")
        }

        http.post('/itemValue', itemData).then(res => {
            addItems(res.findItem)
        })
    }


    return (
        <body>
        <header>
            <div className="container">
                <h3 className="header__username">Audriaus</h3>
                <h1 className="header__title">Shopping List</h1>
            </div>
        </header>
        <div className="container">
            <div className="main">
                <input className="submission-line__input" type="text" maxLength="20" ref={addItem}/>
                <button className="submission-line__btn" onClick={itemValue}>Add</button>
                <ul className="list">
                    {items.map((item, index) =>
                        <li key={index}>
                            <p className="list__item"><a className="list__delete-btn">X</a>{item.item}<a
                                className="list__check-btn">✔</a></p>
                        </li>
                    )}
                </ul>
            </div>
        </div>
        </body>

    );
};

export default Home;