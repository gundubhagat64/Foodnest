import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

function RestaurantMenu() {
  const [foods, setFoods] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Biryani");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchFoods = async () => {
    setError("");

    const { data, error: fetchError } = await supabase
      .from("foods")
      .select("*");

    if (fetchError) {
      setError(fetchError.message);
      setFoods([]);
      return;
    }

    setFoods(data || []);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");
    setMessage("");
  };

  const resetForm = () => {
    setName("");
    setCategory("Biryani");
    setPrice("");
    setDescription("");
    setImage(null);
    setImagePreview("");
    setEditingFood(null);
    setShowForm(false);
  };

  // ADD FOOD
  const handleAddFood = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!name || !price || !description) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";

      if (image) {
        const fileExtension = image.name.split(".").pop();

        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${fileExtension}`;

        const filePath = `foods/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("food-images")
          .upload(filePath, image);

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("food-images")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase
        .from("foods")
        .insert([
          {
            name,
            category,
            price: Number(price),
            description,
            image_url: imageUrl,
            available: true,
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      setMessage("Food item added successfully.");

      resetForm();
      await fetchFoods();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // START EDIT
  const handleEdit = (food) => {
    setEditingFood(food);

    setName(food.name || "");
    setCategory(food.category || "Biryani");
    setPrice(food.price || "");
    setDescription(food.description || "");
    setImage(null);
    setImagePreview(food.image_url || "");

    setShowForm(true);
    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // UPDATE FOOD
  const handleUpdateFood = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!name || !price || !description) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = editingFood?.image_url || "";

      // Upload new image only if selected
      if (image) {
        const fileExtension = image.name.split(".").pop();

        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${fileExtension}`;

        const filePath = `foods/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("food-images")
          .upload(filePath, image);

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("food-images")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      const { error: updateError } = await supabase
        .from("foods")
        .update({
          name,
          category,
          price: Number(price),
          description,
          image_url: imageUrl,
        })
        .eq("id", editingFood.id);

      if (updateError) {
        throw updateError;
      }

      setMessage("Food item updated successfully.");

      resetForm();
      await fetchFoods();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // AVAILABILITY
  const toggleAvailability = async (food) => {
    setError("");
    setMessage("");

    const newAvailability = !food.available;

    const { error: updateError } = await supabase
      .from("foods")
      .update({
        available: newAvailability,
      })
      .eq("id", food.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setFoods(
      foods.map((item) =>
        item.id === food.id
          ? {
              ...item,
              available: newAvailability,
            }
          : item
      )
    );

    setMessage(
      newAvailability
        ? `${food.name} is now available.`
        : `${food.name} is now out of stock.`
    );
  };

  // DELETE
  const deleteFood = async (id) => {
    setError("");
    setMessage("");

    const food = foods.find((item) => item.id === id);

    const confirmed = window.confirm(
      `Delete ${food?.name || "this food item"}?`
    );

    if (!confirmed) return;

    const { error: deleteError } = await supabase
      .from("foods")
      .delete()
      .eq("id", id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setFoods(foods.filter((item) => item.id !== id));

    setMessage(
      food
        ? `${food.name} deleted successfully.`
        : "Food deleted successfully."
    );
  };

  return (
    <div className="min-h-screen bg-[#090807] px-5 py-8 text-[#f5f1e8] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>
            <p className="text-[10px] font-black uppercase tracking-[3px] text-[#e5a13a]">
              FOODNEST KITCHEN
            </p>

            <h1 className="mt-2 text-3xl font-black sm:text-4xl">
              Menu Management
            </h1>

            <p className="mt-2 text-xs text-[#777067]">
              Add, update and manage your restaurant food items.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                setShowForm(true);
                setEditingFood(null);
                setMessage("");
                setError("");
              }
            }}
            className="rounded-xl bg-[#e5a13a] px-5 py-3 text-xs font-black text-[#17120b] transition hover:bg-[#f0ad43]"
          >
            {showForm
              ? "Close Form"
              : "+ Add Food"}
          </button>

        </div>

        {/* SUCCESS */}
        {message && (
          <div className="mt-5 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-xs font-semibold text-green-400">
            {message}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs font-semibold text-red-400">
            {error}
          </div>
        )}

        {/* FORM */}
        {showForm && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-[#11100f] p-6 shadow-xl">

            <div className="flex items-center justify-between gap-4">

              <div>
                <h2 className="text-lg font-black">
                  {editingFood
                    ? "Edit Food Item"
                    : "Add New Food Item"}
                </h2>

                <p className="mt-1 text-[10px] text-[#777067]">
                  {editingFood
                    ? "Update your food details."
                    : "Add a new item to your restaurant menu."}
                </p>
              </div>

              {editingFood && (
                <span className="rounded-lg bg-[#e5a13a]/10 px-3 py-2 text-[9px] font-bold text-[#e5a13a]">
                  EDIT MODE
                </span>
              )}

            </div>

            <form
              onSubmit={
                editingFood
                  ? handleUpdateFood
                  : handleAddFood
              }
              className="mt-6 grid gap-5 sm:grid-cols-2"
            >

              {/* NAME */}
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-[#817a71]">
                  Food Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Example: Paneer Tikka"
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-[#514d47] focus:border-[#e5a13a]/50"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-[#817a71]">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-12 w-full rounded-xl border border-white/10 bg-[#171513] px-4 text-sm text-white outline-none focus:border-[#e5a13a]/50"
                >
                  <option>Biryani</option>
                  <option>Pizza</option>
                  <option>Burger</option>
                  <option>Starters</option>
                  <option>Chinese</option>
                  <option>Desserts</option>
                </select>
              </div>

              {/* PRICE */}
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-[#817a71]">
                  Price
                </label>

                <input
                  type="number"
                  min="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="₹ 249"
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-[#514d47] focus:border-[#e5a13a]/50"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-[#817a71]">
                  Description
                </label>

                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description"
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-[#514d47] focus:border-[#e5a13a]/50"
                />
              </div>

              {/* IMAGE */}
              <div className="sm:col-span-2">

                <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-[#817a71]">
                  Food Image
                </label>

                <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.025] p-5">

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="block w-full text-xs text-[#817a71] file:mr-4 file:rounded-lg file:border-0 file:bg-[#e5a13a] file:px-4 file:py-2 file:text-xs file:font-bold file:text-[#17120b]"
                  />

                  {imagePreview && (
                    <div className="mt-5">

                      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#817a71]">
                        Preview
                      </p>

                      <img
                        src={imagePreview}
                        alt="Food preview"
                        className="h-40 w-full rounded-2xl object-cover sm:w-64"
                      />

                    </div>
                  )}

                </div>

              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-3 sm:col-span-2">

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-[#e5a13a] px-6 py-3 text-xs font-black text-[#17120b] transition hover:bg-[#f0ad43] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : editingFood
                    ? "Update Food"
                    : "Save Food Item"}
                </button>

                {editingFood && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-white/10 px-6 py-3 text-xs font-bold text-[#aaa29a] transition hover:border-white/20 hover:text-white"
                  >
                    Cancel Edit
                  </button>
                )}

              </div>

            </form>

          </div>
        )}

        {/* MENU */}
        <div className="mt-8">

          <div className="mb-4 flex items-center justify-between">

            <h2 className="text-lg font-black">
              Your Menu
            </h2>

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-bold text-[#817a71]">
              {foods.length} Items
            </span>

          </div>

          {foods.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#11100f] px-6 py-14 text-center">

              <div className="text-5xl">
                🍽️
              </div>

              <h3 className="mt-4 text-lg font-black">
                No food items yet
              </h3>

              <p className="mt-2 text-xs text-[#777067]">
                Click "+ Add Food" to add your first menu item.
              </p>

            </div>
          ) : (
            <div className="grid gap-4">

              {foods.map((food) => (
                <div
                  key={food.id}
                  className="rounded-2xl border border-white/10 bg-[#11100f] p-5 transition hover:border-[#e5a13a]/20"
                >

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    {/* FOOD INFO */}
                    <div className="flex gap-4">

                      {food.image_url ? (
                        <img
                          src={food.image_url}
                          alt={food.name}
                          className="h-16 w-16 shrink-0 rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#e5a13a]/10 text-3xl">
                          🍽️
                        </div>
                      )}

                      <div>

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="font-black text-white">
                            {food.name}
                          </h3>

                          <span className="rounded-full bg-[#e5a13a]/10 px-2 py-1 text-[9px] font-bold text-[#e5a13a]">
                            {food.category}
                          </span>

                        </div>

                        <p className="mt-1 text-xs text-[#777067]">
                          {food.description}
                        </p>

                        <p className="mt-2 text-sm font-black text-[#e5a13a]">
                          ₹{food.price}
                        </p>

                      </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex flex-wrap items-center gap-2">

                      <button
                        type="button"
                        onClick={() => toggleAvailability(food)}
                        className={`rounded-lg px-3 py-2 text-[10px] font-bold ${
                          food.available
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {food.available
                          ? "Available"
                          : "Out of Stock"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleEdit(food)}
                        className="rounded-lg border border-white/10 px-3 py-2 text-[10px] font-bold text-[#aaa29a] transition hover:border-[#e5a13a]/30 hover:text-[#e5a13a]"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteFood(food.id)}
                        className="rounded-lg border border-red-500/10 px-3 py-2 text-[10px] font-bold text-red-400 transition hover:bg-red-500/10"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default RestaurantMenu;