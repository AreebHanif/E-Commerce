import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/Api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/Api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: productData } = useGetProductByIdQuery(params._id);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [category, setCategory] = useState(productData?.category || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [price, setPrice] = useState(productData?.price || "");
  const [stock, setStock] = useState(productData?.countInStock || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");

  const { data: categories = [] } = useFetchCategoriesQuery();

  useEffect(() => {
    if (productData && productData?._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setStock(productData.countInStock);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    formData.append("image",e.target.files[0])
    try {
      const res = await uploadProductImage(formData).unwrap()
      toast.success("Item Updated Successff=ully")
      const imagePath = `http://localhost:5000/${res.image.replace(
        /\\/g,
        "/"
      )}`;
      setImage(imagePath)
    } catch (error) {
      toast.error("Image Upload Error")
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("category", category);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const data = await updateProduct({productId:params._id,formData}).unwrap();

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is updated successfully`);
        navigate("/admin/allproducts");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product update failed. Try again");
    }
  };

  const handleDelete = async (e) => {
    try {
      const answer = window.confirm("Are you sure ?")
      if(!answer) return 
      const res = await deleteProduct(params._id).unwrap()
      toast.success("Product Deleted Successfully")
      navigate("/admin/allproducts")
    } catch (error) {
      toast.error("Product Deletion failed")
    }
  }

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        {/* Admin Menu */}
        <AdminMenu />
        <div className="md:w-3/4">
          <h1 className="h-12 font-bold text-[25px] m-4">Create Product</h1>

          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {" "}
              {image ? image.name : "Upload Product Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                className={!image ? "hidden" : "text-white"}
                onChange={uploadFileHandler}
              />
            </label>
          </div>
          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter product name"
                />
              </div>
              <div className="two ml-10">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter Price"
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Quantity</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter Quantity"
                />
              </div>
              <div className="two ml-10">
                <label htmlFor="name block">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Enter Brand"
                />
              </div>
            </div>
            <label htmlFor="" className="my-5">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-[#101011] border rounded-lg text-white w-[95%]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="flex flex-wrap">
              <div>
                <label htmlFor="name block">Count In Stock</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="ml-10">
                <label htmlFor="">Category</label> <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Choose a category" className="text-white">
                    Choose a Category
                  </option>
                  {categories?.map((c) => (
                    <option value={c._id} key={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <button
                onClick={handleUpdate}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-blod bg-green-500 hover:bg-green-600 mr-6"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="py-4 px-10 mt-5 rounded-lg text-lg font-blod bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
