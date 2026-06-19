const User = require('../models/user');


const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json({

         success: true,
            data:users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดบนเซิร์ฟเวอร์'
        });
    }
};
const deleteUser = async (req, res) => {

    const userId = Number(req.params.id);


    const userIndex = users.findIndex(user => user.id === userId);


    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `ไม่พบผู้ใช้ที่มี ID: ${userId}`
        });
    }


    users.splice(userIndex, 1);


    res.status(200).json({
        success: true,
        message: 'ลบผู้ใช้สำเร็จ',
        data: users
    });
};
const getUserById = async (req, res) => {
    try {

        const userId = Number(req.params.id);


        const user = await User.findByPk(userId);


        if (!user) {
            return res.status(404).json({
                success: false,
                message: `ไม่พบผู้ใช้ที่มี ID: ${userId}`
            });
        }

        const userResponse = user.toJSON();
        delete userResponse.password;


        return res.status(200).json({
            success: true,
            data: userResponse
        });

    } catch (error) {
        // ป้องกันแอปดับ และพ่น Error ดูบน Console เพื่อตรวจเช็กบั๊ก
        console.error("Get User By ID Error:", error);
        return res.status(500).json({
            success: false,
            message: "เกิดข้อผิดพลาดบนเซิร์ฟเวอร์"
        });
    }
};




module.exports = {
    getAllUsers,
    deleteUser,
    getUserById
};

