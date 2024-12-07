import React, {useState} from 'react'
import '@/app.css'
import cs from '@/assets/imgs/cs.jpg'
import {Button} from "antd";

function App() {
    const [count, setCounts] = useState('')
    const onChange = (e: any) => {
        setCounts(e.target.value)
    }
    return (
        <>
            <Button type="primary">Hello World</Button>
            <h2 className="m-4 p-4 bg-blue-500 text-white">webpack5-react-ts</h2>
            <img src={cs} alt="cs"/>
            <p>受控组件</p>
            <input type="text" value={count} onChange={onChange}/>
            <br/>
            <p>非受控组件</p>
            <input type="text"/>
        </>
    )
}

export default App
