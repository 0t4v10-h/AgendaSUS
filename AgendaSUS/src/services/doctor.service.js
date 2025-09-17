import Doctor from "../models/doctor.model.js";

export async function createDoctor(data) {
    return await Doctor.create(data);
}

export async function findAllDoctors() {
    return await Doctor.findAll();
}

export async function findDoctorById(id) {
    return await Doctor.findByPk(id);
}

export async function updateDoctor(id, data) {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) return null;
    await doctor.update(data);
    return doctor;
}

export async function deleteDoctor(id) {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) return null;
    await doctor.destroy();
    return doctor;
}