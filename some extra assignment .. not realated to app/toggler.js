// Write a program for toggling in the following manner
// example code

function toggler() {
    console.log(...arguments)
}

const toggle = toggler(1,2,3)
console.log('toggle:', toggle)

// toggle()
// 1
// toggle()
// 2
// toggle()
// 3