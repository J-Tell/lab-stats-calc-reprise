function readAllNumbers() : number[] {
    let textArea = document.querySelector("textarea") as HTMLTextAreaElement;
    let lines : string[] = textArea.value.split("\n");
    let numbers : number[] = [];
    //Step 4: update to handle multiple numbers on one line

    for (let i = 0; i < lines.length; i++){
        if (lines[i] === "")
            continue;
        let li : string[] = lines[i].split(" ")
        for (let l of li) {
            if (isNaN(Number(l)))
                continue;
            numbers.push(Number(l))
        }
    }
    return numbers;
}

function getMean( nums  : number[]) : number {
    let sum = 0;
    for (const n of nums){
        sum += n;
    }
    return sum / nums.length;
}

function getAboveBelowMean(nums : number[]) : [number, number] {
    let mean = getMean(nums);
    let aboveCount = 0;
    let belowCount = 0;
    for (const n of nums){
        if (n < mean)
            belowCount++;
        else if (n > mean)
            aboveCount++;
    }
    return [aboveCount, belowCount];
}

function getMedian(nums : number[]) : number {
    //Step 1
    if (nums.length % 2 == 1) {
        return nums[Math.floor(nums.length / 2)]
    }
    let right : number = Math.floor(nums.length / 2)
    let left : number = right - 1

    return (nums[left] + nums[right] ) / 2
}

function getMinMax(nums : number[]) : [number, number] {
    //Step 2
    let min = nums[0]
    let max = nums[nums.length-1]
    return [min, max];
}

function getStdDev(nums : number[]) : number {
    //Step 3
    let average_mean = 0
    let mean : number = getMean(nums)
    for (let n of nums) {
        let squared_mean : number = (mean - n) ** 2
        average_mean += squared_mean
    }
    return Math.sqrt(average_mean / nums.length)
}

let basicStatsAnalyzeButton = document.querySelector("button#analyze") as HTMLButtonElement;
basicStatsAnalyzeButton.addEventListener("click", function () {
    let numbers : number[] = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function(a,b){ return a - b });

    (document.querySelector("#mean") as HTMLElement).textContent = `${getMean(numbers)}`;    
    (document.querySelector("#aboveBelow") as HTMLElement).textContent = `${getAboveBelowMean(numbers).join(" & ")}`;
    (document.querySelector("#median") as HTMLElement).textContent = `${getMedian(numbers)}`;
    (document.querySelector("#minMax") as HTMLElement).textContent = `${getMinMax(numbers).join(" & ")}`;
    (document.querySelector("#stdDev") as HTMLElement).textContent = `${getStdDev(numbers)}`;
});

function getLeastCommonMultiple(nums : number[]) : number {
    nums.sort()
    let largest = nums[nums.length - 1]
    while (true) {
        let divisible : boolean = true
        for (let int of nums) {
            let remainder = largest % int
            if (remainder != 0) {
                divisible = false
                break;
            }
        }
        if (divisible == true) {
            break;
        }
        largest++;
    }
    return largest;
}

function getAllCommonFactors(nums : number[]) : number[] {
    nums.sort()
    let smallest = nums[0]
    let common_factors : number[] = []
    while (smallest != 0) {
        let common = true
        for (let i of nums) {
            let remain = i % smallest
            if (remain != 0) {
                common = false
                break;
            }
        }
        if (common == true) {
            common_factors.push(smallest)
        }
        smallest--
    }
    return common_factors;
}

let advancedStatsAnalyzeButton = document.querySelector("button#analyze-advanced") as HTMLButtonElement;
advancedStatsAnalyzeButton.addEventListener("click", function () {
    let numbers : number[] = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function(a,b){ return a - b });

    (document.querySelector("#lcm") as HTMLElement).textContent = `${getLeastCommonMultiple(numbers)}`;
    (document.querySelector("#factors") as HTMLElement).textContent = `${getAllCommonFactors(numbers).join(", ")}`;
});