const db = require("../models");
const Patient = db.patient;
const address = db.address;
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

// const getPatientById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const patient = await Patient.findByPk(id);
//         if (!patient) {
//             return res.status(404).json({
//                 success: false,
//                 message: `ไม่พบผู้ใช้ที่มี ID: ${id}`
//             });
//         }
//         res.status(200).json({
//             success: true,
//             data: patient
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: 'เกิดข้อผิดพลาดบนเซิร์ฟเวอร์'
//         });
//     }
// };
// async function showAllPatientsWithCreator() {
//   try {

//     const patientsData = await Patient.findAll({

//       include: [
//         {
//           model: db.address,
//         }
//       ]
//     });

//     console.log(JSON.stringify(patientsData, null, 2));

//   } catch (error) {
//     console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
//   }
// }

// // เรียกใช้งานฟังก์ชัน
// showAllPatientsWithCreator();
const getPatientWithAddress = async (req, res) => {
    try {
        const patients = await Patient.findAll({
            include: [
                {
                    model: address, 
                    as: "address"
                }
            ],
            raw: true,
            nest: true
        });

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

module.exports = {getAllPatient, getPatientWithAddress};
