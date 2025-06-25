import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/Api/categoryApiSlice";
import { toast } from "react-toastify";

import CategoryForm from "../../components/CategoryForm";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";

function CategoryList() {
  const { data: categories } = useFetchCategoriesQuery();

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const createCategorySubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Please enter category name");
      return;
    }
    try {
      const res = await createCategory({ name }).unwrap();
      if (res.error) {
        toast.error("Error creating category");
        return;
      } else {
        toast.success(`${res.name} created successfully`);
        setName("");
      }
    } catch (error) {
      toast.error("Error creating category,Category List");
    }
  };
  const handleUpdateCategory = async (e) => {
    e.preventDefault()
    if(!updatingName) {
      toast.error("Please enter category name");
      return;
    }
    try {
        const res = await updateCategory({categoryId: selectedCategory._id, updatedCategory:{
            name: updatingName,
        }}).unwrap();
        if(res.error) {
            toast.error("Error updating category");
            return;
        }else{
          toast.success(`${res.name} updated successfully`);
          setModalVisible(false);
          setUpdatingName("");
          setSelectedCategory(null);
        }
    } catch (error) {
        toast.error("Error updating category");
    }
  }
  const handleDeleteCategory = async (e) =>{
    e.preventDefault()
    const res = await deleteCategory(selectedCategory._id).unwrap()
    if(res.error){
      console.error("Error deleting category")
      toast.error("Error deleting category")
    }else{
      toast.success(`${res.name} deleted successfully`)
      setModalVisible(false)
      setSelectedCategory(null)
    }
  }

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-4">
        <div className="h-12">Manage Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={createCategorySubmit}
        />
        <br />
        <hr />
        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="border border-pink-500 text-pink-500 py-2 px-4 rounded-lg hover:bg-pink-500 hover:text-white m-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  setSelectedCategory(category);
                  setUpdatingName(category.name);
                  setModalVisible(true);
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
}

export default CategoryList;
