"use client";

import Button from "react-bootstrap/Button";

interface ServicePageClientProps {
  buttonText: string;
}

export default function ServicePageClient({
  buttonText,
}: ServicePageClientProps) {
  const handleScrollToContact = () => {
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Button variant="primary" onClick={handleScrollToContact} size="lg">
      {buttonText}
    </Button>
  );
}
