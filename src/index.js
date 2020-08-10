document.addEventListener('DOMContentLoaded', () => {

  const giftListUl = document.querySelector("#gift-list"),
        filterInput = document.querySelector("#filter-input"),
        newGiftForm = document.querySelector("#new-gift-form"),
          newGiftNameInput = document.querySelector("#new-gift-form input#gift-name-input"),
          newGiftImageInput = document.querySelector("#new-gift-form input#gift-image-input"),
        allGiftObjectArray = [];
  
  // A user should be able to search for and filter particular gifts with names that include a particular search query.
  filterInput.addEventListener("keypress", (evt) => {
    if (evt.key === 'Enter') {
      const searchQuery = filterInput.value;
      filterByGiftName(searchQuery);
      filterInput.value = '';
    }
  })

  // A user should be able to add a new gift
  newGiftForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const newGiftObject = {
      name: newGiftNameInput.value,
      image: newGiftImageInput.value
    }
    
    fetch('http://localhost:3000/gifts', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(newGiftObject)
    })
      .then(response => response.json())
      .then(newGiftObject => {
        const newGiftLi = createGiftLi(newGiftObject);
        addGiftToListUl(newGiftLi);
      })
  })

  // Takes an individual giftObject, create needed elements
  function createGiftLi(giftObject) {
    const giftLi = document.createElement("li"),
          giftLi.innerText = giftObject.name,
          giftLi.innerHTML += "<br>",
          
          giftImg = document.createElement("img"),
          giftImg.src = giftObject.image,
          giftLi.append(giftImg),
          giftLi.innerHTML += "<br>",

          giftEditBtn = document.createElement("button"),
          giftEditBtn.innerText = "Edit",
          giftEditBtn.setAttribute("id", "gift-edit"),
          giftLi.append(giftEditBtn),

          giftDeleteBtn = document.createElement("button"),
          giftDeleteBtn.innerText = "Delete",
          giftDeleteBtn.setAttribute("id", "gift-delete"),
          giftLi.append(giftDeleteBtn);

    giftEditBtn.addEventListener("click", (evt) => displayGiftEditForm(evt, giftObject, giftLi))

    giftDeleteBtn.addEventListener("click", (evt) => {
      deleteGiftObjectAndUpdateDOM(evt, giftObject)
    })

    return giftLi;
  }

  // Append the giftLi to giftListUl
  function addGiftToListUl(giftLi) {
    giftListUl.append(giftLi); 
  }

  // Take an array of gifts and add all to giftListUl
  function addGiftsToDOM(giftObjectArray) {
    giftObjectArray.forEach(giftObject => addGiftToListUl(createGiftLi(giftObject)));
  }

  // Display edit form, adds event listener to submission
  function displayGiftEditForm(evt, giftObject, giftLi) {
    
    if (!giftLi.querySelector("form")) {
      const giftEditForm = document.createElement("FORM"),

            nameInput = document.createElement("input"),
            nameInput.setAttribute("type", "text"),
            nameInput.setAttribute("id", "name"),
            nameInput.setAttribute("name", "name"),
            nameInput.setAttribute("value", giftObject.name),

            imageInput = document.createElement("input"),
            imageInput.setAttribute("type", "text"),
            imageInput.setAttribute("id", "image"),
            imageInput.setAttribute("name", "image"),
            imageInput.setAttribute("value", giftObject.image),

            submitInput = document.createElement("input"),
            submitInput.setAttribute("type", "submit"),
            submitInput.setAttribute("value", "Submit");
            
      giftEditForm.append(nameInput, imageInput, submitInput);
      giftLi.append(giftEditForm);

    } else {
      giftLi.querySelector("form").hidden = false;
    }

    giftLi.querySelector("form").addEventListener("submit", (evt) => {
      updateGiftLiAndGiftObject(evt, giftLi, giftObject);
    })
  }
  
  // Update the gift object in gifts array, update the giftLi
  function updateGiftLiAndGiftObject(evt, giftLi, giftObject) {
    evt.preventDefault();
    
    const nameInput = evt.target.name.value;
    const imageInput = evt.target.image.value;
    
    const editedGiftObject = {
      name: nameInput,
      image: imageInput
    }

    fetch('http://localhost:3000/gifts/' + giftObject.id, {
      method: 'PATCH',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(editedGiftObject)
    })
      .then(response => response.json())
      .then(editedGiftObject => {
        giftLi.firstChild.textContent = nameInput;
        giftLi.children[1].src.textContent = imageInput;
        giftLi.lastElementChild.hidden = true;
      });
  }

  // Delete the gift object and update the DOM
  function deleteGiftObjectAndUpdateDOM(evt, giftObject) {
    fetch('http://localhost:3000/gifts/' + giftObject.id, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(result => {
        evt.target.parentElement.remove();
      });
  }

  // Filters the DOM by the searchQuery
  function filterByGiftName(searchQuery) {
    const filteredGifts = allGiftObjectArray.filter(giftObject => giftObject.name.toLowerCase().includes(searchQuery.toLowerCase()));

    giftListUl.innerHTML = '';
    addGiftsToDOM(filteredGifts);
  }

  function fetchGifts() {
    fetch('http://localhost:3000/gifts')
      .then(response => response.json())
      .then(giftObjectArray => {
        allGiftObjectArray = giftObjectArray;
        addGiftsToDOM(giftObjectArray);
      })
  }

  fetchGifts();
})