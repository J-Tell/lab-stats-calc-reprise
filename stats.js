function readAllNumbers() {
    var textArea = document.querySelector("textarea");
    var lines = textArea.value.split("\n");
    var numbers = [];
    //Step 4: update to handle multiple numbers on one line
    for (var i = 0; i < lines.length; i++) {
        if (lines[i] === "")
            continue;
        var li = lines[i].split(" ");
        for (var _i = 0, li_1 = li; _i < li_1.length; _i++) {
            var l = li_1[_i];
            if (isNaN(Number(l)))
                continue;
            numbers.push(Number(l));
        }
    }
    return numbers;
}
function getMean(nums) {
    var sum = 0;
    for (var _i = 0, nums_1 = nums; _i < nums_1.length; _i++) {
        var n = nums_1[_i];
        sum += n;
    }
    return sum / nums.length;
}
function getAboveBelowMean(nums) {
    var mean = getMean(nums);
    var aboveCount = 0;
    var belowCount = 0;
    for (var _i = 0, nums_2 = nums; _i < nums_2.length; _i++) {
        var n = nums_2[_i];
        if (n < mean)
            belowCount++;
        else if (n > mean)
            aboveCount++;
    }
    return [aboveCount, belowCount];
}
function getMedian(nums) {
    //Step 1
    if (nums.length % 2 == 1) {
        return nums[Math.floor(nums.length / 2)];
    }
    var right = Math.floor(nums.length / 2);
    var left = right - 1;
    return (nums[left] + nums[right]) / 2;
}
function getMinMax(nums) {
    //Step 2
    var min = nums[0];
    var max = nums[nums.length - 1];
    return [min, max];
}
function getStdDev(nums) {
    //Step 3
    var average_mean = 0;
    var mean = getMean(nums);
    for (var _i = 0, nums_3 = nums; _i < nums_3.length; _i++) {
        var n = nums_3[_i];
        var squared_mean = Math.pow((mean - n), 2);
        average_mean += squared_mean;
    }
    return Math.sqrt(average_mean / nums.length);
}
var basicStatsAnalyzeButton = document.querySelector("button#analyze");
basicStatsAnalyzeButton.addEventListener("click", function () {
    var numbers = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function (a, b) { return a - b; });
    document.querySelector("#mean").textContent = "".concat(getMean(numbers));
    document.querySelector("#aboveBelow").textContent = "".concat(getAboveBelowMean(numbers).join(" & "));
    document.querySelector("#median").textContent = "".concat(getMedian(numbers));
    document.querySelector("#minMax").textContent = "".concat(getMinMax(numbers).join(" & "));
    document.querySelector("#stdDev").textContent = "".concat(getStdDev(numbers));
});
function getLeastCommonMultiple(nums) {
    nums.sort();
    var largest = nums[nums.length - 1];
    while (true) {
        var divisible = true;
        for (var _i = 0, nums_4 = nums; _i < nums_4.length; _i++) {
            var int = nums_4[_i];
            var ahhh = largest % int;
            if (ahhh != 0) {
                divisible = false;
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
function getAllCommonFactors(nums) {
    nums.sort();
    var smallest = nums[0];
    var common_factors = [];
    //return [NaN];
    while (smallest != 0) {
        var common = true;
        for (var _i = 0, nums_5 = nums; _i < nums_5.length; _i++) { // work imside
            var i = nums_5[_i];
            //let oh_no = i / smallest
            var gahhh = i % smallest;
            if (gahhh != 0) {
                common = false;
                break;
            }
        }
        // varaible to track
        if (common == true) {
            common_factors.push(smallest);
        }
        smallest--;
    }
    return common_factors;
}
var advancedStatsAnalyzeButton = document.querySelector("button#analyze-advanced");
advancedStatsAnalyzeButton.addEventListener("click", function () {
    var numbers = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function (a, b) { return a - b; });
    document.querySelector("#lcm").textContent = "".concat(getLeastCommonMultiple(numbers));
    document.querySelector("#factors").textContent = "".concat(getAllCommonFactors(numbers).join(", "));
});
