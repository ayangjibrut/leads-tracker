let leadsArray = []

// const inputEl = document.querySelector("#input-el")
// const saveBtn = document.querySelector("#save-btn")
const listEl = document.querySelector("#list-el")
const clearLeadsBtn = document.querySelector("#clear-btn")
const getUrlBtn = document.querySelector("#get-url-btn")

const getLeadsArray = JSON.parse(localStorage.getItem("leadsArray"))

if (getLeadsArray) {
    leadsArray = getLeadsArray
    renderListItem()
}

function renderListItem() {
    listEl.innerHTML = ""
    leadsArray.forEach(function(lead) {
        listEl.innerHTML += `
            <li>
                <a target="_blank" href="http//${lead}">${lead}</a>
            </li>
        `
    })
}

// inputEl.addEventListener("keypress", function(event) {
//     if (event.key === "Enter") {
//       event.preventDefault()
//       saveBtn.click()
//     }
// })

// saveBtn.addEventListener("click", function() {
//     const lead = inputEl.value
//     if (lead) { // to check input if true or false, so empty input won't be submitted.
//         leadsArray.push(lead)
//         renderListItem()
//         inputEl.value = ""
//         localStorage.setItem("leadsArray", JSON.stringify(leadsArray))
//     }
// })

getUrlBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        leadsArray.push(tabs[0].url)
        localStorage.setItem("leadsArray", JSON.stringify(leadsArray))
        renderListItem()
    })
})

clearLeadsBtn.addEventListener("click", function() {
    // history.go(0) - no need to refresh
    localStorage.clear()
    leadsArray = []
    renderListItem()
})

// function renderLeads() {
//     let listItem = ""
//     for (let i = 0; i < leadsArray.length; i++) {
//         listItem += `
//         <li>
//             <a target="_blank" href="${leadsArray[i]}">${leadsArray[i]}</a>
//         </li>
//     `
//     }
//     listEl.innerHTML = listItem
// }

// saveBtn.addEventListener("click", function() {
//     leadsArray.push(inputEl.value)
//     inputEl.value = "" 
//     localStorage.setItem("leadsArray", JSON.stringify(leadsArray))
//     renderLeads()
// }) 
