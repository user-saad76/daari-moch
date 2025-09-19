import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

// Validation schema
const schema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3),
  sku: z.string().min(1, "SKU is required"),
  shortDescription: z.string().min(5, "Short description is required"),
  longDescription: z.string().min(10, "Long description is required"),
  price: z.number().min(0),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.number().min(0),
  stock: z.number().min(0),
  sizes: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  category: z.string().min(1, "Category is required"), // <-- Added
  videoLink: z.string().url("Enter a valid URL").optional(),

});

export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      discountType: "percentage",
      sizes: [],
      colors: [],
    },
  });

  const [mainImage, setMainImage] = useState(null);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
   const [categories,setCategories] = useState([])

  const title = watch("title");
  useEffect(() => {
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w ]+/g, "")
        .replace(/ +/g, "-");
      setValue("slug", slug);
    }
  }, [title, setValue]);

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(URL.createObjectURL(file));
      setMainImageFile(file);
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const formatted = files.map((file) => ({
      id: uuidv4(),
      file,
      preview: URL.createObjectURL(file),
    }));
    setGalleryImages((prev) => [...prev, ...formatted]);
  };

  const removeGalleryImage = (id) => {
    setGalleryImages((prev) => prev.filter((img) => img.id !== id));
  };
  useEffect(()=>{
      const  getAllCategories = async()=>{
        const response = await fetch('http://localhost:7000/categories')
        const data = await response.json()
        setCategories(data)
      }
       getAllCategories()
  },[])

  const onSubmit = async (data) => {
    // Create FormData
    const formData = new FormData();

    // Append all non-file fields
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => formData.append(`${key}[]`, val));
      } else {
        formData.append(key, value);
      }
    });

    // Append main image file
    if (mainImageFile) {
      formData.append("mainImage", mainImageFile);
    }

    // Append gallery images
    galleryImages.forEach((img) => {
      formData.append("galleryImages", img.file);
    });

    
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    

    try {
      const res = await fetch("http://localhost:7000/products/add", {
        method: "POST",
        body: formData, // Browser auto-sets correct headers
      });

      const result = await res.json();
      console.log("Server Response:", result);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Red", "Blue", "Black", "White"];

  return (
    <div className=" bg-secondary container ">
      <h3 className="mb-4">Add Product</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className="mb-3">
          <label>Product Title</label>
          <input className="form-control" {...register("title")} />
          <div className="text-danger">{errors.title?.message}</div>
        </div>

        {/* Slug */}
        <div className="mb-3">
          <label>Slug</label>
          <input className="form-control" {...register("slug")} readOnly />
        </div>

        {/* SKU */}
        <div className="mb-3">
          <label>SKU</label>
          <input className="form-control" {...register("sku")} />
          <div className="text-danger">{errors.sku?.message}</div>
        </div>

        {/* Short Description */}
        <div className="mb-3">
          <label>Short Description</label>
          <input className="form-control" {...register("shortDescription")} />
          <div className="text-danger">{errors.shortDescription?.message}</div>
        </div>

        {/* Long Description */}
        <div className="mb-3">
          <label>Long Description</label>
          <textarea
            rows="4"
            className="form-control"
            {...register("longDescription")}
          />
          <div className="text-danger">{errors.longDescription?.message}</div>
        </div>
        {/* Category */}
      <div className="mb-3">
      <label>Category</label>
       <select className="form-select" {...register("category")}>
      <option value="">-- Select Category --</option>
        {categories.map((cat) => (
         <option key={cat._id} value={cat._id}>
        {cat.title}
      </option>
      ))}
      </select>
    <div className="text-danger">{errors.category?.message}</div>
    </div>
  
      {/* Video Link */}
   <div className="mb-3">
  <label>Product Video Link</label>
  <input
    type="url"
    className="form-control"
    placeholder="https://example.com/video"
    {...register("videoLink")}
  />
  <div className="text-danger">{errors.videoLink?.message}</div>
</div>

        {/* Price */}
        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            {...register("price", { valueAsNumber: true })}
          />
          <div className="text-danger">{errors.price?.message}</div>
        </div>

        {/* Discount */}
        <div className="mb-3 row">
          <div className="col">
            <label>Discount Type</label>
            <select className="form-select" {...register("discountType")}>
              <option value="percentage">%</option>
              <option value="fixed">PKR</option>
            </select>
          </div>
          <div className="col">
            <label>Discount Value</label>
            <input
              type="number"
              className="form-control"
              {...register("discountValue", { valueAsNumber: true })}
            />
          </div>
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label>Stock Quantity</label>
          <input
            type="number"
            className="form-control"
            {...register("stock", { valueAsNumber: true })}
          />
          <div className="text-danger">{errors.stock?.message}</div>
        </div>

        {/* Sizes */}
        <div className="mb-3">
          <label>Sizes</label>
          <div className="d-flex flex-wrap gap-3">
            {sizes.map((size) => (
              <div className="form-check" key={size}>
                <input
                  type="checkbox"
                  value={size}
                  {...register("sizes")}
                  className="form-check-input"
                  id={`size-${size}`}
                />
                <label
                  className="form-check-label"
                  htmlFor={`size-${size}`}
                >
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-3">
          <label>Colors</label>
          <div className="d-flex flex-wrap gap-3">
            {colors.map((color) => (
              <div className="form-check" key={color}>
                <input
                  type="checkbox"
                  value={color}
                  {...register("colors")}
                  className="form-check-input"
                  id={`color-${color}`}
                />
                <label
                  className="form-check-label"
                  htmlFor={`color-${color}`}
                >
                  {color}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Main Image */}
        <div className="mb-4">
          <label>Main Product Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleMainImageChange}
          />
          {mainImage && (
            <div className="mt-2">
              <img
                src={mainImage}
                alt="Main Preview"
                className="img-thumbnail"
                style={{ height: 150 }}
              />
            </div>
          )}
        </div>

        {/* Gallery Images */}
        <div className="mb-4">
          <label>Gallery Images (Multiple)</label>
          <input
            type="file"
            className="form-control"
            multiple
            accept="image/*"
            onChange={handleGalleryChange}
          />
          <div className="d-flex flex-wrap gap-2 mt-3">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className="position-relative border rounded p-1"
                style={{ width: 100, height: 100 }}
              >
                <img
                  src={img.preview}
                  alt="Gallery Preview"
                  className="img-fluid rounded"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-danger position-absolute top-0 end-0"
                  onClick={() => removeGalleryImage(img.id)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary">
          Submit Product
        </button>
      </form>
    </div>
  );
}
