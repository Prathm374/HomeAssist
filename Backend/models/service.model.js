import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Service name is required'],
        unique: true,
        trim: true,
        maxlength: [100, 'Service name cannot be more than 100 characters']
    },
    categoryId: {
        type: Number,
        required: [true, 'Service category ID is required']
    },
    categoryName: {
        type: String,
        required: [true, 'Service category is required'],
        enum: ['Home Care and Cleaning','Systems & Repair Solutions','Outdoor & Garden Services','Personal & Pet Support', 'Other'],
        default: 'Other'
    },
    description: {
        type: String,
        required: [true, 'Service description is required'],
        maxlength: [500, 'Service description cannot be more than 500 characters']
    },
    categoryImage: {
        type: String,
        required: [true, 'Service image URL is required'],
        validate: {
            validator: function(v) {
                return /^(http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    price: {
        type: Number,
        required: [true, 'Service price is required'],
        min: [0, 'Price cannot be negative']
    },
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;