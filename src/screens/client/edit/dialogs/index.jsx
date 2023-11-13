import Button from "../../../../components/button";
import Dialog from "../../../../components/dialog";

export function DeleteAccountDialog({ onClose, isOpen, actions }) {
  return (
    <Dialog>

    </Dialog>
  );
};

export function ChangePaymentDialog({ onClose, payment, isOpen, actions }) {
  return (
    <Dialog open={isOpen} actions={actions} title="Alterar pagamento" onClose={onClose}>
      <p style={{ display: "flex", justifyContent: "space-between" }}>Data: <span>{new Date(payment.date).toLocaleDateString( )}</span></p>
      <p style={{ display: "flex", justifyContent: "space-between" }}>Preço: <span>{(120).toLocaleString("pt-br", { currency: "brl", style: "currency" })}</span></p>
      <p style={{ display: "flex", justifyContent: "space-between" }}>Status: <span>{(payment.open) ? "Atrasado" : "Pago"}</span></p>

      <br />

      <Button style={{ background: "#4266c7", color: "#ffffff" }} title={`Definir como ${(!payment.open) ? "atrasado" : "pago"}`} />  
    </Dialog>
  );
};