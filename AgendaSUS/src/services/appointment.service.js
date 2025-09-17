import { Appointment, User, Doctor } from "../models/index.js";

export async function createAppointment({ userId, doctorId, date }) {
    return await Appointment.create({ userId, doctorId, date });
}

export async function findAllAppointments() {
    return await Appointment.findAll({
        include: [
            { model: User, attributes: ["id", "name", "email"] },
            { model: Doctor, attributes: ["id", "name", "specialty"] }
        ]
    });
}

export async function findAppointmentById(id) {
    return await Appointment.findByPk(id, {
        include: [
            { model: User, attributes: ["id", "name", "email"] },
            { model: Doctor, attributes: ["id", "name", "specialty"] }
        ]
    });
}

export async function updateAppointment(id, data) {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) return null;

    return await appointment.update(data);
}

export async function deleteAppointment(id) {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) return null;

    return await appointment.destroy();
}