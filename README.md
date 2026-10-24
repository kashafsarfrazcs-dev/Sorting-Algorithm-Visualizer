# Sorting Algorithm Visualizer

An interactive web application that visualizes popular sorting algorithms through step-by-step animations. SortLab helps students understand how sorting algorithms work by observing comparisons, swaps, and array transformations.

## Features

- Visualize Bubble Sort
- Visualize Selection Sort
- Visualize Insertion Sort
- Visualize Merge Sort
- Visualize Quick Sort
- Generate arrays for sorting
- Adjust array size and animation speed
- Start, pause, step through, and reset sorting
- Track comparisons and swaps
- View algorithm pseudocode and time complexity
- Responsive interface with a dark theme

---

## How the Sorting Algorithms Work

### 1. Bubble Sort
Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order. After each pass, the largest unsorted element moves toward the end of the array.

- Best Case: O(n) with early-exit optimization
- Average Case: O(n²)
- Worst Case: O(n²)

### 2. Selection Sort
Selection Sort finds the smallest element in the unsorted portion of the array and swaps it with the first unsorted element. This process continues until the array is sorted.

- Best Case: O(n²)
- Average Case: O(n²)
- Worst Case: O(n²)

### 3. Insertion Sort
Insertion Sort builds a sorted portion of the array one element at a time. Each new element is inserted into its correct position among the previously sorted elements.

- Best Case: O(n)
- Average Case: O(n²)
- Worst Case: O(n²)

### 4. Merge Sort
Merge Sort uses the divide-and-conquer technique. It divides the array into smaller halves, sorts each half recursively, and merges the sorted halves into a single sorted array.

- Best Case: O(n log n)
- Average Case: O(n log n)
- Worst Case: O(n log n)

### 5. Quick Sort
Quick Sort selects a pivot element and partitions the array so that smaller elements go to one side and larger elements go to the other. It then recursively sorts the partitions.

- Best Case: O(n log n)
- Average Case: O(n log n)
- Worst Case: O(n²)

## Complexity Notation

- **O(1):** Constant time
- **O(n):** Linear time
- **O(n²):** Quadratic time
- **O(n log n):** Linearithmic time

Here, `n` represents the number of elements in the array. Actual performance depends on the algorithm implementation and the input data.

---

## Technologies Used

- HTML5
- CSS3
- JavaScript

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/kashafsarfrazcs-dev/Sorting-Algorithm-Visualizer.git
   ```

2. Open the project folder:

   ```bash
   cd Sorting-Algorithm-Visualizer
   ```

3. Open `index.html` in your browser, or use the Live Server extension in Visual Studio Code.

## Sorting Algorithms

| Algorithm | Best Case | Average Case | Worst Case |
|---|---|---|---|
| Bubble Sort | O(n) | O(n²) | O(n²) |
| Selection Sort | O(n²) | O(n²) | O(n²) |
| Insertion Sort | O(n) | O(n²) | O(n²) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) |

*Complexities assume the standard implementations; Bubble Sort's best case assumes an early-exit optimization.*

## Project Structure

```text
Sorting-Algorithm-Visualizer/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Learning Objectives

- Understand sorting algorithm behavior
- Compare algorithm time complexities
- Observe array comparisons and swaps
- Practise Data Structures and Algorithms concepts

---

## Live Demo

https://sorting-algorithm-visualizer-seven-liard.vercel.app/

---
## Author

**Kashaf Sarfraz**

GitHub: [kashafsarfrazcs-dev](https://github.com/kashafsarfrazcs-dev)

## License

This project is available for educational and learning purposes.
