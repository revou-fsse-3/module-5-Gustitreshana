import Layout from "../../components/Layout/MainLayout";
import { useState } from "react";
import { GetServerSidePropsContext } from "next";

interface UpdateCategoryProps {
  initialCategoryData: {
    id: string;
    name: string;
    is_active: boolean;
  };
}

const UpdateCategory: React.FC<UpdateCategoryProps> = ({
  initialCategoryData,
}) => {
  const [categoryName, setCategoryName] = useState(initialCategoryData.name);
  const [status, setStatus] = useState(
    initialCategoryData.is_active ? "true" : "false"
  );
  const [error, setError] = useState<string>("");

  const handleCategoryNameChange = (e: any) => {
    setCategoryName(e.target.value);
  };

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value);
  };

  const handleUpdateCategory = async () => {
    const token = window.sessionStorage.getItem("token");
    try {
      const updatedCategory = {
        id: initialCategoryData.id,
        name: categoryName,
        is_active: status === "true",
      };
      console.log("Updated Category:", updatedCategory);

      const response = await fetch(
        `https://mock-api.arikmpt.com/api/category/update`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCategory),
        }
      );

      console.log("Response Status:", response.status);

      if (!response.ok) {
        setError("Category not found or an error occurred.");
        console.error("Update category error:", await response.text());
      } else {
        console.log("Category updated successfully");
      }
    } catch (error) {
      setError("Failed to update category.");
      console.error("Update category error:", error);
    }
  };

  return (
    <Layout>
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        style={{
          background: "linear-gradient(to right, #000000, #0000FF, #800080)",
        }}
      >
        <div className="mb-20">
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4 text-black">Update Category</h1>
          <div className="mb-4">
            <label htmlFor="categoryName" className="text-black">
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
          <div className="mb-4">
            <label htmlFor="status" className="text-black">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={handleStatusChange}
              className="w-full border rounded p-2 text-black"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="mt-6">
            <button
              onClick={handleUpdateCategory}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
          {error && <div className="text-red-500">{error}</div>}
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const categoryId = context.query.id;
  console.log("Category ID from URL:", categoryId);
  const response = await fetch(
    `https://mock-api.arikmpt.com/api/category/${categoryId}`
  );

  const initialCategoryData = {
    id: categoryId,
    name: "",
    is_active: true,
  };

  return {
    props: {
      initialCategoryData,
    },
  };
};

export default UpdateCategory;
