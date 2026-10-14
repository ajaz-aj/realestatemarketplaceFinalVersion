import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        propertyType: {
            type: String,
            enum: [
                "house",
                "apartment",
                "appartment",
                "villa",
                "land",
                "commercial",
                "comercial",
            ],
            required: true,
        },
        listingType: {
            type: String,
            enum: ["sale", "rent", "auction"],
            default: "sale",
        },
        listenType: {
            type: String,
            enum: ["sale", "rent", "auction"],
        },
        location: {
            address: { type: String, default: "" },
            city: { type: String, default: "" },
            state: { type: String, default: "" },
            country: { type: String, default: "" },
        },
        bedrooms: {
            type: Number,
            default: 0,
        },
        bathrooms: {
            type: Number,
            default: 0,
        },
        area: {
            type: Number,
            default: 0,
        },
        image: [
            {
                type: String,
            },
        ],
        images: [
            {
                type: String,
            },
        ],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        badge: {
            type: String,
            default: "Featured",
        },
        badgeColor: {
            type: String,
            default: "bg-blue-600",
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to keep listenType and listingType in sync, and image / images in sync
propertySchema.pre("save", function () {
    if (this.listingType && !this.listenType) {
        this.listenType = this.listingType;
    } else if (this.listenType && !this.listingType) {
        this.listingType = this.listenType;
    }
    if (Array.isArray(this.images) && this.images.length > 0 && (!this.image || this.image.length === 0)) {
        this.image = this.images;
    } else if (Array.isArray(this.image) && this.image.length > 0 && (!this.images || this.images.length === 0)) {
        this.images = this.image;
    }
});

const Property = mongoose.model("Property", propertySchema);

export default Property;