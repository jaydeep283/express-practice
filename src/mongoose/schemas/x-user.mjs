import mongoose from "mongoose";

const XUserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    displayName: mongoose.Schema.Types.String,
    xId: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
});

export const XUser = mongoose.model("XUser", XUserSchema);
