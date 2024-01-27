import Layout from "../../components/Layout/MainLayout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';


interface Category {
  id: string;
  name: string;
  is_active: boolean;
  status: string;
}

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [triggerCallApi, setTriggerCallApi] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = window.sessionStorage.getItem("token");

  const router = useRouter();
  
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  console.log(headers);

  const fetchData = () => {
    fetch("https://mock-api.arikmpt.com/api/category/", {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch categories, you must login first!");
        }
        return response.json();
      })
      .then((data) => {
        const updatedCategories = data.data.map((category: Category) => ({
          id: category.id,
          name: category.name,
          status: String(category.is_active),
        }));
        setCategories(updatedCategories);
      })
      .catch((err) => {
        setError(err.message || "An error occurred while fetching categories.");
      });
  };


  const handleEdit = (categoryId: string) => {
  router.push(`/category/updateCategory?id=${categoryId}`);
};

  const handleDelete = async (categoryId: String) => {
    console.log("Delete category with ID:", categoryId);
    await fetch("https://mock-api.arikmpt.com/api/category/" + categoryId, {
      method: "DELETE",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete.");
        }
        return response.json();
      })
      .then(() => {
        setTriggerCallApi(true);
      })
      .catch((err) => {
        setError(err.message || "An error occurred while deleting.");
      });

    setTriggerCallApi(true);
  };

  useEffect(() => {
    if (triggerCallApi) {
      fetchData();
      setTriggerCallApi(false);
    }
  }, [triggerCallApi]);

  return (
    <div>
      <Layout children={undefined} />
      <div
        className="p-8 shadow-md min-h-screen"
        style={{
          background: "linear-gradient(to right, #000000, #0000FF, #800080)",
        }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Category List
        </h2>
        {error && <div className="text-red-500">{error}</div>}
        <div className="max-w-screen-md mx-auto">
          <div className="flex justify-center items-center mb-5">
            <Link href="/category/addCategory">
              <p className="text-xl hover:text-pink-500 hover:border-pink-500 cursor-pointer">
                👉 Add Category Here 👈
              </p>
            </Link>
          </div>
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">NAMA</th>
                <th className="px-4 py-2">STATUS</th>
                <th className="px-4 py-2">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-4 py-2 text-black">{category.id}</td>
                  <td className="px-4 py-2 text-black">{category.name}</td>
                  <td className="px-4 py-2 text-black">{category.status}</td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center items-center">
                    <button
                      onClick={() => handleEdit(category.id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    </div>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
