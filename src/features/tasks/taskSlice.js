import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: "1",
      title: "Design dashboard layout",
      status: "Todo",
    },
    {
      id: "2",
      title: "Setup Redux store",
      status: "In Progress",
    },
    {
      id: "3",
      title: "Implement login flow",
      status: "Done",
    },
  ],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      state.items.push(action.payload);
    },
    updateTaskStatus(state, action) {
      const { id, status } = action.payload;
      const task = state.items.find((t) => t.id === id);
      if (task) {
        task.status = status;
      }
    },
    removeTask(state, action) {
      state.items = state.items.filter(
        (task) => task.id !== action.payload
      );
    },
  },
});

export const { addTask, updateTaskStatus, removeTask } =
  taskSlice.actions;

export default taskSlice.reducer;
