import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function TimelineBuilder() {
  const [events, setEvents] = useState([
    { id: "1", title: "Event 1", description: "Description 1", checked: false },
    { id: "2", title: "Event 2", description: "Description 2", checked: false },
  ]);

  const [preview, setPreview] = useState(false);

  // Drag and drop reorder
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(events);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setEvents(items);
  };

  // Add new event
  const addEvent = () => {
    setEvents([
      ...events,
      { id: Date.now().toString(), title: "", description: "", checked: false },
    ]);
  };

  // Update field
  const updateEvent = (id, field, value) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  // Toggle checkbox
  const toggleCheckbox = (id) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, checked: !e.checked } : e)));
  };

  return (
    <div className="p-6 min-h-screen mx-auto bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Custom Timeline Builder</h1>
        <button
          onClick={() => setPreview(!preview)}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white"
        >
          {preview ? "Edit Mode" : "Preview Mode"}
        </button>
      </div>

      {preview ? (
        // -------------------- Preview Mode --------------------
        <div className="relative">
          {/* vertical line in the center */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 -translate-x-1/2"></div>

          <div className="space-y-12">
            {events.map((event, index) => {
              const isLeft = index % 2 === 0; // alternate left/right
              return (
                <div
                  key={event.id}
                  className={`relative flex w-full ${
                    isLeft ? "justify-start pr-1/2" : "justify-end pl-1/2"
                  }`}
                >
                  {/* dot on the timeline */}
                  <div className="absolute left-1/2 top-4 w-4 h-4 rounded-full border-2 border-blue-500 bg-white -translate-x-1/2"></div>

                  {/* card */}
                  <div
                    className={`w-5/12 p-4 rounded-lg shadow bg-white ${
                      event.checked ? "opacity-60 line-through" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={event.checked}
                        onChange={() => toggleCheckbox(event.id)}
                        className="mt-1"
                      />
                      <div>
                        <h2 className="text-lg font-semibold">
                          {event.title || "Untitled"}
                        </h2>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        // -------------------- Edit Mode --------------------
        <div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="timeline">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {events.map((event, index) => (
                    <Draggable key={event.id} draggableId={event.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-4 border rounded-lg shadow bg-gray-50"
                        >
                          <input
                            type="text"
                            placeholder="Title"
                            value={event.title}
                            onChange={(e) => updateEvent(event.id, "title", e.target.value)}
                            className="w-full p-2 mb-2 border rounded"
                          />
                          <textarea
                            placeholder="Description"
                            value={event.description}
                            onChange={(e) => updateEvent(event.id, "description", e.target.value)}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <button
            onClick={addEvent}
            className="mt-4 px-4 py-2 rounded-lg bg-green-500 text-white"
          >
            Add Event
          </button>
        </div>
      )}
    </div>
  );
}
