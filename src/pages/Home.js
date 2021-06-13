import React, {useState, useRef, useEffect} from 'react';
import './Home.css'
import http from "../plugins/Fetch";
import CreateIcon from '@material-ui/icons/Create';
import ClearIcon from '@material-ui/icons/Clear';


const Home = () => {

    const addItem = useRef()
    const updateItemValue = useRef()

    const [items, addItems] = useState([])
    const [showBtn, setShowBtn] = useState(false)
    const [itemIndex, setItemIndex] = useState(0)
    const [error2, setError2] = useState("")


    useEffect(() => {
        const itemData2 = {
            loginEmail: localStorage.getItem("keyBase")
        }
        http.post('/getItems', itemData2).then(res => {
            addItems(res.findItems)
        })
    }, [items])

    function resetInputFields() {
        addItem.current.value = ""
    }

    function itemValue() {
        const itemData = {
            item: addItem.current.value,
            loginEmail: localStorage.getItem("keyBase"),
        }

        http.post('/itemValue', itemData).then(res => {
            addItems(res.findItem)
            setError2(res.message)

        })
        resetInputFields()
    }

    function removeValue(id) {
        http.get('/removeItem/' + id).then(res => {
            addItems(res.allItems)
        })
    }

    function show(index) {
        setItemIndex(index)
        setShowBtn(!showBtn)
    }

    // function itemNewText(value) {
    //
    //     let changeItemValue = items
    //     changeItemValue[itemIndex].item = value
    //     addItems([...changeItemValue])
    //     console.log([...changeItemValue][1])
    // }

    function sendNewValue() {

        const itemToSend = {
            clientInfo: items[itemIndex],
            newValue: updateItemValue.current.value
        }

        http.post('/changeItemValue', itemToSend).then(res => {
            addItems(res.oneItem)
            console.log(res.oneItem)
        })
    }

    function logClientOut() {
        window.localStorage.removeItem('keyBase');
    }

    // 94line instead ref use onChange={e => itemNewText(e.target.value)} and call a function 52

    return (
        <body>
        <header>
            <div className="container">
                <h4 className="header__username">User: {window.localStorage.getItem('keyBase')}</h4>
                <h4 className="header__title">Shopping List</h4>
            </div>
            <button className="submission-line__btn2" onClick={logClientOut}>log out</button>
        </header>
        <div className="container">
            <div className="main">
                <input className="submission-line__input" type="text" maxLength="20" ref={addItem}/>
                <button className="submission-line__btn" onClick={itemValue}>Add</button>
                <div className="errorMsg2" style={{color: "red"}}>{error2}</div>

                {!!items ? <ul className="list">
                    {items.map((item, index) =>
                        <li key={index}>
                            <p className="list__item"><a className="list__delete-btn"
                                                         onClick={() => removeValue(item._id)}><ClearIcon/></a>{item.item}<a
                                className="list__check-btn" onClick={() => show(index)}><CreateIcon/></a></p>
                        </li>
                    )}
                    {showBtn ? <div>
                        <input className="list__item" style={{color: "white"}} type="text" placeholder="New Product"
                               ref={updateItemValue}/>
                        <button className="mr" onClick={sendNewValue}>Edit</button>
                    </div> : null}
                </ul> : null}
            </div>
        </div>
        </body>

    );
};

export default Home;