import TicketManager from "../persistencia/DAOs/managers/ticket/ticket.manager.js";

class TicketServices{
constructor(){
    this.TicketManager= new TicketManager();
    
}

async createTickets(ticket){
    try {
        const newticket= await this.TicketManager.createTicket(ticket);
        return newticket;
    } catch (error) {
        return error
    }
};
};

export const ticketServices= new TicketServices(); 