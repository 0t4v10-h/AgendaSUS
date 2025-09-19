import {
    createAppointment,
    findAllAppointments,
    findAppointmentById,
    updateAppointment,
    deleteAppointment,
    findAppointmentsByUser,
    findTodayQueue
} from "../services/appointment.service.js";

export async function create(req, res) {
    try {
        const userId = req.user.id;
        const { doctorId, date } = req.body;

        const appointment = await createAppointment({
            userId,
            doctorId,
            date
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        const appointment = await updateAppointment(req.params.id, req.body);
        if (!appointment) {
            return res.status(404).json({ message: "Agendamento não encontrado" });
        }
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function remove(req, res) {
    try {
        const appointment = await deleteAppointment(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: "Agendamento não encontrado" });
        }
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

        const appointment = await updateAppointment(req.params.id, { status });
        if (!appointment) {
            return res.status(404).json({ message: "Agendamento nao encontrado" });
        }
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}