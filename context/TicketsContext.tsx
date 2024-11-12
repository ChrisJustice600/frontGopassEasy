import React, { createContext, useContext, useState } from "react";

type Ticket = {
  id: number;
  flightType: string;
  transaction: { amount: number; paymentMethod: string };
  createdAt: string;
  status: string;
  qrCode?: string;
};

type TicketsContextType = {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
};

const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

export const TicketsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  return (
    <TicketsContext.Provider value={{ tickets, setTickets }}>
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketsContext);
  if (!context) {
    throw new Error("useTickets must be used within a TicketsProvider");
  }
  return context;
};
