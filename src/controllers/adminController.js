const Patient = require("../models/patient");
const sequelize = require("../config/db");

    // 1. ฟังก์ชันสำหรับดูข้อมูลผู้ใช้งานทั้งหมด
const getAllPatient = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.status(200).json({
            success: true,
            data: patients
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดบนเซิร์ฟเวอร์'
        });
    }
};

module.exports = {getAllPatient};
