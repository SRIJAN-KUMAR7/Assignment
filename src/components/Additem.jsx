import React, { useState, useRef } from "react";
import { Navbar } from "./Navbar";

const AddItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemType, setItemType] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  const coverImageRef = useRef();
  const additionalImagesRef = useRef();

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!itemName || !itemType || !itemDescription || !coverImage) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const coverImageBase64 = await toBase64(coverImage);
      const additionalImagesBase64 = await Promise.all(
        additionalImages.map(file => toBase64(file))
      );

      const newItem = {
        id: Date.now().toString(),
        itemName,
        itemType,
        itemDescription,
        coverImageURL: coverImageBase64,
        additionalImagesURLs: additionalImagesBase64,
      };

      const existingItems = JSON.parse(localStorage.getItem("items")) || [];
      const updatedItems = [...existingItems, newItem];
      localStorage.setItem("items", JSON.stringify(updatedItems));

      alert("Item successfully added!");

      // Reset form
      setItemName("");
      setItemType("");
      setItemDescription("");
      setCoverImage(null);
      setAdditionalImages([]);
      coverImageRef.current.value = "";
      additionalImagesRef.current.value = "";
    } catch (error) {
      console.error("Error processing images:", error);
      alert("Error adding item. Please try again.");
    }
  };

  return (
    <div id="add" className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="pt-24 px-4 max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">+ Add New Item</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1">Item Name *</label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
                className="w-full bg-gray-100 text-black border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1">Item Type *</label>
              <select
                value={itemType}
                onChange={(e) => setItemType(e.target.value)}
                required
                className="w-full bg-gray-100 text-black border rounded px-3 py-2"
              >
                <option value="">Select item type</option>
                <option value="shirt">Shirt</option>
                <option value="pants">Pants</option>
                <option value="shoes">Shoes</option>
                <option value="sports-gear">Sports Gear</option>
                <option value="accessories">Accessories</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Item Description *</label>
              <textarea
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                required
                rows="4"
                className="w-full bg-gray-100 text-black border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1">Cover Image *</label>
              <input
                type="file"
                accept="image/*"
                required
                ref={coverImageRef}
                onChange={(e) => setCoverImage(e.target.files[0])}
                className="w-full bg-gray-100 text-black border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block mb-1">Additional Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                ref={additionalImagesRef}
                onChange={(e) => setAdditionalImages([...e.target.files])}
                className="w-full bg-gray-100 text-black border rounded px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
            >
              + Add Item
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddItem;
