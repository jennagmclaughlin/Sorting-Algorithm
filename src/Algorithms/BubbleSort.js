export function getBubbleSort(array) {
    let animations = [];
    // copies the array
    let copyArray = [...array];
    bubbleSort(copyArray, animations);
    return animations;
}

function bubbleSort(copyArray, animations) {
    const length = copyArray.length;
    let x = length - 1;
    while (x > 0) {
        let swapped = false;
        for (let i = 0; i < x; i++) {
            // comparing changes, push to change color
            // push a second time to revert color
            animations.push(["comparison1", i, (i + 1)]);
            animations.push(["comparison2", i, (i + 1)]);
            if (copyArray[i] > copyArray[i + 1]) {
                swapped = true;
                animations.push(["swap", i, copyArray[i + 1]]);
                animations.push(["swap", (i + 1), copyArray[i]]);
                swap(copyArray, i, (i + 1));
            }
        }
        if (!swapped) break;
        x--;
    }
}

function swap(copyArray, firstIndex, secondIndex) {
    let temp = copyArray[firstIndex];
    copyArray[firstIndex] = copyArray[secondIndex];
    copyArray[secondIndex] = temp;
}