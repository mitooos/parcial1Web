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

let shoppingCart = [];

let dataDiv = document.getElementById("items");

const main = async () => {
  data = await fetchData(url);
  let title = document.createElement("h2");
  title.innerHTML = "Burgers";
  title.classList.add("text-center");
  dataDiv.innerHTML = "";
  dataDiv.appendChild(title);
  dataDiv.appendChild(renderItems(data[0].products));
};

document.getElementById("burgers").addEventListener("click", () => {
  let title = document.createElement("h2");
  title.innerHTML = "Burgers";
  title.classList.add("text-center");
  dataDiv.innerHTML = "";
  dataDiv.appendChild(title);
  dataDiv.appendChild(renderItems(data[0].products));
});

document.getElementById("tacos").addEventListener("click", () => {
  let title = document.createElement("h2");
  title.innerHTML = "Tacos";
  title.classList.add("text-center");
  dataDiv.innerHTML = "";
  dataDiv.appendChild(title);
  dataDiv.appendChild(renderItems(data[1].products));
});

document.getElementById("salads").addEventListener("click", () => {
  let title = document.createElement("h2");
  title.innerHTML = "Salads";
  title.classList.add("text-center");
  dataDiv.innerHTML = "";
  dataDiv.appendChild(title);
  dataDiv.appendChild(renderItems(data[2].products));
});

document.getElementById("desserts").addEventListener("click", () => {
  let title = document.createElement("h2");
  title.innerHTML = "Desserts";
  title.classList.add("text-center");
  dataDiv.innerHTML = "";
  dataDiv.appendChild(title);
  dataDiv.appendChild(renderItems(data[3].products));
});

document.getElementById("drinks").addEventListener("click", () => {
  let title = document.createElement("h2");
  title.innerHTML = "Drinks & Slides";
  title.classList.add("text-center");
  dataDiv.innerHTML = "";
  dataDiv.appendChild(title);
  dataDiv.appendChild(renderItems(data[4].products));
});

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

    let cartButton = document.createElement("button");
    cartButton.classList.add("btn");
    cartButton.classList.add("btn-secondary");
    cartButton.addEventListener("click", () => {
      shoppingCart.push(item);
      console.log(shoppingCart);
    });
    cartButton.innerText = "Add to cart";
    cardBody.appendChild(cartButton);

    card.appendChild(cardBody);

    cardDeck.appendChild(card);
  });

  console.log(cardDeck);
  return cardDeck;
};

document.getElementById("shopping-cart").addEventListener("click", () => {
  let title = document.createElement("h2");
  title.innerHTML = "Order detail";
  title.classList.add("text-center");
  dataDiv.innerHTML = "";
  dataDiv.appendChild(title);

  dataDiv.appendChild(renderDetail());
});

const renderDetail = () => {
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
    row.insertCell(0).innerHTML = index;
    row.insertCell(1).innerHTML = 1;
    row.insertCell(2).innerHTML = item.description;
    row.insertCell(3).innerHTML = item.description;
    row.insertCell(4).innerHTML = 1;

    tableBody.appendChild(row);
  });

  table.appendChild(tableHead);
  table.appendChild(tableBody);

  return table;
};

main();
