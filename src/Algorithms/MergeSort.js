export function getMergeSort(array) {
    let animations = [];
    // copies the array to not mess up the original
    let copyArray = [...array];
    mergeSortHelper(array, 0, array.length - 1, copyArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, copyArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(copyArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(copyArray, middleIdx + 1, endIdx, mainArray, animations);
    mergeSort(mainArray, startIdx, middleIdx, endIdx, copyArray, animations);
}

function mergeSort(mainArray, startIdx, middleIdx, endIdx, copyArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // comparing changes, push to change color
        // push a second time to revert color
        animations.push([i, j]);
        animations.push([i, j]);
        if (copyArray[i] <= copyArray[j]) {
            // overwrite value of main array's k with copy array's i
            animations.push([k, copyArray[i]]);
            mainArray[k++] = copyArray[i++];
        } else {
            // overwrite value of main array's k with copy array's i
            animations.push([k, copyArray[j]]);
            mainArray[k++] = copyArray[j++];
        }
    }
    while (i <= middleIdx) {
        // comparing changes, push to change color
        // push a second time to revert color
        animations.push([i, i]);
        animations.push([i, i]);
        // overwrite value of main array's k with copy array's i
        animations.push([k, copyArray[i]]);
        mainArray[k++] = copyArray[i++];
    }
    while (j <= endIdx) {
        // comparing changes, push to change color
        // push a second time to revert color
        animations.push([j, j]);
        animations.push([j, j]);
        // overwrite value of main array's k with copy array's i
        animations.push([k, copyArray[j]]);
        mainArray[k++] = copyArray[j++];
    }
}