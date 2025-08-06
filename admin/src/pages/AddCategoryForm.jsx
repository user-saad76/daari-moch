import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema
const CategorySchema = z.object({
  title: z.string().min(2, "Category title is required"),
  isPublic: z.boolean().default(true),
  image: z.any().optional(),
});

export default function AddCategoryForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      isPublic: true,
    },
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setValue("image", file);
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    }
  };

  const onSubmit = (data) => {
    const payload = {
      ...data,
      image: imageFile,
    };
    console.log("Category Data:", payload);
    alert("Category submitted! Check console for details.");
  };

  return (
    <div className="container mt-5">
      <div className="bg-light p-4 shadow rounded">
        <h3 className="mb-4">Add New Category</h3>
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Category Title */}
          <div className="mb-3">
            <label className="form-label">Category Title</label>
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              placeholder="Enter category title"
              {...register("title")}
            />
            {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label">Category Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="img-thumbnail mt-2"
                style={{ maxHeight: "150px" }}
              />
            )}
          </div>

          {/* Public/Private Toggle */}
          <div className="form-check form-switch mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              id="isPublic"
              defaultChecked
              {...register("isPublic")}
            />
            <label className="form-check-label" htmlFor="isPublic">
              Public Category
            </label>
          </div>

          {/* Submit Button */}
          <div className="text-end">
            <button type="submit" className="btn btn-primary px-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
