import React from 'react';

const categories = [
  { id: 1, name: 'Men\'s Clothing', image: 'assets/img/cat-1.jpg', products: 100 },
  { id: 2, name: 'Women\'s Fashion', image: 'assets/img/cat-2.jpg', products: 100 },
  { id: 3, name: 'Electronics', image: 'assets/img/cat-3.jpg', products: 100 },
  { id: 4, name: 'Home & Kitchen', image: 'assets/img/cat-4.jpg', products: 100 },
  { id: 5, name: 'Shoes & Bags', image: 'assets/img/cat-1.jpg', products: 100 },
  { id: 6, name: 'Watches', image: 'assets/img/cat-2.jpg', products: 100 },
  { id: 7, name: 'Sportswear', image: 'assets/img/cat-3.jpg', products: 100 },
  { id: 8, name: 'Books', image: 'assets/img/cat-4.jpg', products: 100 },
  { id: 9, name: 'Gadgets', image: 'assets/img/cat-1.jpg', products: 100 },
  { id: 10, name: 'Toys', image: 'assets/img/cat-2.jpg', products: 100 },
  { id: 11, name: 'Beauty', image: 'assets/img/cat-4.jpg', products: 100 },
  { id: 12, name: 'Accessories', image: 'assets/img/cat-3.jpg', products: 100 },
];

const Categories = () => {
  return (
    <div className="container-fluid pt-5">
      <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">Categories</span>
      </h2>
      <div className="row px-xl-5 pb-3">
        {categories.map(category => (
          <div key={category.id} className="col-lg-3 col-md-4 col-sm-6 pb-1">
            <a className="text-decoration-none" href="#">
              <div className="cat-item img-zoom d-flex align-items-center mb-4">
                <div className="overflow-hidden" style={{ width: '100px', height: '100px' }}>
                  <img className="img-fluid" src={category.image} alt={category.name} />
                </div>
                <div className="flex-fill pl-3">
                  <h6>{category.name}</h6>
                  <small className="text-body">{category.products} Products</small>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
