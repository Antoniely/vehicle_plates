import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarLogo() {
  return (
    <Avatar>
      <AvatarImage
        className="object-cover"
        src="/imagen.jpg"
        alt="Imagen Logo"
      />
      <AvatarFallback>AR</AvatarFallback>
    </Avatar>
  );
}
