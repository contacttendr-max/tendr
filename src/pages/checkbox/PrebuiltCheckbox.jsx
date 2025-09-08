import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import BasicSpeedDial from "../../components/BasicSpeedDial";

// Hardcoded default tasks for different events
const defaultTasks = {
  wedding: [
    { id: "1", title: "Book venue", description: "Confirm and pay deposit", checked: false },
    { id: "2", title: "Hire photographer", description: "Finalize package", checked: false },
    { id: "3", title: "Send invitations", description: "Mail or digital", checked: false },
  ],
  birthday: [
    { id: "4", title: "Choose theme", description: "Pick decorations/colors", checked: false },
    { id: "5", title: "Order cake", description: "Chocolate or vanilla?", checked: false },
    { id: "6", title: "Plan games", description: "Activities for guests", checked: false },
  ],
  corporate: [
    { id: "7", title: "Book conference hall", description: "Check capacity", checked: false },
    { id: "8", title: "Arrange catering", description: "Lunch + coffee breaks", checked: false },
    { id: "9", title: "Send agenda", description: "Distribute via email", checked: false },
  ],
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export default function CheckBox() {
  const [events, setEvents] = useState([]);
  const [preview, setPreview] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("checkbox");
    if (stored) {
      setEvents(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("checkbox", JSON.stringify(events));
  }, [events]);

  const handleSelectEvent = (e) => {
    const value = e.target.value;
    setSelectedEvent(value);
    if (value && defaultTasks[value]) {
      setEvents(defaultTasks[value]); // load defaults
    } else {
      setEvents([]);
    }
  };

  const addEvent = () => {
    const newEvent = {
      id: Date.now().toString(),
      title: "",
      description: "",
      checked: false,
    };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (id, field, value) => {
    setEvents(events.map(e => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const toggleCheckbox = (id) => {
    setEvents(events.map(e => (e.id === id ? { ...e, checked: !e.checked } : e)));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = reorder(events, result.source.index, result.destination.index);
    setEvents(reordered);
  };

  const exportTimeline = () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "timeline.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importTimeline = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          alert("Invalid file format!");
        }
      } catch {
        alert("Error reading file!");
      }
    };
    reader.readAsText(file);
  };

  const clearTimeline = () => {
    if (window.confirm("Clear all events?")) {
      setEvents([]);
    }
  };

  return (
    <div className="min-w-screen mx-auto p-6 bg-white min-h-screen">
      <BasicSpeedDial/>

      {/* Event selector */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-700">Choose Event:</label>
        <select
          value={selectedEvent}
          onChange={handleSelectEvent}
          className="border rounded px-4 py-2"
        >
          <option value="">-- Select Event --</option>
          <option value="wedding">Wedding</option>
          <option value="birthday">Birthday</option>
          <option value="corporate">Corporate</option>
        </select>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Checklist Builder</h1>
        <div className="flex gap-2">
          <button onClick={addEvent} className="px-4 py-2 bg-blue-500 text-white rounded">
            + Add Event
          </button>
          <button onClick={exportTimeline} className="px-4 py-2 bg-green-500 text-white rounded">
            Export
          </button>
          <label className="px-4 py-2 bg-yellow-500 text-white rounded cursor-pointer">
            Import
            <input type="file" accept=".json" className="hidden" onChange={importTimeline} />
          </label>
          <button onClick={clearTimeline} className="px-4 py-2 bg-red-500 text-white rounded">
            Clear
          </button>
          <button
            className={`px-4 py-2 rounded ${preview ? "bg-purple-600 text-white" : "bg-gray-200"}`}
            onClick={() => setPreview(!preview)}
          >
            {preview ? "Exit Preview" : "Preview Mode"}
          </button>
        </div>
      </div>

      {preview ? (
        // ✅ Preview mode
        <div className="space-y-4">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`border p-4 rounded-lg shadow bg-white flex items-start gap-3 ${
                event.checked ? "opacity-60 line-through" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={event.checked}
                onChange={() => toggleCheckbox(event.id)}
              />
              <div>
                <h2 className="text-lg font-semibold">
                  {index + 1}. {event.title || "Untitled"}
                </h2>
                <p className="text-gray-600">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // ✅ Editable mode with drag/drop
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="timeline">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                {events.map((event, index) => (
                  <Draggable key={event.id} draggableId={event.id} index={index}>
                    {(provided) => (
                      <div
                        className="flex items-center gap-4 border p-4 rounded-lg bg-gray-50"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <input
                          type="checkbox"
                          checked={event.checked}
                          onChange={() => toggleCheckbox(event.id)}
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Event title"
                            value={event.title}
                            onChange={(e) => updateEvent(event.id, "title", e.target.value)}
                            className="w-full border p-2 rounded mb-2"
                          />
                          <textarea
                            placeholder="Event description"
                            value={event.description}
                            onChange={(e) =>
                              updateEvent(event.id, "description", e.target.value)
                            }
                            className="w-full border p-2 rounded"
                          />
                        </div>
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="px-3 py-1 bg-red-400 text-white rounded"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}
