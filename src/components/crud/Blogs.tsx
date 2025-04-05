"use client";

import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { FormEvent, ChangeEvent, useState } from "react";
import { endpoints } from "../../data/endpoints";
import { Put, Post, Fetch } from "../../hooks/apiUtils";
import { IoAdd, IoTrash } from "react-icons/io5";
import dayjs from "dayjs";
import SingleImageUploader from "../input/ImageUploader";

const RichTextEditor = dynamic(() => import("../common/RichTextEditor"), {
  ssr: false,
});

interface BlogFormProps {
  onClose?: any;
  formType: any;
  data?: BlogState;
  setFilteredData?: any;
}

interface BlogState {
  id: string;
  title: string;
  isActive: boolean;
  coverImage?: string;
  // categoryId?: string;
  content: string;
  tag: string;
  author: string;
  date: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: [string];
  // blogcoverImage: File | string;
}

interface IncludedItem {
  id: number;
  text: string;
}
const blogPlaceholder = {
  title: "Enter blog post title here", // Placeholder for the blog title
  isActive: true, // Placeholder for blog post active status (default to true)
  content: "Enter the full content or description of the blog post", // Placeholder for the full blog post content
  author: "Enter author",
  slug: "Enter a slug",
  metaTitle: "Enter a meta title",
  metaDescription: "Enter a meta description",
  metaKeywords: "Enter a meta keyword",
  date: "Enter a date",
  coverImage: "Enter image URL or upload an image for the blog post", //
};

const BlogForm: React.FC<BlogFormProps> = (props) => {
  const data = props.data;
  const meta = data?.metaKeywords?.map((meta, index) => {
    return { id: index + 1, text: meta };
  });
  const [items, setItems] = useState<any>(meta || []);
  const [keywords, setKeywords] = useState<string[]>([]);

  const [form, setForm] = useState(
    data?.id
      ? {
          id: data?.id ?? "",
          title: data?.title ?? "",
          isActive: data?.isActive ?? true,
          // categoryId: data?.categoryId ?? "",
          content: data?.content ?? "",
          author: data?.author ?? "",
          date: data?.date ?? "",
          slug: data?.slug ?? "",
          metaTitle: data?.metaTitle ?? "",
          metaDescription: data?.metaDescription ?? "",
          // metaKeywords: data?.metaKeywords ?? "",
          coverImage: data?.coverImage ? `${data?.coverImage}` : "",
        }
      : {
          title: data?.title ?? "",
          isActive: data?.isActive ?? true,
          // categoryId: data?.categoryId ?? "",
          content: data?.content ?? "",
          author: data?.author ?? "",
          date: data?.date ?? "",
          slug: data?.slug ?? "",
          metaTitle: data?.metaTitle ?? "",
          metaDescription: data?.metaDescription ?? "",
          // metaKeywords: data?.metaKeywords ?? "",
          coverImage: data?.coverImage ? `${data?.coverImage}` : "",
        }
  );
  // Add item to the plan
  const addItem = () => {
    const newItem: IncludedItem = { id: items.length + 1, text: "" };
    setItems([...items, newItem]);
    const data = [...items, newItem];
    setKeywords(data.map((item) => item.text));
  };

  const handleMetaKeywordChange = (id: number, value: string) => {
    // Update the specific item's text based on the id
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, text: value } : item
    );

    // Set the updated items
    setItems(updatedItems);

    // Update the keywords based on the updated items
    setKeywords(updatedItems.map((item) => item.text));
  };

  // // Remove item from the plan
  // const removeItem = (id: number) => {
  //   setItems(items.filter((item) => item.id !== id));
  // };

  const removeItem = (id: number) => {
    // Remove the item from the items array
    const updatedItems = items.filter((item) => item.id !== id);

    // Update the items state
    setItems(updatedItems);

    // Update the keywords state based on the updated items
    setKeywords(updatedItems.map((item) => item.text));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value as string); // Append other data
    });

    console.log(keywords);
    try {
      const currentEndpoint = endpoints[props.formType];
      const url = form?.id ? currentEndpoint.update : currentEndpoint.create;
      keywords.forEach((keyword) => {
        formData.append("metaKeywords[]", keyword);
      });

      const resp: any = form?.id
        ? await Put(`${url}${form?.id}`, formData, 5000)
        : await Post(url, formData, 5000);

      if (resp.success) {
        const response: any = await Fetch(currentEndpoint.fetchAll);
        if (response?.success) props.setFilteredData(response?.data?.result);
        else window.location.reload(); // TODO: this should be done in future
      } else return toast.error("Failed to update blog");
    } catch (error: any) {
      console.log("Failed to update blog", error);
    } finally {
      props.onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="flex flex-col col-span-2">
          <label htmlFor="title" className="mb-2 font-semibold text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            placeholder={blogPlaceholder?.title}
            onChange={handleChange}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col col-span-2">
          <label htmlFor="slug" className="mb-2 font-semibold text-gray-700">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            placeholder={blogPlaceholder?.slug}
            onChange={handleChange}
            value={form.slug}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col col-span-2">
          <label htmlFor="date" className="mb-2 font-semibold text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            placeholder={blogPlaceholder?.date}
            onChange={handleChange}
            value={dayjs(form.date).format("YYYY-MM-DD")}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col col-span-2">
          <label htmlFor="author" className="mb-2 font-semibold text-gray-700">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder={blogPlaceholder?.author}
            onChange={handleChange}
            value={form.author}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>

        <div className="flex flex-col col-span-4">
          <label htmlFor="content" className="mb-2 font-semibold text-gray-700">
            Description
            <div className="flex flex-col col-span-3">
              <RichTextEditor setData={setForm} data={form.content} />
            </div>
          </label>
        </div>
        <div className="flex flex-col col-span-2">
          <label
            htmlFor="metaTitle"
            className="mb-2 font-semibold text-gray-700"
          >
            Meta Title
          </label>
          <input
            type="text"
            id="metaTitle"
            name="metaTitle"
            placeholder={blogPlaceholder?.metaTitle}
            onChange={handleChange}
            value={form.metaTitle}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col col-span-2">
          <label
            htmlFor="metaDescription"
            className="mb-2 font-semibold text-gray-700"
          >
            Meta Description
          </label>
          <input
            type="text"
            id="metaDescription"
            name="metaDescription"
            placeholder={blogPlaceholder?.metaDescription}
            onChange={handleChange}
            value={form.metaDescription}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col col-span-2">
          <label
            htmlFor="isActive"
            className="mb-2 font-semibold text-gray-700"
          >
            Add Meta Keywords
          </label>
          <ul>
            {items &&
              items?.map((item) => (
                <li key={item.id} className={`flex items-center mb-2`}>
                  <input
                    placeholder="Enter plan details"
                    onChange={(e: any) =>
                      handleMetaKeywordChange(item?.id, e.target.value)
                    }
                    className="p-2 border w-full border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
                    value={item.text}
                  />
                  {item.id !== 0 && (
                    <span
                      className="ml-auto text-red-500 cursor-pointer"
                      onClick={() => removeItem(item.id)}
                    >
                      <IoTrash className="text-red-600 text-lg font-bold" />
                    </span>
                  )}
                </li>
              ))}
          </ul>
          <button
            type="button"
            className="text-green-700 w-36 flex justify-start outline-none px-4 py-2 rounded"
            onClick={addItem}
          >
            Add
            <span className="border-2 border-green-700 rounded-full m-auto ml-2 p-0.5">
              <IoAdd className="font-bold" />
            </span>
          </button>
        </div>
        <div className="flex flex-col col-span-2">
          {/* <ImageUpload
            setState={setForm}
            fieldname="coverImage"
            data={form.coverImage}
          /> */}
          <SingleImageUploader
            field={{
              name: "coverImage",
              label: "Please upload a image",
              value: form?.coverImage,
              required: true,
            }}
            setFormData={setForm}
          />
        </div>
      </div>
      <div className="flex justify-start mt-3 items-center space-x-2">
        <button
          type="submit"
          className="md:col-span-2 mt-2 py-1 bg-primary hover:bg-primary/70 transition-all duration-200 ease-linear text-white rounded-md text-lg w-fit px-3"
        >
          {form.id ? "Update" : "Save"}
          <sup>+</sup>
        </button>
        <button
          type="button"
          onClick={props.onClose}
          className="md:col-span-2 mt-2 py-1 bg-red-600 transition-all duration-200 ease-linear text-white rounded-md text-lg w-fit px-3"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
