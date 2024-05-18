let label = document.querySelector("#bill");
let shoppingCart = document.querySelector("#shopping-cart")
    // console.log(shopItemsData)
let basket = JSON.parse(localStorage.getItem("data")) || [];
let calculation = () => {
    let cartIcon = document.querySelector(".cart-amount");
    // *reduce(previousNum,nextNum =>{},initialNum)
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((cart) => {
            let { id, item } = cart
            let result = shopItemsData.find((y) => y.id === id) || [];
            let { img, name, price } = result
            return `
                <div class="card-item">
                    <img src=${img} alt="" width="100"/>
                    <div class="detail">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${name}</p>
                                <p class="cart-item-price">$ ${price}</p>
                            </h4>
                            <i onclick="removeItem(${id})" class="fa-solid fa-x"></i>
                        </div>
                      <div class="cart-btns">
                            <button onclick="decrement(${id})" class="minus"><i class="fa-solid fa-minus"></i></button>
                            <div id=${id} class="number">
                                ${item}
                            </div>
                            <button onclick="increment(${id})" class="plus"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <h3>$ ${item * price}</h3>
                    </div>
                </div>
            `;
        }).join(""))
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="homeBtn">Back to Home</button>
        </a>
        `
    }
}

generateCartItems()
let increment = (id) => {
    let selectedItem = id;

    let search = basket.find((card) => card.id === selectedItem.id)
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1
        })
    } else {
        search.item += 1;
    }

    // console.log(basket)

    update(selectedItem.id);
    generateCartItems();
    updateLocalStorage()
}
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((card) => card.id === selectedItem.id)
    if (search === undefined) {
        return
    } else if (search.item === 0) {
        return
    } else {
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0)
    generateCartItems();

    updateLocalStorage()
}
let update = (id) => {
    let search = basket.find((value) => value.id === id)
        // console.log(search.item);
    document.querySelector(`#${id}`).innerHTML = search.item;

    calculation();
    totalAmount()

}
let updateLocalStorage = () => {
    localStorage.setItem("data", JSON.stringify(basket))
}
let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    calculation();
    updateLocalStorage();
}

let clearCart = () => {
    basket = []
    generateCartItems();
    calculation();
    updateLocalStorage();
}

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
                let { item, id } = x;
                let search = shopItemsData.find((y) => y.id === id) || [];

                return item * search.price;
            }).reduce((x, y) => x + y, 0)
            // console.log(amount)
        label.innerHTML = `
        <h2>Total Bill :$ ${amount}</h2>
        <button class="check-out">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    } else return
}
totalAmount()