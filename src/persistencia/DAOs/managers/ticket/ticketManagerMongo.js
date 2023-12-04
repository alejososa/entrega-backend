import { ticketModel } from "../../../db/models/ticket.models.js";

class TicketManagerMongo{
async createTicket(ticket){
    const newticket= new ticketModel(ticket);
    await newticket.save();
    return newticket;
}
}

export  {TicketManagerMongo};