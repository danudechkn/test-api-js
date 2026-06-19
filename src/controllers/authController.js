// สมมติว่ามีตัวแปร users อยู่ด้านบนของไฟล์แล้ว
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const express = require('express');
const JWT_SECRET = 'MySuperSecretKey123456789!@#';
const sequelize = require("../config/db");

const register = async (req, res) => {
    try {
        const {
            name,
            user_name,
            password,
            role_id,
            position_id,

        } = req.body;
        if (!name || !user_name || !password || !role_id || !position_id) {
            return res.status(400).json({ success: false, message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
        }

        // ตรวจสอบว่าผู้ใช้มีอยู่แล้วหรือไม่
        const existingUser = await User.findOne({ where: { user_name } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'ชื่อผู้ใช้นี้ถูกใช้งานแล้ว' });
        }
        // สร้างข้อมูลผู้ใช้ใหม่
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            user_name,
            password: hashedPassword,
            role_id,
            position_id
        });

        res.status(201).json({
            success: true,
            message: 'สมัครสมาชิกสำเร็จ',
            user: newUser.toJSON()
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดบนเซิร์ฟเวอร์' });
    }
};


const login = async (req, res) => {
    try {
        const { user_name, password } = req.body;
        if (!user_name || !password) {
            return res.status(400).json({ success: false, message: 'กรุณากรอก user_name และ password ให้ครบถ้วน' });
        }

        const user = await User.findOne({ where: { user_name: user_name } });
        if (!user) {
            return res.status(400).json({ success: false, message: 'ไม่พบผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'ไม่พบผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' });
        }

        const token = jwt.sign(
            { id: user.id, role_id: user.role_id },
            process.env.JWT_SECRET || JWT_SECRET,
            { expiresIn: '1h' }
        );


        return res.status(200).json({
            success: true,
            message: 'เข้าสู่ระบบสำเร็จ',
            token,
            user: {
                id: user.id,
                name: user.name,
                user_name: user.user_name,
                role_id: user.role_id,
                position_id: user.position_id
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดบนเซิร์ฟเวอร์' });
    }
};
const logout = (req, res) => {
    try {
        user = req.user; // ข้อมูลผู้ใช้ที่ถูกตรวจสอบจาก middleware
        console.log('User logged out:', req.user);
        res.status(200).json({ success: true, message: 'ออกจากระบบสำเร็จ' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดบนเซิร์ฟเวอร์' });
    }
};

module.exports = {
    register,
    login,
    logout,
    JWT_SECRET
};