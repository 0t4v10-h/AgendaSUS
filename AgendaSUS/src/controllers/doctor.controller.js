import {
    createDoctor,
    findAllDoctors,
    findDoctorById,
    updateDoctor,
    deleteDoctor
} from "../services/doctor.service.js";

export async function create(req, res) {
    try {
        const doctor = await createDoctor(req.body);
        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function findAll(req, res) {
    try {
        const doctors = await findAllDoctors();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function findOne(req, res) {
    try {
        const doctor = await findDoctorById(req.params.id);
        if (!doctor) return res.status(404).json({ message: "Médico não encontrado" });
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function update(req, res) {
    try {
        const doctor = await updateDoctor(req.params.id, req.body);
        if (!doctor) return res.status(404).json({ message: "Médico não encontrado" });
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function remove(req, res) {
    try {
        const doctor = await deleteDoctor(req.params.id);
        if (!doctor) return res.status(404).json({ message: "Médico não encontrado" });
        res.json({ message: "Médico removido com sucesso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}