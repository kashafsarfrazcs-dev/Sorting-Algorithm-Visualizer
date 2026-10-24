
// ============================================================
// SortLab - Sorting Algorithm Visualizer
// PART 1 OF 2
// DOM references, algorithm information, and sorting logic
// ============================================================

"use strict";

// ==================== DOM REFERENCES ====================

const algorithmSelect = document.getElementById("algorithm");
const arraySizeSlider = document.getElementById("array-size");
const arraySizeValue = document.getElementById("array-size-value");
const speedSelect = document.getElementById("speed");

const generateButton = document.getElementById("generate-btn");
const startButton = document.getElementById("start-btn");
const pauseButton = document.getElementById("pause-btn");
const stepButton = document.getElementById("step-btn");
const resetButton = document.getElementById("reset-btn");

const visualizerTitle = document.getElementById("visualizer-title");
const statusElement = document.getElementById("status");
const arrayContainer = document.getElementById("array-container");

const comparisonsElement = document.getElementById("comparisons");
const swapsElement = document.getElementById("swaps");
const totalElementsElement = document.getElementById("total-elements");

const algorithmTitle = document.getElementById("algorithm-title");
const algorithmDescription = document.getElementById("algorithm-description");
const currentOperation = document.getElementById("current-operation");
const pseudocodeElement = document.getElementById("pseudocode");

const bestCaseElement = document.getElementById("best-case");
const averageCaseElement = document.getElementById("average-case");
const worstCaseElement = document.getElementById("worst-case");

const bestExplanationElement = document.getElementById("best-explanation");
const averageExplanationElement = document.getElementById("average-explanation");
const worstExplanationElement = document.getElementById("worst-explanation");
const complexitySummaryElement = document.getElementById("complexity-summary");

// ==================== APPLICATION STATE ====================

let originalArray = [];
let steps = [];
let currentStepIndex = 0;

let isPlaying = false;
let isSortingComplete = false;
let animationTimer = null;
let runToken = 0;

// ==================== ALGORITHM INFORMATION ====================

const algorithmInformation = {
    bubble: {
        name: "Bubble Sort",
        description:
            "Bubble Sort repeatedly compares adjacent elements and swaps them when they are in the wrong order. After each pass, the largest remaining element reaches its correct position.",
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
        bestExplanation:
            "With an already sorted array, an optimized Bubble Sort finishes after one pass.",
        averageExplanation:
            "Repeated passes compare neighboring elements across the array.",
        worstExplanation:
            "A reverse-ordered array can require many comparisons and swaps.",
        summary:
            "Bubble Sort is easy to understand, but its quadratic average and worst-case time make it inefficient for large arrays.",
        pseudocode: [
            "procedure bubbleSort(A)",
            "    n = length(A)",
            "    for i = 0 to n - 2",
            "        swapped = false",
            "        for j = 0 to n - i - 2",
            "            if A[j] > A[j + 1]",
            "                swap A[j], A[j + 1]",
            "                swapped = true",
            "        if swapped == false",
            "            break",
            "    return A"
        ]
    },

    selection: {
        name: "Selection Sort",
        description:
            "Selection Sort finds the smallest element in the unsorted portion and swaps it into the next position in the sorted portion.",
        best: "O(n²)",
        average: "O(n²)",
        worst: "O(n²)",
        bestExplanation:
            "Even if the array is already sorted, the algorithm still searches each remaining portion.",
        averageExplanation:
            "It repeatedly scans the unsorted portion to find its minimum.",
        worstExplanation:
            "The number of comparisons remains quadratic for all input arrangements.",
        summary:
            "Selection Sort performs relatively few swaps, but it still uses O(n²) comparisons in every case.",
        pseudocode: [
            "procedure selectionSort(A)",
            "    n = length(A)",
            "    for i = 0 to n - 2",
            "        minIndex = i",
            "        for j = i + 1 to n - 1",
            "            if A[j] < A[minIndex]",
            "                minIndex = j",
            "        if minIndex != i",
            "            swap A[i], A[minIndex]",
            "    return A"
        ]
    },

    insertion: {
        name: "Insertion Sort",
        description:
            "Insertion Sort builds a sorted portion from left to right. Each new element is inserted into its correct position by shifting larger elements to the right.",
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
        bestExplanation:
            "An already sorted array requires only one comparison for each new element.",
        averageExplanation:
            "Elements typically need to be compared with and shifted past part of the sorted portion.",
        worstExplanation:
            "A reverse-ordered array requires many shifts to insert each element.",
        summary:
            "Insertion Sort works well for small or nearly sorted arrays, but its average and worst-case time are quadratic.",
        pseudocode: [
            "procedure insertionSort(A)",
            "    n = length(A)",
            "    for i = 1 to n - 1",
            "        key = A[i]",
            "        j = i - 1",
            "        while j >= 0 and A[j] > key",
            "            A[j + 1] = A[j]",
            "            j = j - 1",
            "        A[j + 1] = key",
            "    return A"
        ]
    },

    merge: {
        name: "Merge Sort",
        description:
            "Merge Sort divides the array into smaller halves, sorts those halves recursively, and merges the sorted halves into a single sorted array.",
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
        bestExplanation:
            "The array is repeatedly divided into halves and the results are merged.",
        averageExplanation:
            "The divide-and-merge process has logarithmic levels and linear work per level.",
        worstExplanation:
            "The algorithm maintains O(n log n) time regardless of the initial ordering.",
        summary:
            "Merge Sort offers predictable O(n log n) time, using additional memory to merge elements.",
        pseudocode: [
            "procedure mergeSort(A, left, right)",
            "    if left >= right",
            "        return",
            "    mid = floor((left + right) / 2)",
            "    mergeSort(A, left, mid)",
            "    mergeSort(A, mid + 1, right)",
            "    merge(A, left, mid, right)",
            "",
            "procedure merge(A, left, mid, right)",
            "    copy left and right halves",
            "    compare the next elements",
            "    copy the smaller element to A",
            "    copy any remaining elements"
        ]
    },

    quick: {
        name: "Quick Sort",
        description:
            "Quick Sort chooses a pivot, partitions the array around that pivot, and recursively sorts the portions on either side.",
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n²)",
        bestExplanation:
            "Balanced partitions create approximately logarithmic recursion depth.",
        averageExplanation:
            "Typical partitions produce O(n log n) expected running time.",
        worstExplanation:
            "Repeatedly unbalanced partitions can cause quadratic running time.",
        summary:
            "Quick Sort is usually fast in practice, but its worst-case time is O(n²) with poor pivot partitions.",
        pseudocode: [
            "procedure quickSort(A, low, high)",
            "    if low < high",
            "        pivotIndex = partition(A, low, high)",
            "        quickSort(A, low, pivotIndex - 1)",
            "        quickSort(A, pivotIndex + 1, high)",
            "",
            "procedure partition(A, low, high)",
            "    pivot = A[high]",
            "    i = low - 1",
            "    for j = low to high - 1",
            "        if A[j] <= pivot",
            "            i = i + 1",
            "            swap A[i], A[j]",
            "    swap A[i + 1], A[high]",
            "    return i + 1"
        ]
    }
};

// ==================== RANDOM ARRAY GENERATION ====================

function generateRandomArray(size) {
    const array = [];

    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 90) + 10);
    }

    return array;
}

// ==================== STEP RECORDER ====================

function createStepRecorder(initialArray) {
    const recordedSteps = [];

    let comparisons = 0;
    let swaps = 0;

    function record(
        array,
        type,
        activeIndices = [],
        sortedIndices = [],
        message = "",
        lineIndex = -1,
        extra = {}
    ) {
        recordedSteps.push({
            array: [...array],
            type,
            activeIndices: [...activeIndices],
            sortedIndices: [...sortedIndices],
            comparisons,
            swaps,
            message,
            lineIndex,
            ...extra
        });
    }

    record(
        initialArray,
        "initial",
        [],
        [],
        "The array is ready. Start sorting or move forward one step at a time.",
        -1
    );

    return {
        steps: recordedSteps,

        compare(array, firstIndex, secondIndex, message, lineIndex) {
            comparisons++;

            record(
                array,
                "compare",
                [firstIndex, secondIndex],
                [],
                message,
                lineIndex
            );
        },

        swap(array, firstIndex, secondIndex, message, lineIndex) {
            [array[firstIndex], array[secondIndex]] =
                [array[secondIndex], array[firstIndex]];

            swaps++;

            record(
                array,
                "swap",
                [firstIndex, secondIndex],
                [],
                message,
                lineIndex
            );
        },

        write(array, index, value, message, lineIndex, activeIndices = [index]) {
            array[index] = value;

            record(
                array,
                "write",
                activeIndices,
                [],
                message,
                lineIndex
            );
        },

        mark(array, indices, message, lineIndex = -1) {
            record(
                array,
                "mark",
                indices,
                indices,
                message,
                lineIndex
            );
        },

        note(array, message, lineIndex = -1, activeIndices = []) {
            record(
                array,
                "note",
                activeIndices,
                [],
                message,
                lineIndex
            );
        },

        finish(array, message) {
            record(
                array,
                "finished",
                [],
                array.map((_, index) => index),
                message,
                -1
            );
        }
    };
}

// ==================== BUBBLE SORT ====================

function buildBubbleSortSteps(inputArray) {
    const array = [...inputArray];
    const recorder = createStepRecorder(array);
    const sortedIndices = new Set();
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        recorder.note(
            array,
            `Pass ${i + 1}: find the largest element in the remaining unsorted portion.`,
            2
        );

        for (let j = 0; j < n - i - 1; j++) {
            recorder.compare(
                array,
                j,
                j + 1,
                `Compare ${array[j]} and ${array[j + 1]}.`,
                5
            );

            if (array[j] > array[j + 1]) {
                recorder.swap(
                    array,
                    j,
                    j + 1,
                    `Swap ${array[j + 1]} and ${array[j]} because they are in the wrong order.`,
                    6
                );

                swapped = true;
            } else {
                recorder.note(
                    array,
                    `${array[j]} is not greater than ${array[j + 1]}, so no swap is needed.`,
                    5,
                    [j, j + 1]
                );
            }
        }

        sortedIndices.add(n - i - 1);

        recorder.mark(
            array,
            [...sortedIndices],
            `${array[n - i - 1]} is now in its final position.`,
            2
        );

        if (!swapped) {
            for (let index = 0; index < n - i - 1; index++) {
                sortedIndices.add(index);
            }

            recorder.mark(
                array,
                [...sortedIndices],
                "No swaps occurred during this pass. The array is sorted.",
                8
            );

            break;
        }
    }

    recorder.finish(array, "Bubble Sort has finished. The array is sorted.");
    return recorder.steps;
}

// ==================== SELECTION SORT ====================

function buildSelectionSortSteps(inputArray) {
    const array = [...inputArray];
    const recorder = createStepRecorder(array);
    const sortedIndices = new Set();
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        recorder.note(
            array,
            `Find the minimum element in the unsorted portion starting at index ${i}.`,
            2,
            [i]
        );

        for (let j = i + 1; j < n; j++) {
            recorder.compare(
                array,
                j,
                minIndex,
                `Compare ${array[j]} with the current minimum ${array[minIndex]}.`,
                4
            );

            if (array[j] < array[minIndex]) {
                minIndex = j;

                recorder.note(
                    array,
                    `${array[minIndex]} is the new minimum.`,
                    5,
                    [minIndex]
                );
            }
        }

        if (minIndex !== i) {
            const firstValue = array[i];
            const secondValue = array[minIndex];

            recorder.swap(
                array,
                i,
                minIndex,
                `Place the minimum ${secondValue} at index ${i}, swapping it with ${firstValue}.`,
                8
            );
        } else {
            recorder.note(
                array,
                `${array[i]} is already the minimum at this position. No swap is needed.`,
                7,
                [i]
            );
        }

        sortedIndices.add(i);

        recorder.mark(
            array,
            [...sortedIndices],
            `Index ${i} is now part of the sorted portion.`,
            2
        );
    }

    for (let i = 0; i < n; i++) {
        sortedIndices.add(i);
    }

    recorder.mark(array, [...sortedIndices], "All elements are in sorted order.");
    recorder.finish(array, "Selection Sort has finished. The array is sorted.");

    return recorder.steps;
}

// ==================== INSERTION SORT ====================

function buildInsertionSortSteps(inputArray) {
    const array = [...inputArray];
    const recorder = createStepRecorder(array);
    const n = array.length;

    recorder.mark(
        array,
        [0],
        "The first element is treated as a sorted portion.",
        2
    );

    for (let i = 1; i < n; i++) {
        const key = array[i];
        let j = i - 1;

        recorder.note(
            array,
            `Insert ${key} into the correct position in the sorted portion.`,
            3,
            [i]
        );

        recorder.note(array, `The value to insert is ${key}.`, 4, [i]);

        while (j >= 0) {
            recorder.compare(
                array,
                j,
                i,
                `Compare ${array[j]} with the key ${key}.`,
                6
            );

            if (array[j] > key) {
                recorder.write(
                    array,
                    j + 1,
                    array[j],
                    `Shift ${array[j]} one position to the right.`,
                    7,
                    [j, j + 1]
                );

                j--;
            } else {
                recorder.note(
                    array,
                    `${array[j]} is not greater than ${key}. The insertion position has been found.`,
                    6,
                    [j, i]
                );

                break;
            }
        }

        recorder.write(
            array,
            j + 1,
            key,
            `Insert ${key} at index ${j + 1}.`,
            9,
            [j + 1]
        );

        recorder.mark(
            array,
            Array.from({ length: i + 1 }, (_, index) => index),
            `The first ${i + 1} elements are now sorted.`,
            2
        );
    }

    recorder.finish(array, "Insertion Sort has finished. The array is sorted.");
    return recorder.steps;
}

// ==================== MERGE SORT ====================

function buildMergeSortSteps(inputArray) {
    const array = [...inputArray];
    const recorder = createStepRecorder(array);

    function mergeSort(left, right) {
        if (left >= right) {
            recorder.note(
                array,
                `Index range ${left} to ${right} contains at most one element. It is already sorted.`,
                1,
                [left]
            );

            return;
        }

        const mid = Math.floor((left + right) / 2);

        recorder.note(
            array,
            `Divide the range ${left}–${right} into ${left}–${mid} and ${mid + 1}–${right}.`,
            3,
            [left, mid, right]
        );

        mergeSort(left, mid);
        mergeSort(mid + 1, right);
        merge(left, mid, right);
    }

    function merge(left, mid, right) {
        const leftPart = array.slice(left, mid + 1);
        const rightPart = array.slice(mid + 1, right + 1);

        recorder.note(
            array,
            `Merge the sorted ranges ${left}–${mid} and ${mid + 1}–${right}.`,
            6,
            [left, mid, right]
        );

        let i = 0;
        let j = 0;
        let k = left;

        while (i < leftPart.length && j < rightPart.length) {
            recorder.compare(
                array,
                left + i,
                mid + 1 + j,
                `Compare ${leftPart[i]} and ${rightPart[j]} while merging.`,
                9
            );

            if (leftPart[i] <= rightPart[j]) {
                recorder.write(
                    array,
                    k,
                    leftPart[i],
                    `Write ${leftPart[i]} into index ${k}.`,
                    10,
                    [k]
                );

                i++;
            } else {
                recorder.write(
                    array,
                    k,
                    rightPart[j],
                    `Write ${rightPart[j]} into index ${k}.`,
                    10,
                    [k]
                );

                j++;
            }

            k++;
        }

        while (i < leftPart.length) {
            recorder.write(
                array,
                k,
                leftPart[i],
                `Copy remaining value ${leftPart[i]} into index ${k}.`,
                11,
                [k]
            );

            i++;
            k++;
        }

        while (j < rightPart.length) {
            recorder.write(
                array,
                k,
                rightPart[j],
                `Copy remaining value ${rightPart[j]} into index ${k}.`,
                11,
                [k]
            );

            j++;
            k++;
        }

        recorder.note(
            array,
            `The range ${left}–${right} is now merged in sorted order.`,
            6,
            Array.from({ length: right - left + 1 }, (_, index) => left + index)
        );
    }

    mergeSort(0, array.length - 1);

    recorder.finish(array, "Merge Sort has finished. The array is sorted.");
    return recorder.steps;
}

// ==================== QUICK SORT ====================

function buildQuickSortSteps(inputArray) {
    const array = [...inputArray];
    const recorder = createStepRecorder(array);
    const sortedIndices = new Set();

    function quickSort(low, high) {
        if (low > high) {
            return;
        }

        if (low === high) {
            sortedIndices.add(low);

            recorder.mark(
                array,
                [...sortedIndices],
                `The single element ${array[low]} is already in its final position.`,
                1
            );

            return;
        }

        const pivotIndex = partition(low, high);

        sortedIndices.add(pivotIndex);

        recorder.mark(
            array,
            [...sortedIndices],
            `Pivot ${array[pivotIndex]} is now in its final position at index ${pivotIndex}.`,
            3
        );

        quickSort(low, pivotIndex - 1);
        quickSort(pivotIndex + 1, high);
    }

    function partition(low, high) {
        const pivot = array[high];
        let i = low - 1;

        recorder.note(
            array,
            `Choose ${pivot} at index ${high} as the pivot.`,
            8,
            [high]
        );

        for (let j = low; j < high; j++) {
            recorder.compare(
                array,
                j,
                high,
                `Compare ${array[j]} with pivot ${pivot}.`,
                11
            );

            if (array[j] <= pivot) {
                i++;

                if (i !== j) {
                    const leftValue = array[i];
                    const rightValue = array[j];

                    recorder.swap(
                        array,
                        i,
                        j,
                        `Move ${rightValue} to the left side of the pivot, swapping with ${leftValue}.`,
                        13
                    );
                } else {
                    recorder.note(
                        array,
                        `${array[j]} already belongs on the left side of the pivot.`,
                        12,
                        [j]
                    );
                }
            }
        }

        if (i + 1 !== high) {
            const leftValue = array[i + 1];
            const pivotValue = array[high];

            recorder.swap(
                array,
                i + 1,
                high,
                `Place pivot ${pivotValue} at index ${i + 1}, swapping with ${leftValue}.`,
                14
            );
        } else {
            recorder.note(
                array,
                `Pivot ${pivot} is already in its correct position.`,
                14,
                [high]
            );
        }

        return i + 1;
    }

    quickSort(0, array.length - 1);

    recorder.finish(array, "Quick Sort has finished. The array is sorted.");
    return recorder.steps;
}

// ============================================================
// END OF PART 1
// Continue with Part 2 immediately below this code.
// ============================================================

// ============================================================
// SortLab - Sorting Algorithm Visualizer
// PART 2 OF 2
// Rendering, controls, playback, and initialization
// ============================================================

// ==================== BUILD SELECTED ALGORITHM ====================

function buildSortingSteps(array) {
    switch (algorithmSelect.value) {
        case "bubble":
            return buildBubbleSortSteps(array);

        case "selection":
            return buildSelectionSortSteps(array);

        case "insertion":
            return buildInsertionSortSteps(array);

        case "merge":
            return buildMergeSortSteps(array);

        case "quick":
            return buildQuickSortSteps(array);

        default:
            return buildBubbleSortSteps(array);
    }
}

// ==================== ALGORITHM INFORMATION ====================

function updateAlgorithmInfo() {
    const info = algorithmInformation[algorithmSelect.value];

    if (!info) {
        return;
    }

    visualizerTitle.textContent = info.name;
    algorithmTitle.textContent = info.name;
    algorithmDescription.textContent = info.description;

    bestCaseElement.textContent = info.best;
    averageCaseElement.textContent = info.average;
    worstCaseElement.textContent = info.worst;

    bestExplanationElement.textContent = info.bestExplanation;
    averageExplanationElement.textContent = info.averageExplanation;
    worstExplanationElement.textContent = info.worstExplanation;
    complexitySummaryElement.textContent = info.summary;

    renderPseudocode(-1);
}

// ==================== PSEUDOCODE RENDERING ====================

function renderPseudocode(activeLineIndex = -1) {
    const info = algorithmInformation[algorithmSelect.value];

    if (!info) {
        return;
    }

    const codeElement = pseudocodeElement.querySelector("code");
    const target = codeElement || pseudocodeElement;

    // Replace only the pseudocode contents.
    // Do not call scrollIntoView() here: it can move the entire page.
    target.replaceChildren();

    info.pseudocode.forEach((line, index) => {
        const lineElement = document.createElement("span");

        lineElement.className = "pseudocode-line";
        lineElement.textContent = line || " ";
        lineElement.dataset.lineIndex = String(index);

        if (index === activeLineIndex) {
            lineElement.classList.add("active");
            lineElement.setAttribute("aria-current", "step");
        }

        target.appendChild(lineElement);
    });
}

// ==================== RENDER ARRAY ====================

function renderArray(
    array,
    activeIndices = [],
    sortedIndices = [],
    type = "initial"
) {
    arrayContainer.replaceChildren();

    if (!array.length) {
        return;
    }

    const maximum = Math.max(...array, 1);
    const minimum = Math.min(...array);
    const showValues = array.length <= 25;

    arrayContainer.setAttribute(
        "aria-label",
        `Array visualization with ${array.length} elements.`
    );

    array.forEach((value, index) => {
        const bar = document.createElement("div");

        bar.className = "array-bar";
        bar.style.height = `${Math.max(5, (value / maximum) * 100)}%`;
        bar.style.width = `${100 / array.length}%`;
        bar.title = `Index ${index}: ${value}`;
        bar.dataset.index = String(index);
        bar.setAttribute("aria-label", `Index ${index}, value ${value}`);

        if (sortedIndices.includes(index)) {
            bar.classList.add("sorted");
        } else if (activeIndices.includes(index)) {
            if (type === "swap") {
                bar.classList.add("swapping");
            } else {
                bar.classList.add("comparing");
            }
        }

        if (showValues) {
            const valueLabel = document.createElement("span");

            valueLabel.textContent = String(value);
            valueLabel.style.position = "absolute";
            valueLabel.style.left = "50%";
            valueLabel.style.top = "-22px";
            valueLabel.style.transform = "translateX(-50%)";
            valueLabel.style.fontSize = "10px";
            valueLabel.style.fontWeight = "700";
            valueLabel.style.color = "var(--text-primary)";
            valueLabel.style.whiteSpace = "nowrap";

            bar.appendChild(valueLabel);
        }

        arrayContainer.appendChild(bar);
    });
}

// ==================== STATISTICS ====================

function updateStatistics(step) {
    comparisonsElement.textContent = step.comparisons;
    swapsElement.textContent = step.swaps;
    totalElementsElement.textContent = step.array.length;
}

// ==================== STATUS ====================

function updateStatus(message) {
    statusElement.textContent = message;
}

// ==================== DISPLAY CURRENT STEP ====================

function displayStep(index) {
    if (!steps.length) {
        return;
    }

    currentStepIndex = Math.max(0, Math.min(index, steps.length - 1));

    const step = steps[currentStepIndex];

    renderArray(
        step.array,
        step.activeIndices,
        step.sortedIndices,
        step.type
    );

    updateStatistics(step);

    currentOperation.textContent = step.message;

    renderPseudocode(step.lineIndex);

    if (step.type === "finished") {
        isSortingComplete = true;
        updateStatus("Completed");
    } else if (isPlaying) {
        updateStatus("Sorting...");
    } else if (currentStepIndex === 0) {
        updateStatus("Ready");
    } else {
        updateStatus("Paused");
    }

    stepButton.disabled =
        isPlaying ||
        isSortingComplete ||
        currentStepIndex >= steps.length - 1;

    pauseButton.disabled = !isPlaying;
    startButton.disabled = isPlaying || isSortingComplete;

    startButton.textContent =
        currentStepIndex > 0 && !isSortingComplete
            ? "Resume Sorting"
            : "Start Sorting";
}

// ==================== PREPARE SORTING ====================

function prepareSorting() {
    stopAnimation();

    steps = buildSortingSteps(originalArray);
    currentStepIndex = 0;
    isPlaying = false;
    isSortingComplete = false;

    displayStep(0);
}

// ==================== GENERATE NEW ARRAY ====================

function createNewArray() {
    stopAnimation();

    const size = Number(arraySizeSlider.value);

    arraySizeValue.textContent = String(size);
    totalElementsElement.textContent = String(size);

    originalArray = generateRandomArray(size);

    prepareSorting();

    currentOperation.textContent =
        "A new random array is ready. Start sorting or use Step Forward to explore each operation.";
}

// ==================== RESET ====================

function resetToOriginal() {
    stopAnimation();

    isPlaying = false;
    isSortingComplete = false;

    steps = buildSortingSteps(originalArray);
    currentStepIndex = 0;

    displayStep(0);

    currentOperation.textContent =
        "Array reset. Start sorting or move forward one step at a time.";
}

// ==================== ANIMATION SPEED ====================

function getAnimationDelay() {
    switch (speedSelect.value) {
        case "slow":
            return 1000;

        case "fast":
            return 120;

        case "medium":
        default:
            return 450;
    }
}

// ==================== STOP ANIMATION TIMER ====================

function stopAnimation() {
    runToken++;

    if (animationTimer !== null) {
        clearTimeout(animationTimer);
        animationTimer = null;
    }

    isPlaying = false;
}

// ==================== PAUSE SORTING ====================

function pauseSorting() {
    if (!isPlaying) {
        return;
    }

    stopAnimation();

    updateStatus("Paused");

    pauseButton.disabled = true;
    startButton.disabled = isSortingComplete;
    startButton.textContent = "Resume Sorting";

    stepButton.disabled =
        isSortingComplete ||
        currentStepIndex >= steps.length - 1;
}

// ==================== FINISH SORTING ====================

function finishSorting() {
    stopAnimation();

    if (steps.length) {
        displayStep(steps.length - 1);
    }

    isPlaying = false;
    isSortingComplete = true;

    updateStatus("Completed");

    startButton.disabled = true;
    startButton.textContent = "Sorting Complete";
    pauseButton.disabled = true;
    stepButton.disabled = true;
}

// ==================== PLAY ANIMATION ====================

function playAnimation(token) {
    if (!isPlaying || token !== runToken) {
        return;
    }

    if (currentStepIndex >= steps.length - 1) {
        finishSorting();
        return;
    }

    displayStep(currentStepIndex + 1);

    if (currentStepIndex >= steps.length - 1) {
        finishSorting();
        return;
    }

    animationTimer = setTimeout(() => {
        playAnimation(token);
    }, getAnimationDelay());
}

// ==================== START OR RESUME SORTING ====================

function startSorting() {
    if (isPlaying || isSortingComplete) {
        return;
    }

    if (!steps.length) {
        prepareSorting();
    }

    if (currentStepIndex >= steps.length - 1) {
        return;
    }

    isPlaying = true;

    startButton.disabled = true;
    pauseButton.disabled = false;
    stepButton.disabled = true;

    updateStatus("Sorting...");

    const token = ++runToken;

    animationTimer = setTimeout(() => {
        playAnimation(token);
    }, getAnimationDelay());
}

// ==================== STEP FORWARD ====================

function stepForward() {
    if (isPlaying || isSortingComplete) {
        return;
    }

    if (!steps.length) {
        prepareSorting();
    }

    if (currentStepIndex < steps.length - 1) {
        displayStep(currentStepIndex + 1);
    }

    if (currentStepIndex >= steps.length - 1) {
        finishSorting();
    }
}

// ==================== EVENT LISTENERS ====================

// Change algorithm and rebuild the step sequence.
algorithmSelect.addEventListener("change", () => {
    updateAlgorithmInfo();
    prepareSorting();
});

// Update the displayed size while moving the slider.
// Generate the array when the slider is released/changed.
arraySizeSlider.addEventListener("input", () => {
    arraySizeValue.textContent = arraySizeSlider.value;
    totalElementsElement.textContent = arraySizeSlider.value;
});

arraySizeSlider.addEventListener("change", () => {
    createNewArray();
});

// Generate a fresh random array.
generateButton.addEventListener("click", () => {
    createNewArray();
});

// Start or resume playback.
startButton.addEventListener("click", () => {
    startSorting();
});

// Pause playback.
pauseButton.addEventListener("click", () => {
    pauseSorting();
});

// Move forward one recorded operation.
stepButton.addEventListener("click", () => {
    stepForward();
});

// Reset to the original unsorted array.
resetButton.addEventListener("click", () => {
    resetToOriginal();
});

// ==================== INITIALIZE APPLICATION ====================

function initializeSortLab() {
    updateAlgorithmInfo();

    arraySizeValue.textContent = arraySizeSlider.value;

    originalArray = generateRandomArray(Number(arraySizeSlider.value));

    prepareSorting();

    updateStatus("Ready");

    currentOperation.textContent =
        "Your array is ready. Start sorting or select Step Forward to explore how the algorithm works.";
}

initializeSortLab();

// ============================================================
// END OF SORTLAB SCRIPT
// ============================================================
