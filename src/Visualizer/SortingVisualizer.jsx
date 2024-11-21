import React from 'react';
import { getBubbleSort } from '../Algorithms/BubbleSort';
import { getMergeSort } from '../Algorithms/MergeSort';

export default class SortingVisualizer extends React.Component {
    // constructors run immediately when class component instance is created
    constructor(props) {
        // necessary to call, otherwise this.state will be undefined!
        super(props);

        this.animationSpeed = 10;

        // assigning initial state in constructor
        this.state = {
            array: [],
        }
    }

    // when the app (re-)loads, reset the array
    componentDidMount() {
        this.resetArray();
    }

    // resets the array
    resetArray() {
        // empties array before resetting
        const array = [];
        // render 100 values for array
        for (let i = 0; i < 100; i++) {
            // pushes random intervals into array ranging from 5 to 400
            array.push(randomInt(5, 400));
        }
        // set array to state
        this.setState({ array });
    }

    bubbleSort() {
        const animations = getBubbleSort(this.state.array);
        const arrayBars = document.getElementsByClassName("array-bar");

        // delay
        let timeout = 0;

        for (let i = 0; i < animations.length; i++) {
            const [type, index1, valueOrIndex2] = animations[i];
            const isColorChange = type === "comparison1" || type === "comparison2";

            if (isColorChange) {
                const color = type === "comparison1" ? "red" : "hsl(136deg, 22%, 35%)";
                const firstBarIndex = index1;
                const secondBarIndex = valueOrIndex2;
                const firstBarStyle = arrayBars[firstBarIndex].style;
                const secondBarStyle = arrayBars[secondBarIndex].style;

                setTimeout(() => {
                    firstBarStyle.backgroundColor = color;
                    secondBarStyle.backgroundColor = color;
                }, timeout);

            } else {
                const barIndex = index1;
                const newHeight = valueOrIndex2;
                const barStyle = arrayBars[barIndex].style;
                const valueElement = arrayBars[barIndex].querySelector(".array-value");

                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                    if (valueElement) {
                        // ensures innerHTML of moved bar resembles correct value
                        valueElement.textContent = newHeight;
                    }
                }, timeout);
            }

            timeout += this.animationSpeed;
        }
    }

    mergeSort() {
        const animations = getMergeSort(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? "red" : "hsl(136deg, 22%, 35%)";
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * this.animationSpeed);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    const valueElement = arrayBars[barOneIdx].querySelector(".array-value");

                    if (valueElement) {
                        // ensures innerHTML of moved bar resembles correct value
                        valueElement.textContent = newHeight;
                    }
                }, i * this.animationSpeed);
            }
        }
    }

    render() {
        const { array } = this.state;

        return <>
            <div className="array-container">
                {array.map((value, idx) => (
                    <div className="array-bar" style={{ height: `${value}px` }} key={idx}>
                        <div className="array-value">{value}</div>
                    </div>
                ))}
            </div>
            <div className="button-container">
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
            </div>
        </>;
    }
}

// randomize numbers
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}