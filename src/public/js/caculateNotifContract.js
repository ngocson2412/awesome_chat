function increaseNumberNotiContact(className) {
    let currentValue = +$(`.${className}`).find("em").text() // chuyen string sang number
    currentValue +=1

    if(currentValue === 0) {
        $(`.${className}`).html("")
    }else {
        $(`.${className}`).html(`(<em>${currentValue}</em>)`)
    }
}
function decreaseNumberNotiContact(className) {
    let currentValue = +$(`.${className}`).find("em").text() // chuyen string sang number
    currentValue -=1

    if(currentValue === 0) {
        $(`.${className}`).html("")
    }else {
        $(`.${className}`).html(`(<em>${currentValue}</em>)`)
    }
}
