document.addEventListener("DOMContentLoaded", function() {
    const app = document.querySelector(".app");

    let products  = [];
    let page = 1;

    const fetchProducts = async () => {
        try {
            const res = await fetch("https://dummyjson.com/products?limit=100");
            const data = await res.json();

            if(data && data.products) {
                products = data.products;
                render();
            }
        }
        catch (error) {
            console.error("Error fetching products: ", error);
        }
    }

    const render = () => {
        const productsContainer = document.createElement("div");
        productsContainer.classList.add("products");
        const pagination = document.createElement("div");
        pagination.classList.add("pagination");

        if(products.length > 0) {
            products.slice((page-1)*10, page*10).forEach((prod) => {
                const productElement = document.createElement("div");
                productElement.classList.add("products__single");
                productElement.innerHTML = `
                    <img src="${prod.thumbnail}" alt="${prod.title}" />
                    <span>${prod.title}</span>
                `;

                productsContainer.appendChild(productElement);
            });


            if(page > 1) {
                const prevButton = createPaginationButton("⏮️");
                pagination.appendChild(prevButton);
            }

            // display number buttons
            for(let i=0; i<products.length/10; i++) {
                const pageButton = createPaginationButton(i+1);
                pagination.appendChild(pageButton);
            }

            if(page < products.length/10) {
                const nextButton = createPaginationButton("⏭️");
                pagination.appendChild(nextButton);
            }
        }

        pagination.addEventListener("click", function(event) {
            const target = event.target;
            
            if(target.tagName !== "BUTTON") return;

            if(target.textContent === "⏮️") selectPageHandler(page-1);
            else if(target.textContent === "⏭️") selectPageHandler(page+1);
            else selectPageHandler(+target.textContent);
        })

        app.innerHTML = "";
        app.appendChild(productsContainer);
        app.appendChild(pagination);
    };

    const createPaginationButton = (text, isSelected=false) => {
        const button = document.createElement("button");
        button.textContent = text;
        if(isSelected) {
            button.classList.add("pagination__selected");
        }
        return button;
    };
    const selectPageHandler = (selectedPage) => {
        if(selectedPage > 0 && selectedPage <= (products.length / 10) && selectedPage !== page){
            page = selectedPage;
            // app.re
            render();
        }
    }

    fetchProducts();
});