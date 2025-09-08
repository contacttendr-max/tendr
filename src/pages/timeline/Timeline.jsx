import { Chrono } from "react-chrono";
import TimelineItems from "../../components/TimelineItems";
import React, { useState } from "react";

function Timeline() {
  const timelineKeys = Object.keys(TimelineItems).filter(
    (key) => TimelineItems[key].length > 0
  );

  // Store a copy in state (so we can edit it)
  const [timelines, setTimelines] = useState(TimelineItems);
  const [selected, setSelected] = useState(timelineKeys[0]);

  const items = timelines[selected];

  // Update an item in the selected timeline
  const updateItem = (index, field, value) => {
    const updatedTimeline = [...timelines[selected]];
    updatedTimeline[index] = { ...updatedTimeline[index], [field]: value };

    setTimelines({ ...timelines, [selected]: updatedTimeline });
  };

  // Add new item
  const addItem = () => {
    const newItem = {
      title: "New Event",
      cardTitle: "Untitled",
      cardSubtitle: "Subtitle",
      cardDetailedText: "Details go here...",
    };
    setTimelines({
      ...timelines,
      [selected]: [...timelines[selected], newItem],
    });
  };

  return (
    <div className="bg-white">
      {/* Dropdown */}
      <div className="flex items-center justify-center ">
        <label htmlFor="timeline-select" style={{ marginRight: 8, marginTop:15, marginBottom:10 }}>
          Choose a timeline:
        </label>
        <select
          id="timeline-select"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border border-gray-600 rounded p-2 m-5"
        >
          {timelineKeys.map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Timeline View */}
      <Chrono
        items={items}
        mode="VERTICAL_ALTERNATING"
        theme={{
          primary: "#F77648",
          secondary: "#F77648",
          cardBgColor: "#f8fafc",
          cardTitleColor: "#1e293b",
          titleColor: "#FF7A49",
          titleColorActive: "#f8fafc",
        }}
        cardTitleStyle={{ fontWeight: "bold", fontSize: "1.5rem" }}
        cardSubtitleStyle={{ fontWeight: "600", fontSize: "1.1rem" }}
        cardDetailedTextStyle={{ fontWeight: "500", fontSize: "1rem" }}
      />

      {/* Editing Section */}
      <div className="mt-6 p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-bold mb-2">Edit Timeline Items</h2>
        {items.map((item, index) => (
          <div key={index} className="mb-4 p-2 border rounded bg-white">
            <input
              type="text"
              value={item.cardTitle}
              onChange={(e) => updateItem(index, "cardTitle", e.target.value)}
              placeholder="Card Title"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              value={item.cardSubtitle}
              onChange={(e) =>
                updateItem(index, "cardSubtitle", e.target.value)
              }
              placeholder="Card Subtitle"
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              value={item.cardDetailedText}
              onChange={(e) =>
                updateItem(index, "cardDetailedText", e.target.value)
              }
              placeholder="Details"
              className="w-full p-2 border rounded"
            />
          </div>
        ))}

        <button
          onClick={addItem}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          + Add Event
        </button>
      </div>
    </div>
  );
}

export default Timeline;
