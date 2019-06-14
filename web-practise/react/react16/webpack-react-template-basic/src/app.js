import React from 'react'
import ReactDOM from "react-dom"

class App extends React.Component {
    constructor(args) {
        super(args)
        this.state = {
            items: this.genItems()
        }
    }

    genItems() {
        console.time('gen items')

        let items = []

        for (let i = 0; i < 10000; i++) {
            items.push({
                name: `name${i}`,
                age: i
            })
        }

        console.timeEnd('gen items')

        return items
    }

    componentWillMount() {
        console.time('mount')
    }

    componentDidMount() {
        console.timeEnd('mount')
    }

    render() {
        console.time('render items')

        let renderedItems = this.state.items && this.state.items.length > 0
            && this.state.items.map(item =>
                <div key={item.age}><label>{item.name}</label><input defaultValue={item.age}/></div>
            );

        console.timeEnd('render items')

        return renderedItems

    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
)
