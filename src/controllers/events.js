import Joi from "joi";
import EventsM from "./../models/events.js";
import JoiServices from "../services/JoiServices.js";

const EventsJoi = Joi.object({
    
    name: Joi.string().required(),
    location: Joi.string().required(),
    date: Joi.date().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    image: Joi.string().required()

});

const createEvents = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const joiResponse = await JoiServices.validateBodyAsync(EventsJoi, req.body);
        const newEvent = await new EventsM({userId, ...req.body}).save();

        return res.json ({
            success: true,
            event: newEvent
        });
    } catch (err) {
        next(err)
    }
};

const fetchEvents = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const events = await EventsM.find({"userId" : {$ne : userId}});
        return res.json({
            success: true,
            events
        })
    } catch (err) {
        next(err);
    }
}


export default {
    createEvents,
    fetchEvents
}