import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "919898970397"; // Replace with actual WhatsApp business number
  const message = "Hi, I'm interested in your tailoring services";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group animate-scale-in"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
      <span className="hidden sm:inline font-medium">Chat with us</span>
    </button>
  );
};

export default WhatsAppButton;
