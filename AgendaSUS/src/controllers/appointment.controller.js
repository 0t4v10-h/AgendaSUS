import {
    createAppointment,
    findAllAppointments,
    findAppointmentById,
    updateAppointment,
    deleteAppointment,
    findAppointmentsByUser,
    findTodayQueue
} from "../services/appointment.service.js";
import Appointment from "../models/appointment.model.js";
import Doctor from "../models/doctor.model.js";

export async function create(req, res) {
    try {
        const { tipoConsulta, ubs, date } = req.body;

        const doctors = await Doctor.findAll();
        if (doctors.length === 0) {
            return res.status(400).json({ message: "Nenhum médico disponível" });
        }

        const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];

        const appointment = await Appointment.create({
            patientName: req.user.name,
            tipoConsulta,
            ubs,
            date,
            userId: req.user.id,
            doctorId: randomDoctor.id,
        });

        res.status(201).json({
            ...appointment.toJSON(),
            doctor: randomDoctor.name,
        });
    } catch (error) {
        res.status(500).json({ message: "Error ao criar agendamento" });
    }
}

export async function findAll(req, res) {
    try {
        const appointments = await findAllAppointments();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function findOne(req, res) {
    try {
        const appointment = await findAppointmentById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: "Agendamento não encontrado" });
        }
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function update(req, res) {
    try {
        const appointment = await findAppointmentById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: "Agendamento não encontrado" });
        }

        if (appointment.userId !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ Message: "Você não tem permissão para alterar esse agendamento" });
        }

        if (req.body.date && new Date(req.body.date) < new Date()) {
            return res.status(400).json({ message: "A data da consulta não pode ser no passado" });
        }

        const updated = await updateAppointment(req.params.id, req.body);

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function remove(req, res) {
    try {
        const appointment = await findAppointmentById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: "Agendamento não encontrado" });
        }

        if (appointment.userId !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ Message: " Vocé nao tem permissão para cancelar esse agendamento" });
        }

        await deleteAppointment(req.params.id);
        res.json({ message: "Agendamento cancelado com sucesso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function myAppointments(req, res) {
    try {
        const userId = req.user.id;
        const appointments = await findAppointmentsByUser(userId);
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function queueToday(req, res) {
    try {
        const queue = await findTodayQueue();
        res.json(queue);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function changeStatus(req, res) {
    try {
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: "Status é obrigatório" });
        }

        const appointment = await findAppointmentById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: "Agendamento nao encontrado" });
        }

        const updated = await updateAppointment(req.params.id, { status });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}