import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk pour récupérer le profil utilisateur
export const userProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) throw new Error("Aucun token trouvé");

      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Impossible de récupérer le profil");
      }

      const data = await response.json();
      if (!data || !data.body) {
        throw new Error("Réponse API invalide : `body` manquant");
      }
      return data.body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(userProfile.pending, (state) => {
      state.loading = true;
    })
    .addCase(userProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload; 
    })
    .addCase(userProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default profileSlice.reducer;
export const { clearProfile } = profileSlice.actions;