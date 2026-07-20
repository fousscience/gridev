type FloatingOrbsProps = {
  className?: string;
  variant?: "hero" | "subtle";
};

export function FloatingOrbs({ className = "", variant = "hero" }: FloatingOrbsProps) {
  const subtle = variant === "subtle";

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`.trim()}
      aria-hidden
    >
      <span
        className={`orb orb-cyan ${subtle ? "orb-subtle" : ""} animate-float`}
        style={{ top: "12%", left: "8%", animationDuration: "7s" }}
      />
      <span
        className={`orb orb-yellow ${subtle ? "orb-subtle" : ""} animate-float-reverse`}
        style={{ top: "18%", right: "10%", animationDuration: "9s" }}
      />
      <span
        className={`orb orb-red ${subtle ? "orb-subtle" : ""} animate-float`}
        style={{ bottom: "20%", left: "15%", animationDuration: "11s", animationDelay: "1s" }}
      />
      <span
        className={`orb orb-purple ${subtle ? "orb-subtle" : ""} animate-float-reverse`}
        style={{ bottom: "15%", right: "18%", animationDuration: "8s", animationDelay: "0.5s" }}
      />
      <span
        className={`orb-ring animate-spin-slow ${subtle ? "opacity-20" : "opacity-35"}`}
        style={{ top: "50%", left: "50%", marginTop: "-120px", marginLeft: "-120px" }}
      />
    </div>
  );
}
