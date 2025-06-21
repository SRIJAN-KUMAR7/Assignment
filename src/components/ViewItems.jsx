import React, { useState, useEffect } from "react";

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
  const fetchItems = () => {
    const stored = JSON.parse(localStorage.getItem("items")) || [];
    setItems(stored);
  };
  fetchItems();
  const handleStorageChange = (e) => {
    if (e.key === "items") {
      fetchItems();
    }
  };

  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const handleEnquire = async () => {
    if (!selectedItem) return;
    try {
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_demo",
          template_id: "template_demo",
          user_id: "user_demo",
          template_params: {
            to_email: "demo@example.com",
            item_name: selectedItem.itemName,
            item_type: selectedItem.itemType,
            item_description: selectedItem.itemDescription,
          },
        }),
      });
      alert("Enquiry Sent!");
    } catch (err) {
      alert("Enquiry Sent (simulated)");
    }
  };

  return (
    <div id="view" className="min-h-screen bg-gray-900 text-white">
      <main className="pt-24 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">View Items</h1>

        {items.length === 0 ? (
          <p className="text-center text-gray-400">No items available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white text-black rounded-lg shadow hover:shadow-xl overflow-hidden relative"
              >
                <img
                  src={item.coverImageURL}
                  alt={item.itemName}
                  className="w-full h-48 object-cover cursor-pointer"
                  onClick={() => handleItemClick(item)}
                />
                <div className="p-4">
                  <h2 className="font-bold text-lg truncate">{item.itemName}</h2>
                  <p className="text-sm text-gray-500 capitalize">{item.itemType}</p>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="mt-2 text-sm bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && selectedItem && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <div className="bg-white text-black rounded-lg max-w-3xl w-full p-6 overflow-y-auto max-h-[90vh] relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 text-gray-600 text-xl"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4">{selectedItem.itemName}</h2>
              <p className="mb-4 text-gray-700">{selectedItem.itemDescription}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[selectedItem.coverImageURL, ...(selectedItem.additionalImagesURLs || [])].map(
                  (img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`img-${i}`}
                      className="w-full h-48 object-cover rounded"
                    />
                  )
                )}
              </div>
              <button
                onClick={handleEnquire}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded"
              >
                Enquire
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewItems;
