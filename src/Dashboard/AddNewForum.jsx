import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadImage } from "../Hooks/imageUpload";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const AddNewForum = () => {
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [tags, setTags] = useState([]);
  const axiosSecure = useAxiosSecure();

  const { data: role = "", isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/user/role/${user?.email}`);
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (newBlog) => {
      const { data } = await axiosSecure.post(
        `/addBlog?email=${user?.email}`,
        newBlog,
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        Swal.fire({
          title: "Success",
          text: "You successfully added a new blog.",
          icon: "success",
        });
      } else {
        toast.error("Something went wrong!");
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const photo = form.photo.files[0];
    const description = form.description.value;
    const category = form.category.value;

    if (tags.length === 0) return toast.error("Please enter tag!!");

    try {
      const photo_url = await uploadImage(photo);
      const forumData = {
        author: user?.displayName,
        author_img: user?.photoURL,
        role: role,
        likes: 0,
        dislikes: 0,
        postDate: new Date().toLocaleDateString(),
        postDate1: Math.floor(Date.now() / 1000),
        title,
        image: photo_url,
        description,
        category,
        tags,
      };
      await mutateAsync(forumData);
      form.reset();
      setTags([]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddTag = () => {
    const tag = document.getElementById("tag").value;
    if (tag) setTags([...tags, tag]);
    document.getElementById("tag").value = "";
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (

      <div className="container mx-auto px-4">
         <Helmet>
          <title>Add New Forum | Fit N Flex Arena</title>
        </Helmet>
        <div className="flex w-full items-center justify-center">
          <div className="my-20 w-full rounded-3xl border border-amber-500 bg-white p-8 py-12 shadow-xl shadow-amber-200 lg:w-10/12 2xl:w-3/4">
            <h2 className="mb-8 text-center text-3xl font-semibold text-amber-500">
              Add New Forum
            </h2>
            <p className="mb-8 text-center text-gray-700">
              Share your thoughts with the community.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    name="title"
                    type="text"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Photo</span>
                  </label>
                  <input
                    name="photo"
                    type="file"
                    className="file-input file-input-bordered w-full"
                  />
                </div>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <input
                  name="category"
                  type="text"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered h-24 w-full"
                  required
                ></textarea>
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-end">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Tag</span>
                  </label>
                  <input
                    id="tag"
                    name="tag"
                    type="text"
                    className="input input-bordered w-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="btn btn-primary border-2 border-amber-400 bg-transparent text-xl text-amber-400 shadow-lg shadow-amber-300 hover:border-amber-400 hover:bg-amber-400 hover:text-white"
                >
                  Add Tag
                </button>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Tags</span>
                </label>
                <textarea
                  name="tags"
                  value={tags.join(", ")}
                  readOnly
                  className="textarea textarea-bordered h-16 w-full"
                ></textarea>
              </div>
              <div className="text-right">
                <button type="submit" className="btn btn-outline border-2 border-amber-500 bg-transparent text-xl text-amber-500 shadow-lg shadow-amber-300 hover:border-amber-500 hover:bg-amber-500 hover:text-white">
                  Add Post
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>

  );
};

export default AddNewForum;
