import { Container, Button } from "react-bootstrap";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function ServiceNotFound() {
  const locale = useLocale();
  return (
    <Container className="text-center py-5">
      <h2>Servicio no encontrado</h2>
      <p>El servicio que buscas no existe o ha sido movido.</p>
      <Link href={`/${locale}`}>
        <Button variant="primary">Volver al inicio</Button>
      </Link>
    </Container>
  );
}
