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
  description: z.string().min(10, "Long description is required"),
  price: z.number().min(0),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.number().min(0),
  stock: z.number().min(0),
  videoLink: z.string().url("Must be a valid URL").optional(),
  sizes: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
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

  const title = watch("title");
  useEffect(() => {
    if (title) {
      const slug = title.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");
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

  const onSubmit = (data) => {
    const payload = {
      ...data,
      mainImage: mainImageFile,
      galleryImages: galleryImages.map((img) => img.file),
    };
    console.log("Submitted Data:", payload);
    alert("Product submitted! Check console for data.");
  };

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Red", "Blue", "Black", "White"];

  return (
    <div className="container my-5 p-5">
      <div className="bg-secondary shadow rounded p-4">
        <h3 className="mb-4">Add New Product</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Left column */}
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Product Title</label>
                <input className="form-control" {...register("title")} />
                <div className="text-danger small">{errors.title?.message}</div>
              </div>

              <div className="mb-3">
                <label className="form-label">Slug</label>
                <input className="form-control" {...register("slug")} readOnly />
              </div>

              <div className="mb-3">
                <label className="form-label">SKU</label>
                <input className="form-control" {...register("sku")} />
                <div className="text-danger small">{errors.sku?.message}</div>
              </div>

              <div className="mb-3">
                <label className="form-label">Short Description</label>
                <input className="form-control" {...register("shortDescription")} />
                <div className="text-danger small">{errors.shortDescription?.message}</div>
              </div>

              <div className="mb-3">
                <label className="form-label">Long Description</label>
                <textarea rows="4" className="form-control" {...register("description")} />
                <div className="text-danger small">{errors.description?.message}</div>
              </div>

              <div className="mb-3">
                <label className="form-label">Video Link (Optional)</label>
                <input type="url" className="form-control" placeholder="https://example.com/video" {...register("videoLink")} />
                <div className="text-danger small">{errors.videoLink?.message}</div>
              </div>
            </div>

            {/* Right column */}
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input type="number" className="form-control" {...register("price", { valueAsNumber: true })} />
                <div className="text-danger small">{errors.price?.message}</div>
              </div>

              <div className="mb-3 row">
                <div className="col">
                  <label className="form-label">Discount Type</label>
                  <select className="form-select" {...register("discountType")}>
                    <option value="percentage">%</option>
                    <option value="fixed">PKR</option>
                  </select>
                </div>
                <div className="col">
                  <label className="form-label">Discount Value</label>
                  <input type="number" className="form-control" {...register("discountValue", { valueAsNumber: true })} />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Stock Quantity</label>
                <input type="number" className="form-control" {...register("stock", { valueAsNumber: true })} />
                <div className="text-danger small">{errors.stock?.message}</div>
              </div>

              <div className="mb-3">
                <label className="form-label">Available Sizes</label>
                <div className="d-flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <div className="form-check" key={size}>
                      <input type="checkbox" value={size} {...register("sizes")} className="form-check-input" id={`size-${size}`} />
                      <label className="form-check-label" htmlFor={`size-${size}`}>{size}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Available Colors</label>
                <div className="d-flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <div className="form-check" key={color}>
                      <input type="checkbox" value={color} {...register("colors")} className="form-check-input" id={`color-${color}`} />
                      <label className="form-check-label" htmlFor={`color-${color}`}>{color}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Image Upload */}
          <div className="mb-4">
            <label className="form-label">Main Product Image</label>
            <input type="file" className="form-control" accept="image/*" onChange={handleMainImageChange} />
            {mainImage && (
              <div className="mt-2">
                <img src={mainImage} alt="Main Preview" className="img-thumbnail" style={{ height: 150 }} />
              </div>
            )}
          </div>

          {/* Gallery Images */}
          <div className="mb-4">
            <label className="form-label">Gallery Images (Multiple Upload)</label>
            <input type="file" className="form-control" multiple accept="image/*" onChange={handleGalleryChange} />
            <div className="d-flex flex-wrap gap-2 mt-3">
              {galleryImages.map((img) => (
                <div key={img.id} className="position-relative border rounded p-1" style={{ width: 100, height: 100 }}>
                  <img src={img.preview} alt="Gallery Preview" className="img-fluid rounded" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                  <button type="button" className="btn btn-sm btn-danger position-absolute top-0 end-0" onClick={() => removeGalleryImage(img.id)}>
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="text-end">
            <button type="submit" className="btn btn-primary px-4">Submit Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}
