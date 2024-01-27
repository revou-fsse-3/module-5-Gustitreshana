import Layout from "../../components/Layout/MainLayout";
import { SetStateAction, useState } from "react";
import { useEffect } from "react";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionToken = window.sessionStorage.getItem("token");
      if (sessionToken) {
        setToken(sessionToken);
      }
    }
  }, []);

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const handleCategoryNameChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setCategoryName(e.target.value);
  };

  const handleAddCategory = async () => {
    try {
      const response = await fetch(
        "https://mock-api.arikmpt.com/api/category/create",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ name: categoryName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create category.");
      }

      const data = await response.json();
      console.log("Category created:", data);

      setCategoryName("");
    } catch (error: any) {
      setError("Failed to create category.");
      console.error("Create category error:", error.message);
    }
  };

  return (
    <Layout>
      <div
        className="p-8 shadow-md min-h-screen"
        style={{
          background: "linear-gradient(to right, #000000, #0000FF, #800080)",
        }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-white">Add Category</h2>
        {error && <div className="text-red-500">{error}</div>}
        <div className="max-w-screen-md mx-auto">
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-white">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={categoryName}
              onChange={handleCategoryNameChange}
              className="w-full border rounded p-2 text-black"
            />
          </div>
          <div className="mt-6">
            <button
              onClick={handleAddCategory}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Category
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
