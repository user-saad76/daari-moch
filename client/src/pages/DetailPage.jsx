import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { useCart } from '../contexts/CartProvider';

function DetailPage() {
  const { slug } = useParams();

  const [product,setProduct] = useState({})

     const  { cartState,incrementCart,decrementCart,addToCart} =  useCart()

    useEffect(() => {
      const getProductbySlug = async () => {
        try {
          const res = await fetch(`http://localhost:7000/products/${slug}`);
          const data = await res.json();
          setProduct(data.product[0]);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      getProductbySlug();
    }, []);

  return (
   <>
    <Breadcrumb/>
    <div className="container-fluid pb-5">
  <div className="row px-xl-5">
    {/* Product Carousel */}
    <div className="col-lg-5 mb-30">
      <div id="product-carousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner bg-light">
          {product.galleryImages?.map((image,i)=>(
             
             <div className={`carousel-item ${i == 0? 'active':''}`}key = {i}>
            <img className="w-100 h-100" src={image.secure_url} alt="Image" />
          </div>
          ))

        }
        <div className="carousel-item">
            <img className="w-100 h-100" src="img/product-2.jpg" alt="Image" />
          </div>
          <div className="carousel-item">
            <img className="w-100 h-100" src="img/product-3.jpg" alt="Image" />
          </div>
          <div className="carousel-item">
            <img className="w-100 h-100" src="img/product-4.jpg" alt="Image" />
          </div>
        </div>
          
        <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
          <i className="fa fa-2x fa-angle-left text-dark"></i>
        </a>
        <a className="carousel-control-next" href="#product-carousel" data-slide="next">
          <i className="fa fa-2x fa-angle-right text-dark"></i>
        </a>

      </div>
    </div>

    {/* Product Details */}
    <div className="col-lg-7 h-auto mb-30">
      <div className="h-100 bg-light p-30">
        <h3>{product.title}</h3>
        <div className="d-flex mb-3">
          <div className="text-primary mr-2">
            <small className="fas fa-star"></small>
            <small className="fas fa-star"></small>
            <small className="fas fa-star"></small>
            <small className="fas fa-star-half-alt"></small>
            <small className="far fa-star"></small>
          </div>
          <small className="pt-1">(99 Reviews)</small>
        </div>
        <h3 className="font-weight-semi-bold mb-4">PKR{product.price}</h3>
        <p className="mb-4">
          {product.shortDescription}
        </p>

        {/* Sizes */}
        <div className="d-flex mb-3">
          <strong className="text-dark mr-3">Sizes:</strong>
          <form>
            {[ "XS", "S", "M", "L", "XL" ].map((size, idx) => (
              <div key={size} className="custom-control custom-radio custom-control-inline">
                <input type="radio" className="custom-control-input" id={`size-${idx+1}`} name="size" />
                <label className="custom-control-label" htmlFor={`size-${idx+1}`}>{size}</label>
              </div>
            ))}
          </form>
        </div>

        {/* Colors */}
        <div className="d-flex mb-4">
          <strong className="text-dark mr-3">Colors:</strong>
          <form>
            {[ "Black", "White", "Red", "Blue", "Green" ].map((color, idx) => (
              <div key={color} className="custom-control custom-radio custom-control-inline">
                <input type="radio" className="custom-control-input" id={`color-${idx+1}`} name="color" />
                <label className="custom-control-label" htmlFor={`color-${idx+1}`}>{color}</label>
              </div>
            ))}
          </form>
        </div>

        {/* Quantity and Add to Cart */}
        <div className="d-flex align-items-center mb-4 pt-2">
          <div className="input-group quantity mr-3" style={{ width: "130px" }}>
            <div className="input-group-btn">
              <button className="btn btn-primary btn-minus" onClick={()=>decrementCart(product._id)} type="button">
                <i className="fa fa-minus"></i>
              </button>
            </div>
            <input type="text" className="form-control bg-secondary border-0 text-center" defaultValue="1" />
            <div className="input-group-btn">
              <button className="btn btn-primary btn-plus" onClick={()=>incrementCart(product._id)} type="button">
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
          <button className="btn btn-primary px-3" onClick={()=>addToCart(product)} type="button">
            <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
          </button>
        </div>

        {/* Share */}
        <div className="d-flex pt-2">
          <strong className="text-dark mr-2">Share on:</strong>
          <div className="d-inline-flex">
            {["facebook-f", "twitter", "linkedin-in", "pinterest"].map(icon => (
              <a key={icon} className="text-dark px-2" href="#">
                <i className={`fab fa-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Tabs Section */}
  <div className="row px-xl-5">
    <div className="col">
      <div className="bg-light p-30">
        <div className="nav nav-tabs mb-4">
          <a className="nav-item nav-link text-dark active" data-toggle="tab" href="#tab-pane-1">Description</a>
          <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-2">Information</a>
          <a className="nav-item nav-link text-dark" data-toggle="tab" href="#tab-pane-3">Reviews (0)</a>
        </div>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="tab-pane-1">
            <h4 className="mb-3">Product Description</h4>
            <p>{product.longDescription}</p>
          </div>

          <div className="tab-pane fade" id="tab-pane-2">
            <h4 className="mb-3">Additional Information</h4>
            <p>...</p>
            <div className="row">
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0">Item 1</li>
                  <li className="list-group-item px-0">Item 2</li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0">Item 3</li>
                  <li className="list-group-item px-0">Item 4</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="tab-pane fade" id="tab-pane-3">
            <div className="row">
              <div className="col-md-6">
                <h4 className="mb-4">1 review for "Product Name"</h4>
                <div className="media mb-4">
                  <img src="img/user.jpg" alt="Image" className="img-fluid mr-3 mt-1" style={{ width: "45px" }} />
                  <div className="media-body">
                    <h6>John Doe<small> - <i>01 Jan 2045</i></small></h6>
                    <div className="text-primary mb-2">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                      <i className="far fa-star"></i>
                    </div>
                    <p>Review text...</p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <h4 className="mb-4">Leave a review</h4>
                <small>Your email address will not be published. Required fields are marked *</small>
                <div className="d-flex my-3">
                  <p className="mb-0 mr-2">Your Rating * :</p>
                  <div className="text-primary">
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                  </div>
                </div>
                <form>
                  <div className="form-group">
                    <label htmlFor="message">Your Review *</label>
                    <textarea id="message" cols="30" rows="5" className="form-control"></textarea>
                  </div>
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email *</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="form-group mb-0">
                    <input type="submit" value="Leave Your Review" className="btn btn-primary px-3" />
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>

   </>
  );
}

export default DetailPage;
