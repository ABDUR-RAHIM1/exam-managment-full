import CourseInfoModel from "../../model/admin/courseInfoModel";

// Create a new photo description
export const createCourseInfo = async (req, res) => {
    try {
        const { photo, title, description, btnText } = req.body;


        if (!title || !description || !btnText || !photo) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newInfo = new CourseInfoModel({ title, description, btnText, photo });
        await newInfo.save();

        res.status(201).json({ message: "Photo Description created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error creating Photo Description", error });
    }
};

// Get all photo descriptions
export const getCourseInfo = async (req, res) => {
    try {
        const photoDescriptions = await CourseInfoModel.find();
        res.status(200).json(photoDescriptions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching photo descriptions", error });
    }
};

// Update a photo description by ID
export const updatePhotoDescription = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, btnText } = req.body;
        const photo = req.file ? req.file.path : null;

        const updatedData = {};
        if (title) updatedData.title = title;
        if (description) updatedData.description = description;
        if (btnText) updatedData.btnText = btnText;
        if (photo) updatedData.photo = photo;

        const updatedPhotoDescription = await CourseInfoModel.findByIdAndUpdate(
            id,
            updatedData,
            { new: true } // To return the updated document
        );

        if (!updatedPhotoDescription) {
            return res.status(404).json({ message: "Photo Description not found" });
        }

        res.status(200).json({ message: "Photo Description updated successfully", updatedPhotoDescription });
    } catch (error) {
        res.status(500).json({ message: "Error updating Photo Description", error });
    }
};

// Delete a photo description by ID
export const deletePhotoDescription = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPhotoDescription = await PhotoDescriptionModel.findByIdAndDelete(id);

        if (!deletedPhotoDescription) {
            return res.status(404).json({ message: "Photo Description not found" });
        }

        res.status(200).json({ message: "Photo Description deleted successfully", deletedPhotoDescription });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Photo Description", error });
    }
};
