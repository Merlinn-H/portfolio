"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * Lien interne qui ne précharge rien au chargement de la page (aucun poids ajouté),
 * mais anticipe dès l'intention : survol, focus clavier ou début de toucher.
 * Le clic qui suit est alors quasi instantané.
 */
export function IntentLink({ href, onPointerEnter, onFocus, onTouchStart, ...rest }: ComponentProps<typeof Link>) {
  const router = useRouter();
  const target = typeof href === "string" ? href : (href.pathname ?? "/");
  const prefetch = () => router.prefetch(target);
  return (
    <Link
      href={href}
      prefetch={false}
      onPointerEnter={(e) => {
        prefetch();
        onPointerEnter?.(e);
      }}
      onFocus={(e) => {
        prefetch();
        onFocus?.(e);
      }}
      onTouchStart={(e) => {
        prefetch();
        onTouchStart?.(e);
      }}
      {...rest}
    />
  );
}
