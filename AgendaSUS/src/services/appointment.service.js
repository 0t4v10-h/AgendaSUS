import Appointment from "../models/appointment.model.js";

export async function createAppointment(data) {
    return await Appointment.create(data);
}

export async function findAllAppointments() {
    return await Appointment.findAll();
}

export async function findAppointmentById(id) {
    return await Appointment.findByPk(id);
}

export async function updateAppointment(id, data) {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) return null;
    await appointment.update(data);
    return appointment;
}

export async function deleteAppointment(id) {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) return null;
    await appointment.destroy();
    return appointment;
}