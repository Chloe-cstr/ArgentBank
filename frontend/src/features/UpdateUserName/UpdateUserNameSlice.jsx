import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3001/api/v1/user/profile";

export const updateUserName = createAsyncThunk(
    "user/updateUserName",
    async ({ userName }, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) throw new Error("Aucun token trouvé");

            const response = await fetch(API_URL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, 
                },
                body: JSON.stringify({ userName}),
            });

            if (!response.ok) {
                throw new Error("Échec de la mise à jour du profil");
            }

            const data = await response.json();
            console.log("Réponse du PUT updateUserName :", data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        userName: "",
        token: "",
        status: "idle", 
        error: null,
    },
    reducers: {
        setUser(state, action) {
            state.userName = action.payload.userName;
            state.token = action.payload.token;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserName.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateUserName.fulfilled, (state, action) => {
                console.log("Résultat de userProfile :", action.payload);
                state.status = "succeeded";
                state.lastName = action.payload.lastName;
            })
            .addCase(updateUserName.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
