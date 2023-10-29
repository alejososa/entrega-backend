import { ticketServices } from "../services/ticket.services.js";
import { generateUniqueCode } from "../codeGenerator.js";

class TicketController{
    async createTicket(req,res){
        const {code,purchase_datetime, amount, purchaser}=req.body;
        try {
            const code= generateUniqueCode();
            const ticket=await ticketServices.createTickets({
                code,
                purchase_datetime,
                amount,
                purchaser
            })
        } catch (error) {
            return res.status(300).send({status:"Error"});
        }
    }
}

export const ticketController= new TicketController();