document.addEventListener('DOMContentLoaded', () => {
  // find the gift container
  const giftCollection = document.querySelector(".gift-list")
  // find the edit gift form
  const editGiftForm = document.getElementById("new-gift-form")
  const editGiftName = document.getElementById("gift-name-input")
  const editGiftImage = document.querySelector("#gift-image-input")

  // find the filter gift names
  const filterGifts = document.querySelector("#filter-input")
  let allGifts = gifts
  let filteredGifts = []

  filterGifts.addEventListener("keyup", event => {
    let input = event.target.value // whatever the user searches
    // FIIIIILTER the array of gifts to ONLY show the ones
    // whose NAME matches the input

    let filteredGiftArray = allGifts.filter(gift => {
      if (gift.name.includes(input)) {
        return gift
      }
    })

    // allGifts = [1, 2, 3, 4]
    filteredGifts = filteredGiftArray
    // allGifts = [1]
    giftCollection.innerHTML = ""
    showGifts()
  })

  editThisGift = event => {
    // console.log("ur tryna edit this")
    // debugger
    // iterate over all gifts to find the one whose id matches the one we clicked on
    let editId = parseInt(event.target.id)
    let editedGift = {}
    allGifts.find(gift => {
      if (gift.id === editId) {
        editedGift = gift
      }
    })
    // console.log("all gifts before update", allGifts)
    // console.log("------")
    // console.log(editGiftForm)
    // console.log(editGiftName)
    // console.log(editGiftImage)
    editGiftName.value = editedGift.name
    editGiftImage.value = editedGift.image
    editGiftForm.addEventListener("submit", event => {
      event.preventDefault()
      // console.log(editedGift)
      // console.log(editGiftName.value)
      // console.log(editGiftImage.value)
      // debugger
      editedGift.name = editGiftName.value
      editedGift.image = editGiftImage.value
      // editedGift.id = 1
      let index = allGifts.indexOf(editedGift) // 0
      allGifts.splice(index, 1, editedGift)
      // console.log("all gifts after update", allGifts)
      // updateGiftDiv(editedGift)

      // remove all gifts currently inside gift collection
      giftCollection.innerHTML = ''
      // reset and iterate over the new gifts array + append it to the dom
      showGifts()
    })
  }

  showGifts = () => {
    // we're going to iterate over each gift and display as an <li> inside
    // the <ul>
    if (filteredGifts.length > 0) {
      filteredGifts.forEach(gift => {
        let giftDiv = document.createElement("div")
        let giftLi = document.createElement("li")
        giftLi.innerText = gift.name
        let giftImg = document.createElement("img")
        giftImg.src = gift.image
        // console.log("----")
        // console.log(giftImg)
        giftLi.append(giftImg)
        giftDiv.append(giftLi)

        // edit button
        let editButton = document.createElement("button")
        editButton.innerText = "Edit"
        editButton.id = gift.id
        giftLi.append(editButton)

        // delete button
        let deleteButton = document.createElement("button")
        deleteButton.innerText = "Annihilate :()"
        deleteButton.id = gift.id
        giftLi.append(deleteButton)

        // add event listener for edit
        editButton.addEventListener("click", editThisGift)

        // add event listener for delete
        deleteButton.addEventListener("click", event => {
          // let deleteGiftIndex = allGifts.indexOf(gift)
          let updatedGifts = allGifts.filter(gift => {
            if (gift.id !== parseInt(event.target.id)) {
              return gift
            }
          })
          allGifts = updatedGifts
          // console.log("allGifts with one deleted is", updatedGifts)
          // debugger
          giftCollection.innerHTML = ""
          showGifts()
        })

        // get the <li> on dat list
        giftCollection.append(giftDiv)
      })
    } else {
      allGifts.forEach(gift => {
        let giftDiv = document.createElement("div")
        let giftLi = document.createElement("li")
        giftLi.innerText = gift.name
        let giftImg = document.createElement("img")
        giftImg.src = gift.image
        // console.log("----")
        // console.log(giftImg)
        giftLi.append(giftImg)
        giftDiv.append(giftLi)

        // edit button
        let editButton = document.createElement("button")
        editButton.innerText = "Edit"
        editButton.id = gift.id
        giftLi.append(editButton)

        // delete button
        let deleteButton = document.createElement("button")
        deleteButton.innerText = "Annihilate :()"
        deleteButton.id = gift.id
        giftLi.append(deleteButton)

        // add event listener for edit
        editButton.addEventListener("click", editThisGift)

        // add event listener for delete
        deleteButton.addEventListener("click", event => {
          // let deleteGiftIndex = allGifts.indexOf(gift)
          let updatedGifts = allGifts.filter(gift => {
            if (gift.id !== parseInt(event.target.id)) {
              return gift
            }
          })
          allGifts = updatedGifts
          // console.log("allGifts with one deleted is", updatedGifts)
          // debugger
          giftCollection.innerHTML = ""
          showGifts()
        })

        // get the <li> on dat list
        giftCollection.append(giftDiv)
      })
    }
  }

  showGifts()
})
