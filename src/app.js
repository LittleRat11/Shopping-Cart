const shop = document.querySelector("#shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];
let generateShop = () => {
    return (
        shop.innerHTML = shopItemsData.map((shopItem) => {
            let { id, name, price, desc, img } = shopItem;
            let search = basket.find((x) => x.id === id) || [];
            return `
            <!-- *card start -->
                <div id=product-id-${id} class="item-card">
                    <img src=${img} alt="" class="item-img">
                    <div class="card-body">
                        <h2>${name}</h2>
                        <p>
                           ${desc}
                        </p>
                    </div>
                    <div class="card-price">
                        <p>$ ${price}</p>
                        <div class="button-gp">
                            <button onclick="decrement(${id})" class="minus"><i class="fa-solid fa-minus"></i></button>
                            <div id=${id} class="number">
                                ${search.item === undefined ? 0 : search.item}
                            </div>
                            <button onclick="increment(${id})" class="plus"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                </div>
                <!-- *card end-->
            `
        }).join(""))
}

generateShop();

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
        // console.log(basket)

    updateLocalStorage()
}

let update = (id) => {
    let search = basket.find((value) => value.id === id)
        // console.log(search.item);
    document.querySelector(`#${id}`).innerHTML = search.item;

    calculation();

}

let calculation = () => {
    let cartIcon = document.querySelector(".cart-amount");
    // *reduce(previousNum,nextNum =>{},initialNum)
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
calculation();

let updateLocalStorage = () => {
    localStorage.setItem("data", JSON.stringify(basket))
}