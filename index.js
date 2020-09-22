const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let data = [];
const fetchData = async (dataUrl) => {
  let response = await fetch(dataUrl);
  if (response.ok) {
    return response.json();
  } else {
    alert("HTTP-Error: " + response.status);
  }
};

let shoppingCart = new Map();

let dataDiv = document.getElementById("items");

const main = async () => {
  data = await fetchData(url);
  renderMenu("Burgers", data[0].products);
};

document.getElementById("burgers").addEventListener("click", () => {
  renderMenu("Burgers", data[0].products);
});

document.getElementById("tacos").addEventListener("click", () => {
  renderMenu("Tacos", data[1].products);
});

document.getElementById("salads").addEventListener("click", () => {
  renderMenu("Salads", data[2].products);
});

document.getElementById("desserts").addEventListener("click", () => {
  renderMenu("Desserts", data[3].products);
});

document.getElementById("drinks").addEventListener("click", () => {
  renderMenu("Drinks & Slides", data[4].products);
});

const renderMenu = (titleText, items) => {
  let title = document.createElement("h2");
  title.innerHTML = titleText;
  title.classList.add("text-center");
  title.classList.add("title");
  dataDiv.innerHTML = "";
  dataDiv.appendChild(title);
  dataDiv.appendChild(renderItems(items));
};

const renderItems = (itemsArray) => {
  let cardDeck = document.createElement("div");
  cardDeck.classList.add("card-deck");
  itemsArray.forEach((item, index) => {
    let card = document.createElement("div");
    card.classList.add("card");
    let img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = item.image;
    img.alt = "product image";
    card.appendChild(img);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerHTML = item.name;
    cardBody.appendChild(cardTitle);

    let cardDescription = document.createElement("p");
    cardDescription.classList.add("card-text");
    cardDescription.innerHTML = item.description;
    cardBody.appendChild(cardDescription);

    let price = document.createElement("h6");
    price.innerHTML = "$" + item.price;
    cardBody.appendChild(price);

    let cartButton = document.createElement("button");
    cartButton.classList.add("btn");
    cartButton.classList.add("btn-secondary");
    cartButton.addEventListener("click", () => {
      addItemToCart(item);
    });
    cartButton.innerText = "Add to cart";
    cardBody.appendChild(cartButton);

    card.appendChild(cardBody);

    cardDeck.appendChild(card);
  });
  return cardDeck;
};

const addItemToCart = (item) => {
  if (shoppingCart.has(item.name)) {
    item = shoppingCart.get(item.name);
    item.count += 1;
  } else {
    item.count = 1;
  }
  shoppingCart.set(item.name, item);
  document.getElementById("shoppingCartItemsCount").innerHTML =
    " Items: " + shoppingCart.size;
};

document.getElementById("shopping-cart").addEventListener("click", () => {
  renderCart();
});

const renderCart = () => {
  let title = document.createElement("h2");
  title.innerHTML = "Order detail";
  title.classList.add("text-center");
  title.classList.add("title");
  dataDiv.innerHTML = "";
  dataDiv.appendChild(title);

  dataDiv.appendChild(renderCartDetail());

  let total = document.createElement("h6");
  total.innerHTML = "Total: $" + getCartTotal();
  dataDiv.appendChild(total);

  let buttons = document.createElement("div");
  buttons.classList.add("row");
  buttons.classList.add("buttons");
  buttons.classList.add("justify-content-end");

  let cancelButton = document.createElement("div");
  cancelButton.classList.add("col-auto");
  cancelButton.innerHTML = `<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#cancelModal">
  Cancel
</button>`;
  buttons.appendChild(cancelButton);

  let confirmButton = document.createElement("button");
  confirmButton.classList.add("col-auto");
  confirmButton.classList.add("btn");
  confirmButton.classList.add("btn-outline-secondary");
  confirmButton.innerHTML = "Confirm order";
  confirmButton.addEventListener("click", () => {
    console.log(Array.from(shoppingCart.values()));
  });
  buttons.appendChild(confirmButton);

  dataDiv.appendChild(buttons);
};

const renderCartDetail = () => {
  let table = document.createElement("table");
  table.classList.add("table");
  table.classList.add("table-striped");

  let tableHead = document.createElement("thead");
  let headRow = document.createElement("tr");
  headRow.insertCell(0).innerHTML = "Item";
  headRow.insertCell(1).innerHTML = "Qty.";
  headRow.insertCell(2).innerHTML = "Description";
  headRow.insertCell(3).innerHTML = "Unit price";
  headRow.insertCell(4).innerHTML = "Ammount";

  tableHead.appendChild(headRow);

  let tableBody = document.createElement("tbody");

  shoppingCart.forEach((item, index) => {
    let row = document.createElement("tr");
    row.insertCell(0).innerHTML = index + 1;
    row.insertCell(1).innerHTML = item.count;
    row.insertCell(2).innerHTML = item.name;
    row.insertCell(3).innerHTML = item.price;
    row.insertCell(4).innerHTML = item.count * item.price;

    tableBody.appendChild(row);
  });

  table.appendChild(tableHead);
  table.appendChild(tableBody);

  return table;
};

const getCartTotal = () => {
  let ans = 0;
  shoppingCart.forEach((item) => {
    ans += item.count * item.price;
  });
  return ans;
};

document.getElementById("cancelOrderButton").addEventListener("click", () => {
  shoppingCart = new Map();
  renderMenu("Burgers", data[0].products);
  document.getElementById("shoppingCartItemsCount").innerHTML = " Items: 0";
});

main();
