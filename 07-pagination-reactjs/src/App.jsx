import React, { useEffect, useState } from "react";

const pageSize = 10;

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${(page-1)*pageSize}`);
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / pageSize));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const selectedPageHandler = (selectedPage) => {
    if(selectedPage > 0 && selectedPage <= totalPages && selectedPage !== page)
      setPage(selectedPage);
  }

  return (
    <div>
      {/* rendering images */}
      {products.length > 0 && (
        <div className="products">
          {products.map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {/* rendering pagination */}
      {products.length > 0 && (
        <div className="pagination">
          <span className={page > 1 ? "" : "pagination__disabled"} onClick={() => selectedPageHandler(page - 1)}>⏮️</span>
          {[...Array(totalPages)].map((_, i) => (
            <span className={page === i+1 ? "pagination__selected" : ""} onClick={() => selectedPageHandler(i+1)} key={i}>{i + 1}</span>
          ))}
          <span className={page < totalPages ? "" : "pagination__disabled"} onClick={() => selectedPageHandler(page + 1)}>⏭️</span>
        </div>
      )}
    </div>
  );
};

export default App;
