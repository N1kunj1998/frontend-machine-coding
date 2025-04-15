/* Implement Infinite scrolling in ReactJS

Requirements:
  - Implement infinite scrolling for fetching more products when the user reaches the bottom of the page.
  https://dummyjson.com/products
  - Ensure that loading indicator are displayed appropriaetly while fetching data.
  - Implement Optimization to prevent exceive API requessts during scrolling.
*/

import React, { useEffect, useState } from 'react'

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try{
      const res = await fetch(`https://dummyjson.com/products?limit=${page*10}`);
      const data = await res.json();

      setProducts(data);
      setPage(page + 1);
    } catch(error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const myThrottle = (cb, d) => {
    let last = 0;
    return (...args) => {
      let now = new Date().getTime();
      if(now - last < d) return;
      last = now;
      return cb(...args);
    };
  };

  const handleScroll = myThrottle(() => {
    if(
      window.innerHeight + document.documentElement.scrollTop + 500 >
      document.documentElement.offsetHeight &&
      !loading && products.limit < products.total
    ) {
      fetchProducts();
    }
  }, 500);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const {products: allProducts} = products;

  return (
    <div>
      <h1>Infinite Scrolling</h1>
      {allProducts?.length > 0 && (
        <div className='products'>
          {allProducts.map((prod) => {
            return (
              <div className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </div>
            )
          })}
        </div>
      )}
      {loading && <p>Loading...</p>}
    </div>
  )
}

export default App