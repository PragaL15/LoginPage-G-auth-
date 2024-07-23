const { post_query_database } = require("../../../config/database_utils")

exports.post_course_category = (req, res)=>{
    const course_category = req.body.course_category
    if(!course_category){
        res.status(400).json({
            error:"Course category is required"
        })
    }
    const query = `INSERT INTO course_category(name, status)
    VALUES('${course_category}', '1')`
    const error_message = "Failed to add course category"
    const success_message = "Course category added successfully"

    post_query_database(query, res, error_message, success_message)
}