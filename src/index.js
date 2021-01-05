import React from 'react';
import ReactDOM from 'react-dom';
//import { Chart } from 'react-charts';
import { LineChart, Line } from 'recharts';
const data = [{year: 1, uv: 1, amt: 2400}, {year: 2, uv:10, amt: 2409}];
//import './index.css';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div>
                    {this.props.initialBalance}
                </div>
                <div>
                    {this.props.result}
                </div>
            </div>
        );
    }
}

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.handleChange(e);
    }

    render() {
        return (
            <form>
                <label>
                    Initial Balance:
                    <input type="number" name="initialBalance" value={this.props.initialBalance} onChange={this.handleChange} />
                </label>

                <br />

                <label>
                    Interest rate:
                    <input type="number" name="rate" value={this.props.rate} onChange={this.handleChange} />
                </label>

                <br />

                <label>
                    Number of years:
                    <input type="number" name="years" value={this.props.years} onChange={this.handleChange} />
                </label>

                <br />

                <label>
                    Annual Addition:
                    <input type="number" name="addition" value={this.props.addition} onChange={this.handleChange} />
                </label>
            </form>
        );
    }
}

class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            initialBalance: 1000,
            rate: 10,
            years: 10,
            addition: 0
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        let rate, years, initialBalance, addition

        rate = this.state.rate
        years = this.state.years
        initialBalance = this.state.initialBalance
        addition = this.state.addition

        if(e.target.name === "initialBalance")
        {
            initialBalance = e.target.value
            this.setState({initialBalance: e.target.value});
        }
        else if(e.target.name === "rate")
        {
            rate = e.target.value
            this.setState({rate: e.target.value});
        }
        else if(e.target.name === "years")
        {
            years = e.target.value
            this.setState({years: e.target.value});
        }
        else if(e.target.name === "addition")
        {
            addition = e.target.value
            this.setState({addition: e.target.value});
        }

        let rateDecimal = rate / 100

        let result = this.calculate(initialBalance, rateDecimal, years, addition)

        let data = new Array(years);
        for (let i = 0; i < years; i++) {
        console.log(this.calculate(initialBalance, rateDecimal, i+1, addition))
//            let point = new Array(2)
//            point[0] = i + 1
//            point[1] = this.calculate(initialBalance, rateDecimal, i+1, addition)
            data[i] = {year: i + 1, uv: this.calculate(initialBalance, rateDecimal, i+1, addition)}
        }

        let formattedResult = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(result)


        this.setState({result: formattedResult})
        this.setState({data: data})
    }

    calculate(initialBalance, rate, years, addition) {
        let principal = initialBalance * (1 + rate) ** years
        let futureValueOfSeries = addition * ((1 + rate) ** years - 1) / rate

        return principal + futureValueOfSeries
    }

    render() {
        return (
            <div className="">
                <div className="">
                    <InputForm initialBalance={this.state.initialBalance} rate={this.state.rate} years={this.state.years}
                               addition={this.state.addition} handleChange={this.handleChange}/>
                </div>

                <br />
                <br />

                <div className="">
                    <Table initialBalance={this.state.initialBalance} result={this.state.result}/>
                </div>


                 <LineChart width={400} height={400} data={this.state.data}>
                      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                 </LineChart>
            </div>
        );
    }
}

// ========================================

function MyChart() {

const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}]

  const renderLineChart = (
    <LineChart width={400} height={400} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    </LineChart>
  );

  return renderLineChart;
}

// ========================================

ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);