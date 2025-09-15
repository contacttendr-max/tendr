import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BasicSpeedDial from "../../components/BasicSpeedDial";

const eventTypes = {
  birthday: {
    name: "Birthday Party",
    categories: [
      { name: "Venue & Decoration", percentage: 30, color: "#F77648" },
      { name: "Food & Catering", percentage: 25, color: "#10B981" },
      { name: "Entertainment", percentage: 20, color: "#3B82F6" },
      { name: "Photography", percentage: 10, color: "#8B5CF6" },
      { name: "Cake & Desserts", percentage: 8, color: "#F59E0B" },
      { name: "Miscellaneous", percentage: 7, color: "#6B7280" }
    ]
  },
  anniversary: {
    name: "Anniversary",
    categories: [
      { name: "Venue & Decoration", percentage: 35, color: "#F77648" },
      { name: "Food & Catering", percentage: 30, color: "#10B981" },
      { name: "Entertainment", percentage: 15, color: "#3B82F6" },
      { name: "Photography", percentage: 12, color: "#8B5CF6" },
      { name: "Gifts & Flowers", percentage: 5, color: "#F59E0B" },
      { name: "Miscellaneous", percentage: 3, color: "#6B7280" }
    ]
  },
  wedding: {
    name: "Wedding",
    categories: [
      { name: "Venue & Decoration", percentage: 40, color: "#F77648" },
      { name: "Food & Catering", percentage: 25, color: "#10B981" },
      { name: "Photography & Videography", percentage: 15, color: "#8B5CF6" },
      { name: "Entertainment", percentage: 10, color: "#3B82F6" },
      { name: "Attire & Accessories", percentage: 5, color: "#F59E0B" },
      { name: "Miscellaneous", percentage: 5, color: "#6B7280" }
    ]
  },
  corporate: {
    name: "Corporate Event",
    categories: [
      { name: "Venue & Setup", percentage: 35, color: "#F77648" },
      { name: "Food & Catering", percentage: 30, color: "#10B981" },
      { name: "Audio-Visual Equipment", percentage: 15, color: "#3B82F6" },
      { name: "Marketing & Branding", percentage: 10, color: "#8B5CF6" },
      { name: "Transportation", percentage: 5, color: "#F59E0B" },
      { name: "Miscellaneous", percentage: 5, color: "#6B7280" }
    ]
  },
  party: {
    name: "Party",
    categories: [
      { name: "Venue & Decoration", percentage: 30, color: "#F77648" },
      { name: "Food & Drinks", percentage: 30, color: "#10B981" },
      { name: "Entertainment & Music", percentage: 25, color: "#3B82F6" },
      { name: "Photography", percentage: 8, color: "#8B5CF6" },
      { name: "Party Supplies", percentage: 4, color: "#F59E0B" },
      { name: "Miscellaneous", percentage: 3, color: "#6B7280" }
    ]
  }
};

export default function BudgetAllocator() {
  const location = useLocation();
  const [selectedEventType, setSelectedEventType] = useState(location.state?.eventType || "birthday");
  const [isCustomMode, setIsCustomMode] = useState(location.state?.isCustom || false);
  const [customBudgetName, setCustomBudgetName] = useState("");
  const [customCategoryNames, setCustomCategoryNames] = useState({});
  const [totalBudget, setTotalBudget] = useState(50000);
  const [customAllocations, setCustomAllocations] = useState({});
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("budget-allocator");
    if (stored) {
      const data = JSON.parse(stored);
      setSelectedEventType(data.selectedEventType || "birthday");
      setIsCustomMode(data.isCustomMode || false);
      setCustomBudgetName(data.customBudgetName || "");
      setCustomCategoryNames(data.customCategoryNames || {});
      setTotalBudget(data.totalBudget || 50000);
      setCustomAllocations(data.customAllocations || {});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("budget-allocator", JSON.stringify({
      selectedEventType,
      isCustomMode,
      customBudgetName,
      customCategoryNames,
      totalBudget,
      customAllocations
    }));
  }, [selectedEventType, isCustomMode, customBudgetName, customCategoryNames, totalBudget, customAllocations]);

  const currentEvent = isCustomMode 
    ? {
        name: customBudgetName || "Custom Budget",
        categories: [
          { name: customCategoryNames["Category 1"] || "Category 1", percentage: 25, color: "#F77648" },
          { name: customCategoryNames["Category 2"] || "Category 2", percentage: 25, color: "#10B981" },
          { name: customCategoryNames["Category 3"] || "Category 3", percentage: 25, color: "#3B82F6" },
          { name: customCategoryNames["Category 4"] || "Category 4", percentage: 25, color: "#8B5CF6" }
        ]
      }
    : eventTypes[selectedEventType];
  
  const allocations = currentEvent.categories.map(category => ({
    ...category,
    amount: Math.round((totalBudget * (customAllocations[category.name] || category.percentage)) / 100)
  }));

  const totalAllocated = allocations.reduce((sum, cat) => sum + cat.amount, 0);
  const remaining = totalBudget - totalAllocated;

  const updateAllocation = (categoryName, percentage) => {
    setCustomAllocations(prev => ({
      ...prev,
      [categoryName]: Math.max(0, Math.min(100, percentage))
    }));
  };

  const updateCategoryName = (originalName, newName) => {
    setCustomCategoryNames(prev => ({
      ...prev,
      [originalName]: newName
    }));
  };

  const resetToDefault = () => {
    setCustomAllocations({});
  };

  const exportBudget = () => {
    const data = {
      eventType: currentEvent.name,
      totalBudget,
      allocations: allocations.map(cat => ({
        category: cat.name,
        percentage: customAllocations[cat.name] || cat.percentage,
        amount: cat.amount
      })),
      remaining
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const fileName = isCustomMode 
      ? `budget-${customBudgetName.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}.json`
      : `budget-${selectedEventType}-${Date.now()}.json`;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importBudget = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.totalBudget) setTotalBudget(data.totalBudget);
        if (data.allocations) {
          const newAllocations = {};
          data.allocations.forEach(alloc => {
            newAllocations[alloc.category] = alloc.percentage;
          });
          setCustomAllocations(newAllocations);
        }
      } catch {
        alert("Error reading file!");
      }
    };
    reader.readAsText(file);
  };

  const clearBudget = () => {
    if (window.confirm("Clear all budget data?")) {
      setTotalBudget(50000);
      setCustomAllocations({});
    }
  };

  return (
    <div className="min-w-screen mx-auto p-6 bg-white min-h-screen">
      <BasicSpeedDial />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Budget Allocator</h1>
        <div className="flex gap-2">
          <button
            onClick={exportBudget}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Export
          </button>

          <label className="px-4 py-2 bg-yellow-500 text-white rounded cursor-pointer hover:bg-yellow-600 transition-colors">
            Import
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={importBudget}
            />
          </label>

          <button
            onClick={clearBudget}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Clear
          </button>

          <button
            className={`px-4 py-2 rounded transition-colors ${
              preview ? "bg-purple-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setPreview(!preview)}
          >
            {preview ? "Exit Preview" : "Preview Mode"}
          </button>
        </div>
      </div>

      {/* Event Type Selection */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <label className="block text-lg font-semibold text-gray-700">
            Budget Type:
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setIsCustomMode(false)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !isCustomMode 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Predefined
            </button>
            <button
              onClick={() => setIsCustomMode(true)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isCustomMode 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Custom
            </button>
          </div>
        </div>

        {isCustomMode ? (
          <div>
            <label htmlFor="custom-budget-name" className="block text-lg font-semibold mb-3 text-gray-700">
              Custom Budget Name:
            </label>
            <input
              id="custom-budget-name"
              type="text"
              value={customBudgetName}
              onChange={(e) => setCustomBudgetName(e.target.value)}
              placeholder="Enter your custom budget name..."
              className="border border-gray-300 rounded-lg p-3 text-lg w-full max-w-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        ) : (
          <div>
            <label htmlFor="event-type" className="block text-lg font-semibold mb-3 text-gray-700">
              Select Event Type:
            </label>
            <select
              id="event-type"
              value={selectedEventType}
              onChange={(e) => setSelectedEventType(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 text-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              {Object.entries(eventTypes).map(([key, event]) => (
                <option key={key} value={key}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Budget Input */}
      <div className="mb-8">
        <label htmlFor="total-budget" className="block text-lg font-semibold mb-3 text-gray-700">
          Total Budget (₹):
        </label>
        <input
          id="total-budget"
          type="number"
          value={totalBudget}
          onChange={(e) => setTotalBudget(Number(e.target.value))}
          className="border border-gray-300 rounded-lg p-3 text-lg w-full max-w-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          min="1000"
          step="1000"
        />
      </div>

      {preview ? (
        // Preview Mode
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">{currentEvent.name} Budget Breakdown</h2>
            <p className="text-lg">Total Budget: ₹{totalBudget.toLocaleString()}</p>
          </div>

          <div className="grid gap-4">
            {allocations.map((category, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                  <span className="text-xl font-bold text-gray-900">₹{category.amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${(customAllocations[category.name] || category.percentage)}%`,
                      backgroundColor: category.color
                    }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {(customAllocations[category.name] || category.percentage)}% of total budget
                </p>
              </div>
            ))}
          </div>

          {remaining !== 0 && (
            <div className={`p-4 rounded-lg ${remaining > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <p className="font-semibold">
                {remaining > 0 ? `Remaining Budget: ₹${remaining.toLocaleString()}` : `Over Budget: ₹${Math.abs(remaining).toLocaleString()}`}
              </p>
            </div>
          )}
        </div>
      ) : (
        // Edit Mode
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Budget Allocation</h2>
            <button
              onClick={resetToDefault}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Reset to Default
            </button>
          </div>

          <div className="grid gap-6">
            {currentEvent.categories.map((category, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  {isCustomMode ? (
                    <input
                      type="text"
                      value={customCategoryNames[`Category ${index + 1}`] || `Category ${index + 1}`}
                      onChange={(e) => updateCategoryName(`Category ${index + 1}`, e.target.value)}
                      className="text-lg font-semibold text-gray-800 bg-transparent border-b border-gray-300 focus:border-orange-500 focus:outline-none"
                      placeholder={`Category ${index + 1}`}
                    />
                  ) : (
                    <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                  )}
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{allocations[index].amount.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={customAllocations[category.name] || category.percentage}
                        onChange={(e) => updateAllocation(category.name, Number(e.target.value))}
                        className="w-20 p-2 border border-gray-300 rounded text-center"
                        min="0"
                        max="100"
                        step="1"
                      />
                      <span className="text-gray-600">%</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div
                    className="h-4 rounded-full transition-all duration-300"
                    style={{
                      width: `${customAllocations[category.name] || category.percentage}%`,
                      backgroundColor: category.color
                    }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Default: {category.percentage}%</span>
                  <span>Current: {customAllocations[category.name] || category.percentage}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Budget Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalBudget.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Allocated</p>
                <p className="text-2xl font-bold text-blue-600">₹{totalAllocated.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Remaining</p>
                <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{remaining.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
