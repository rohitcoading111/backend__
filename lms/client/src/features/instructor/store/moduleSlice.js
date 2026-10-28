import { createSlice } from "@reduxjs/toolkit";

import {
  fetchCourseModules,
  addModule,
  editModule,
  removeModule,
} from "../thunks/moduleThunks";

const initialState = {
  modules: [],
  loading: false,
  error: null,
};

const moduleSlice = createSlice({
  name: "modules",
  initialState,

  reducers: {
    clearModules(state) {
      state.modules = [];
      state.error = null;
    },

    clearModuleError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch modules
      .addCase(fetchCourseModules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseModules.fulfilled, (state, action) => {
        state.loading = false;

        // Adjust this if your backend returns a different response shape.
        const response = action.payload;
        state.modules = response?.data?.modules ?? [];
      })
      .addCase(fetchCourseModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch modules";
      })

      // Create module
      .addCase(addModule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addModule.fulfilled, (state, action) => {
        state.loading = false;

        const response = action.payload;
        const newModule = response?.module ?? response;

        if (newModule?._id) {
          state.modules.push(newModule);
        }
      })
      .addCase(addModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create module";
      })

      // Update module
      .addCase(editModule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editModule.fulfilled, (state, action) => {
        state.loading = false;

        const response = action.payload;
        const updatedModule = response?.module ?? response;

        if (updatedModule?._id) {
          const index = state.modules.findIndex(
            (module) => module._id === updatedModule._id
          );

          if (index !== -1) {
            state.modules[index] = updatedModule;
          }
        }
      })
      .addCase(editModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update module";
      })

      // Delete module
      .addCase(removeModule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeModule.fulfilled, (state, action) => {
        state.loading = false;

        state.modules = state.modules.filter(
          (module) => module._id !== action.payload
        );
      })
      .addCase(removeModule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete module";
      });
  },
});

export const { clearModules, clearModuleError } = moduleSlice.actions;

export default moduleSlice.reducer;
