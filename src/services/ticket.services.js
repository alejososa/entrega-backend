import {TicketManager} from "../persistencia/DAOs/managers/ticket/ticket.manager.js";

class TicketServices{
constructor(){
    this.ticketManager= new TicketManager();
    
}

async createTickets(ticket){
    try {
        const newticket= await this.ticketManager.createTicket(ticket);
        return newticket;
    } catch (error) {
        return error
    }
};
};

export const ticketServices= new TicketServices(); 